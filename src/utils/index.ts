export function removeItem<T>(a:T[],item:T) {
    const i = a.indexOf(item);
    if (i > -1) a.splice(i, 1);
}