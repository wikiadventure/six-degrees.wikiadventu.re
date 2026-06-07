<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { wiki } from '../../store/search';
import vertexShaderSource from '../../shaders/heat-meter.vert?raw';
import fragmentShaderSource from '../../shaders/heat-meter.frag?raw';

const palette: Record<number, [number, number, number]> = {
    0: [0, 0, 0],
    1: [45, 151, 250],
    2: [34, 228, 238],
    3: [250, 246, 45],
    4: [250, 195, 45],
    5: [250, 120, 45],
    6: [250, 45, 45],
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
const meterRef = ref<HTMLElement | null>(null);
const usingFallback = ref(false);

const clampedDegree = computed(() => {
    return 10;
    if (wiki.degree <= 0) {
        return 0;
    }
    return Math.round(wiki.degree);
});

const heatColor = computed(() => palette[clampedDegree.value] ?? palette[6]);

const meterStyle = computed(() => {
    const [red, green, blue] = heatColor.value;
    return {
        '--heat-rgb': `${red}, ${green}, ${blue}`,
        '--heat-color': `rgb(${red}, ${green}, ${blue})`,
    };
});


let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
let program: WebGLProgram | null = null;
let vertexBuffer: WebGLBuffer | null = null;
let animationFrameId = 0;
let resizeObserver: ResizeObserver | null = null;

let resolutionUniform: WebGLUniformLocation | null = null;
let heatColorUniform: WebGLUniformLocation | null = null;
let degreeUniform: WebGLUniformLocation | null = null;
let timeUniform: WebGLUniformLocation | null = null;
let startTime = performance.now();

const scheduleRender = () => {
    if (!gl || !program || usingFallback.value || animationFrameId) {
        return;
    }
    animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = 0;
        if (usingFallback.value) return;
        render();
    });
};

const compileShader = (
    context: WebGLRenderingContext | WebGL2RenderingContext,
    type: number,
    source: string,
) => {
    const shader = context.createShader(type);
    if (!shader) {
        return null;
    }
    context.shaderSource(shader, source);
    context.compileShader(shader);

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        context.deleteShader(shader);
        return null;
    }

    return shader;
};

const createProgram = (context: WebGLRenderingContext | WebGL2RenderingContext) => {
    const vertexShader = compileShader(context, context.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(context, context.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
        if (vertexShader) {
            context.deleteShader(vertexShader);
        }
        if (fragmentShader) {
            context.deleteShader(fragmentShader);
        }
        return null;
    }

    const shaderProgram = context.createProgram();
    if (!shaderProgram) {
        context.deleteShader(vertexShader);
        context.deleteShader(fragmentShader);
        return null;
    }

    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);

    context.deleteShader(vertexShader);
    context.deleteShader(fragmentShader);

    if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
        context.deleteProgram(shaderProgram);
        return null;
    }

    return shaderProgram;
};

const resizeCanvas = () => {
    if (!canvasRef.value || !meterRef.value || !gl) {
        return;
    }

    const rect = meterRef.value.getBoundingClientRect();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const maxDpr = isMobile ? 1.5 : 4;
    const renderScale = isMobile ? 0.85 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const width = Math.max(1, Math.floor(rect.width * dpr * renderScale));
    const height = Math.max(1, Math.floor(rect.height * dpr * renderScale));

    if (canvasRef.value.width !== width || canvasRef.value.height !== height) {
        canvasRef.value.width = width;
        canvasRef.value.height = height;
        gl.viewport(0, 0, width, height);
    }
};

const render = () => {
    if (!gl || !program || !canvasRef.value || usingFallback.value) {
        return;
    }

    resizeCanvas();

    const [red, green, blue] = heatColor.value;

    gl.useProgram(program);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(resolutionUniform, canvasRef.value.width, canvasRef.value.height);
    gl.uniform3f(heatColorUniform, red / 255, green / 255, blue / 255);
    gl.uniform1f(degreeUniform, clampedDegree.value);
    gl.uniform1f(timeUniform, 12.34); // Fixed time for static render

    gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const cleanup = () => {
    if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
    }

    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }

    if (gl && vertexBuffer) {
        gl.deleteBuffer(vertexBuffer);
    }

    if (gl && program) {
        gl.deleteProgram(program);
    }

    vertexBuffer = null;
    program = null;
    gl = null;
};

const setupWebGL = () => {
    if (!canvasRef.value) {
        usingFallback.value = true;
        return;
    }

    const contextAttributes: WebGLContextAttributes = {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: 'low-power',
    };

    gl = canvasRef.value.getContext('webgl2', contextAttributes);
    if (!gl) {
        gl = canvasRef.value.getContext('webgl', contextAttributes);
    }

    if (!gl) {
        usingFallback.value = true;
        return;
    }

    program = createProgram(gl);
    if (!program) {
        usingFallback.value = true;
        cleanup();
        return;
    }

    const positionAttribute = gl.getAttribLocation(program, 'a_position');
    resolutionUniform = gl.getUniformLocation(program, 'u_resolution');
    heatColorUniform = gl.getUniformLocation(program, 'u_heatColor');
    degreeUniform = gl.getUniformLocation(program, 'u_degree');
    timeUniform = gl.getUniformLocation(program, 'u_time');

    if (positionAttribute < 0) {
        usingFallback.value = true;
        cleanup();
        return;
    }

    vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        usingFallback.value = true;
        cleanup();
        return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]),
        gl.STATIC_DRAW,
    );

    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

    resizeObserver = new ResizeObserver(() => {
        scheduleRender();
    });

    if (meterRef.value) {
        resizeObserver.observe(meterRef.value);
    }

    canvasRef.value.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
        usingFallback.value = true;
        cleanup();
    });

    window.addEventListener('resize', scheduleRender, { passive: true });
    document.addEventListener('visibilitychange', scheduleRender, { passive: true });

    scheduleRender();
};

onMounted(() => {
    setupWebGL();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', scheduleRender);
    document.removeEventListener('visibilitychange', scheduleRender);
    cleanup();
});

watch(clampedDegree, () => {
    scheduleRender();
});
</script>
<template>
    <main ref="meterRef" heat-meter :degree="clampedDegree" :style="meterStyle">
        <div heat-background></div>
        <canvas v-if="!usingFallback" ref="canvasRef" heat-canvas aria-hidden="true"></canvas>
        <slot></slot>
    </main>
</template>
<style>
[heat-meter] {
    min-height: 200vh;
    background: black;
    color: #fff;
    position: relative;
    isolation: isolate;
    --heat-rgb: 0, 0, 0;
    --heat-color: rgb(var(--heat-rgb));

    [heat-background] {
        position: absolute;
        inset: 0;
        background: black;
        z-index: -2;
    }

    [heat-canvas] {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
        z-index: -1;
    }
}
</style>