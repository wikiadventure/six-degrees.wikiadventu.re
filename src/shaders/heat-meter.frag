#version 300 es

precision highp float;

uniform vec2 u_resolution;
uniform vec3 u_heatColor;
uniform float u_degree;
uniform float u_time;

out vec4 fragmentColor;

const float SQRT3 = 1.732050808;

// Random number generator
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + vec2(34.345, 34.345)); // FIXED parameter type for strict compilers (Chrome)
    return fract(p.x * p.y);
}

// 2D Noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

// Fractal Brownian Motion
float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(p);
        p = rot * p * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// Caustic basis
float ridged(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; ++i) {
        v += a * abs(sin(noise(p) * 3.1415 + u_time * 0.5));
        p = rot * p * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// High-quality Voronoi crystal helpers
vec2 hash2(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}

vec3 voronoi(vec2 x) {
    vec2 n = floor(x);
    vec2 f = fract(x);

    vec2 mr;
    float md = 8.0;
    vec2 mg;
    
    for(int j=-1; j<=1; j++)
    for(int i=-1; i<=1; i++) {
        vec2 g = vec2(float(i),float(j));
        vec2 o = hash2( n + g );
        vec2 r = g + o - f;
        float d = dot(r,r);

        if( d < md ) {
            md = d;
            mr = r;
            mg = g;
        }
    }

    md = 8.0;
    for(int j=-2; j<=2; j++)
    for(int i=-2; i<=2; i++) {
        vec2 g = mg + vec2(float(i),float(j));
        vec2 o = hash2( n + g );
        vec2 r = g + o - f;
        
        if( dot(mr-r, mr-r) > 0.00001 ) {
            md = min( md, dot( 0.5*(mr+r), normalize(r-mr) ) );
        }
    }

    return vec3( md, hash(n + mg), length(mr) );
}

float crystalHeight(vec2 p) {
    vec3 v1 = voronoi(p * 2.0);
    vec3 v2 = voronoi(p * 4.0 + vec2(13.5, 9.2));
    vec3 v3 = voronoi(p * 8.0 + vec2(42.1, 17.8));
    return v1.x * 0.5 + v2.x * 0.25 + v3.x * 0.125;
}


void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution;
    
    // Aspect ratio corrected rounded corners
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 center = (uv * 2.0 - 1.0) * aspect;
    vec2 size = max(aspect - vec2(0.25), vec2(0.0)); // black area boundaries
    vec2 d = abs(center) - size;
    float dist = length(max(d, 0.0));
    
    // Smooth transition: 0.0 at inner black area, exactly 0.5 at straight screen border (dist = 0.25)
    float edgeMask = smoothstep(0.0, 0.5, dist);
    
    if (edgeMask <= 0.0) {
        fragmentColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    vec2 p = uv * 3.0; // scale
    p.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);
    int deg = int(floor(u_degree + 0.5));
    
    // black screen on deg 0
    if (deg == 0) {
        fragmentColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    // We can maximize the quality of the shader since we only generate one frame
    if (deg == 1) {
        // High Quality Triangulated Crystal Approach
        // Multiple Voronoi layers combined to create faceted crystal structures
        vec3 v1 = voronoi(p * 1.5 + vec2(u_time * 0.05));
        vec3 v2 = voronoi(p * 3.5 + vec2(13.5, 9.2) - vec2(u_time * 0.02));
        vec3 v3 = voronoi(p * 7.0 + vec2(42.1, 17.8));

        // Faceted height estimation
        vec2 cp = p + vec2(u_time * 0.05, 0.0);
        float h = crystalHeight(cp);
        vec2 eps = vec2(0.005, 0.0);
        float hx = crystalHeight(cp + eps) - h;
        float hy = crystalHeight(cp + eps.yx) - h;
        
        // Calculate constant facets based on gradient
        vec3 normal = normalize(vec3(-hx, -hy, 0.02));

        // Dynamic lighting based on the crystal normal
        vec3 lightDir = normalize(vec3(0.5, 1.0, 1.5));
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        vec3 halfDir = normalize(lightDir + viewDir);
        
        float diff = max(dot(normal, lightDir), 0.0);
        float spec = pow(max(dot(normal, halfDir), 0.0), 64.0);
        
        // Add subtle chromatic environmental reflection
        vec3 refrac = reflect(-viewDir, normal);
        float env = fbm(refrac.xy * 8.0 + u_time * 0.1);

        // Voronoi cell-based random tint mapping
        vec3 cellColor1 = mix(vec3(0.02, 0.1, 0.3), vec3(0.3, 0.6, 0.95), v1.y);
        vec3 cellColor2 = mix(vec3(0.1, 0.3, 0.6), vec3(0.5, 0.8, 1.0), v2.y);
        
        // Combine base colors from the layers
        vec3 baseColor = mix(cellColor1, cellColor2, smoothstep(0.1, 0.4, v1.x));
        baseColor = mix(baseColor, vec3(0.7, 0.9, 1.0), v3.y * 0.3);

        // Internal glow / sub-surface illusion
        float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
        float glow = pow(fresnel, 3.0);

        // Crack / depth edges (where crystal breaks)
        float deepCrack = smoothstep(0.0, 0.03, v1.x) * smoothstep(0.0, 0.05, v2.x);
        
        // Assemble PBR-ish color
        color = baseColor * (diff * 0.6 + 0.4);            // Diffuse base
        color += vec3(1.0, 0.9, 0.8) * spec * 1.5;         // Sharp geometric specular
        color += vec3(0.2, 0.5, 0.9) * env * 0.6;          // Reflected environment
        color += vec3(0.1, 0.4, 0.8) * glow;               // Fresnel glowing edges
        
        color *= mix(0.1, 1.0, deepCrack);                 // Darken intersection crevices
        
        // Sparkles on edges
        float edgeHighlight = smoothstep(0.03, 0.01, v1.x) * (1.0 - v1.x);
        color += vec3(0.6, 0.8, 1.0) * edgeHighlight * diff * 2.0;
    } else if (deg == 2) { 
        // Melting Ice Crystal
        // Similar to deg 1 (Blue Ice) but with fluid distortion and softened normals
        
        // Flowing water distortion over the crystal structure
        vec2 fluidDist = vec2(fbm(p * 2.0 + u_time * 0.5), fbm(p * 2.0 - u_time * 0.4)) * 0.3;
        vec2 p_dist = p + fluidDist;
        
        vec3 v1 = voronoi(p_dist * 1.5 + vec2(u_time * 0.05));
        vec3 v2 = voronoi(p_dist * 3.5 + vec2(13.5, 9.2) - vec2(u_time * 0.02));
        vec3 v3 = voronoi(p_dist * 7.0 + vec2(42.1, 17.8));

        // Faceted height estimation with smoother distortion
        vec2 cp = p_dist + vec2(u_time * 0.1, u_time * 0.05);
        float h = crystalHeight(cp);
        
        // Use a larger epsilon to smooth out the sharp facet edges (melting effect)
        vec2 eps = vec2(0.04, 0.0);
        float hx = crystalHeight(cp + eps) - h;
        float hy = crystalHeight(cp + eps.yx) - h;
        
        // Add water rippling to the normal
        float ripple = fbm(p * 6.0 - u_time);
        
        // Calculate smoothed facets combined with ripples
        vec3 normal = normalize(vec3(-hx, -hy, 0.04 + ripple * 0.03));

        // Dynamic lighting
        vec3 lightDir = normalize(vec3(0.5, 1.0, 1.5));
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        vec3 halfDir = normalize(lightDir + viewDir);
        
        float diff = max(dot(normal, lightDir), 0.0);
        float spec = pow(max(dot(normal, halfDir), 0.0), 32.0); // Broader specular for a wet surface
        
        // Environmental reflection (warped heavily by fluid)
        vec3 refrac = reflect(-viewDir, normal);
        float env = fbm(refrac.xy * 6.0 + u_time * 0.3);

        // Tinting - more transparent, wet and slightly warmer than solid ice
        vec3 cellColor1 = mix(vec3(0.05, 0.2, 0.4), vec3(0.3, 0.6, 0.9), v1.y);
        vec3 cellColor2 = mix(vec3(0.15, 0.35, 0.6), vec3(0.5, 0.8, 1.0), v2.y);
        
        vec3 baseColor = mix(cellColor1, cellColor2, smoothstep(0.0, 0.7, v1.x));
        baseColor = mix(baseColor, vec3(0.7, 0.9, 1.0), v3.y * 0.5);

        // Sub-surface illusion
        float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
        float glow = pow(fresnel, 2.5);

        // Softened crevices (less sharp than deep cracks)
        float deepCrack = smoothstep(0.0, 0.1, v1.x) * smoothstep(0.0, 0.15, v2.x);
        
        // Assemble color
        color = baseColor * (diff * 0.5 + 0.5);            
        color += vec3(1.0, 0.95, 0.9) * spec * 2.0;         // Stronger wet specular highlights
        color += vec3(0.3, 0.6, 0.9) * env * 0.8;           // Moving fluid reflection
        color += vec3(0.2, 0.5, 0.8) * glow;               
        
        color *= mix(0.4, 1.0, deepCrack);                 
        
        // Wet flowing surface highlights running down
        float wetHighlight = smoothstep(0.4, 0.7, fluidDist.x + fluidDist.y);
        color += vec3(0.8, 0.95, 1.0) * wetHighlight * diff * 0.5;
    } else if (deg == 3) { 
        // Cold Ocean water caustic
        vec2 uvPert = p * 1.5 + vec2(fbm(p + u_time * 0.1), fbm(p + vec2(100.0) - u_time * 0.1));
        
        float v1 = voronoi(uvPert * 2.0).x;
        float v2 = voronoi(uvPert * 3.5 + vec2(3.14)).x;
        
        float caustic = pow(max(1.0 - v1, 0.0), 8.0) + pow(max(1.0 - v2, 0.0), 6.0) * 0.5;
        
        float depth = fbm(p * 2.0 + u_time * 0.05);
        vec3 deepWater = mix(vec3(0.0, 0.05, 0.2), vec3(0.0, 0.2, 0.5), depth);
        
        color = deepWater + vec3(0.4, 0.8, 1.0) * caustic * mix(0.3, 1.0, depth);
    } else if (deg == 4) { 
        // Tropical Ocean water caustic
        vec2 uvPert = p * 2.0 + vec2(fbm(p * 1.5 + u_time * 0.1), fbm(p * 1.5 - u_time * 0.1));
        
        float v1 = voronoi(uvPert * 2.0 - vec2(u_time * 0.15, 0.0)).x;
        float v2 = voronoi(uvPert * 3.0 + vec2(0.0, u_time * 0.1)).x;
        float v3 = voronoi(uvPert * 5.0).x;
        
        // Brighter, broader caustics for shallow tropical water
        float caustic = pow(max(1.0 - v1, 0.0), 5.0) + pow(max(1.0 - v2, 0.0), 5.0) * 0.6 + pow(max(1.0 - v3, 0.0), 4.0) * 0.3;
        
        float shallow = fbm(p * 2.0 - u_time * 0.05);
        vec3 shallowWater = mix(vec3(0.0, 0.5, 0.6), vec3(0.2, 0.9, 0.8), shallow);
        
        // Glistening sunlight effect
        float glisten = pow(max(noise(uvPert * 15.0 + u_time), 0.0), 6.0) * 0.6;
        
        color = shallowWater + vec3(0.8, 1.0, 0.9) * caustic + vec3(1.0) * glisten;
    } else if (deg == 5) { 
        // 3D Textured Chunk Magma
        // Zoomed out slightly to show more variety across the screen
        vec2 q = p * 10.5 + vec2(u_time * 0.05, -u_time * 0.03);
        
        // Evaluate height for a fake 3D terrain using domain warped noise
        vec2 eps = vec2(0.015, 0.0);
        
        // Base noise heavily contrasted to create flat slabs (high) and deep pools (low)
        // Using fbm wrapped in itself for organic shapes
        float n0 = fbm(q + fbm(q * 1.5 + u_time * 0.01));
        float nx = fbm(q + eps + fbm((q + eps) * 1.5 + u_time * 0.01));
        float ny = fbm(q + eps.yx + fbm((q + eps.yx) * 1.5 + u_time * 0.01));
        
        // Strong smoothstep forces values to chunks. 0.0 (lava pool floor) and 1.0 (crust slab peak)
        float h = smoothstep(0.35, 0.65, n0);
        float hx = smoothstep(0.35, 0.65, nx) - h;
        float hy = smoothstep(0.35, 0.65, ny) - h;
        
        // Fake 3D Normal for the slab edges
        vec3 normal = normalize(vec3(-hx * 8.0, -hy * 8.0, 1.0));
        
        // Fake 3D Lighting
        vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
        float diff = max(dot(normal, lightDir), 0.0);
        // Specular highlight to make the brown/black slab "reflect light"
        float spec = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 24.0); 
        
        // Color Palette
        // Add detailed orange/yellow noise to the lava pool so it's less flat
        float lavaDetail = fbm(p * 10.0 - vec2(u_time * 0.1, u_time * 0.15));
        vec3 colHot  = mix(vec3(0.8, 0.3, 0.0), vec3(1.2, 0.9, 0.1), lavaDetail); // Orange to Yellow liquid lava (Low value)
        vec3 colRed  = vec3(0.9, 0.2, 0.0);     // Red hot 
        vec3 colMelt = vec3(0.5, 0.15, 0.05);   // Melting brown slab (In between)
        vec3 colSlab = vec3(0.12, 0.09, 0.07);  // Brown / black slab (High value)
        
        // Map height to albedo color
        vec3 albedo = mix(colHot, colRed, smoothstep(0.0, 0.3, h));
        albedo = mix(albedo, colMelt, smoothstep(0.3, 0.7, h));
        albedo = mix(albedo, colSlab, smoothstep(0.7, 1.0, h));
        
        // Mask where the slab is solid vs melting/liquid
        float solidMask = smoothstep(0.5, 0.9, h); 
        
        // Add subtle crust texture to the solid slab to make it look porous/rocky
        float crustTex = fbm(p * 8.0);
        albedo -= solidMask * crustTex * 0.03;
        
        // Apply diffuse lighting and specular reflections ONLY to the solid slab chunks
        vec3 litSlab = albedo * (diff * 0.7 + 0.3) + vec3(1.0, 0.9, 0.8) * spec * 0.5;
        
        // Lava is fully emissive (unlit/glowing) and a bit brighter at the deepest parts
        vec3 emissiveLava = albedo * mix(1.2, 1.0, h); 
        
        // Combine them
        color = mix(emissiveLava, litSlab, solidMask);
    } else if (deg >= 6) { 
        // Sun surface / Hot Star
        
        vec3 cLow, cMid, cHigh;
        float sunspotIntensity = 1.0;
        float extraGlow = 0.0;
        
        if (deg == 6) {
            // Orange
            cLow = vec3(0.6, 0.1, 0.0);
            cMid = vec3(1.0, 0.4, 0.0);
            cHigh = vec3(1.0, 0.7, 0.1);
        } else if (deg == 7) {
            // Red
            cLow = vec3(0.5, 0.0, 0.0);
            cMid = vec3(0.9, 0.1, 0.0);
            cHigh = vec3(1.0, 0.3, 0.0);
        } else if (deg == 8) {
            // Yellow
            cLow = vec3(0.8, 0.4, 0.0);
            cMid = vec3(1.0, 0.8, 0.0);
            cHigh = vec3(1.0, 1.0, 0.4);
            sunspotIntensity = 0.5;
        } else if (deg == 9) {
            // Cyan-white
            cLow = vec3(0.0, 0.5, 0.7);
            cMid = vec3(0.4, 0.9, 1.0);
            cHigh = vec3(0.9, 1.0, 1.0);
            sunspotIntensity = 0.1;
            extraGlow = 0.5;
        } else {
            // Cyan-blue (10+)
            cLow = vec3(0.0, 0.1, 0.8);
            cMid = vec3(0.0, 0.5, 1.0);
            cHigh = vec3(0.4, 0.8, 1.0);
            sunspotIntensity = 0.0;
            extraGlow = 1.0;
        }

        // Solar plasma generation using heavy domain warping
        vec2 q = p * 4.0; 
        
        // Deep nested FBM for highly detailed plasma turbulence
        vec2 warp1 = vec2(
            fbm(q + vec2(u_time * 0.05)),
            fbm(q + vec2(13.5, 4.2) - u_time * 0.04)
        );
        vec2 warp2 = vec2(
            fbm(q + warp1 * 2.0 + vec2(u_time * 0.1)),
            fbm(q + warp1 * 2.5 - vec2(u_time * 0.15))
        );
        
        float n = fbm(q + warp2 * 3.0);
        
        // Solar flares / magnetic field lines using ridged noise
        float flares = ridged(q * 2.0 + warp2 * u_time * 0.1);
        
        // Granulation (the small convective bubbles on a star's surface)
        // Using distance to cell center (v.z) to make the granules round, soft and bubble-like
        vec3 v = voronoi(q * 6.0 + warp1);
        float granulation = smoothstep(0.1, 0.7, 1.0 - v.z); 
        
        // Combine features
        // Higher temp stars are generally more aggressive/turbulent visually
        float surface = n * 0.5 + flares * 0.3 + granulation * 0.2;
        
        // Increase contrast for the boiling look
        surface = smoothstep(0.2, 0.8, surface);
        
        // Map to temperature colors
        vec3 starColor = mix(cLow, cMid, smoothstep(0.0, 0.5, surface));
        starColor = mix(starColor, cHigh, smoothstep(0.4, 1.0, surface));
        
        // Add intense glowing and some dark spots (sunspots)
        // Sunspots appear more strongly at lower temperatures
        float sunspots = smoothstep(0.4, 0.2, n) * smoothstep(0.5, 0.2, flares);
        starColor = mix(starColor, cLow * 0.2, sunspots * sunspotIntensity);
        
        // Extremely bright emissive multiplier
        color = starColor * (1.5 + surface * 1.5 + extraGlow);
    } else {
        // fallback / degree 0
        color = vec3(0.0, 1.0, 0.0);
    }

    // Blend gently with exact CSS variables
    vec3 blend_color = mix(color, color * u_heatColor, 0.4);
    // color = mix(color, color * u_heatColor, 0.2);
    
    // Add color neon right on the border gradient area
    float neon = smoothstep(0.12, 0.0, abs(dist - 0.22));
    blend_color += u_heatColor * neon * 1.5;
    // color += u_heatColor * neon * 1.5;
    
    fragmentColor = vec4(color * edgeMask, 1.0);
}