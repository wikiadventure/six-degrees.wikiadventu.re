export function removeItem<T>(a:T[],item:T) {
    const i = a.indexOf(item);
    if (i > -1) a.splice(i, 1);
}

export async function windowClose(target:Window | null) {
    return new Promise<void>((res,rej)=>{
        if (target == null) return rej();
        const interval = setInterval(() => {
            if (target.closed) {
                clearInterval(interval);
                res();
            }
        }, 100);
    })
}