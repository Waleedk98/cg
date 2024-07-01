export function vecAdd(v1: Array<number>, v2: Array<number>): Array<number> {
    if (v1.length !== v2.length) {
        throw new Error("Vectors must be of the same length");
    }
    return v1.map((val, index) => val + v2[index]);
}

export function vecMultiplyScalar(s: number, v: Array<number>): Array<number> {
    return v.map(val => s * val);
}

export function vecSubtract(v1: Array<number>, v2: Array<number>): Array<number> {
    if (v1.length !== v2.length) {
        throw new Error("Vectors must be of the same length");
    }
    return v1.map((val, index) => val - v2[index]);
}
 