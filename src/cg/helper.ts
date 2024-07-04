import Playground from "./playground";


// Add your function "perspDivide".
// IMPORTANT: Our camera points along -Z.
export function perspDivide(p: Array<number>, dist: number) {
    return [(p[0] / p[2]) * dist, (p[1] / p[2]) * dist, dist];
}

// Ray equation //
export function RayEquation(point: Array<number>, origin: Array<number>, dist: number) {
    // dist * (point - origin) + origin
    return VecAdd(VecMulNum(VecSub(point, origin), dist), origin);
}

// Rotation //
export function RadToDeg(angleInDeg: number) {
    return angleInDeg * (180 / Math.PI);
}

export function DegToRad(angleInDeg: number) {
    return angleInDeg * (Math.PI / 180);
}

export function RotX(angleInRad: number) {
    return [1, 0, 0, 0, Math.cos(angleInRad), Math.sin(angleInRad), 0, -Math.sin(angleInRad), Math.cos(angleInRad)];
}

export function RotY(angleInRad: number) {
    return [Math.cos(angleInRad), 0, -Math.sin(angleInRad), 0, 1, 0, Math.sin(angleInRad), 0, Math.cos(angleInRad)];
}

export function RotZ(angleInRad: number) {
    return [Math.cos(angleInRad), Math.sin(angleInRad), 0, -Math.sin(angleInRad), Math.cos(angleInRad), 0, 0, 0, 1];
}

// Vector //
export function VecAdd(vecOne: Array<number>, vecTwo: Array<number>) {
    let result = [];

    let i = 0;
    while (i < vecOne.length) {
        result.push(i < vecTwo.length ? vecOne[i] + vecTwo[i] : vecOne[i]);
        i++;
    }

    while (i < vecTwo.length) {
        result.push(vecTwo[i]);
        i++;
    }

    return result;
}

export function VecSub(vecOne: Array<number>, vecTwo: Array<number>) {
    let result = [];

    let i = 0;
    while (i < vecOne.length) {
        result.push(i < vecTwo.length ? vecOne[i] - vecTwo[i] : vecOne[i]);
        i++;
    }

    while (i < vecTwo.length) {
        result.push(-vecTwo[i]);
        i++;
    }

    return result;
}

export function VecMul(vecOne: Array<number>, vecTwo: Array<number>) {
    let result = [];

    let i = 0;
    while (i < vecOne.length) {
        result.push(i < vecTwo.length ? vecOne[i] * vecTwo[i] : 0);
        i++;
    }

    while (i < vecTwo.length) {
        result.push(0);
        i++;
    }

    return result;
}

export function VecMulNum(vecOne: Array<number>, num: number) {
    let result = [];
    for (let i = 0; i < vecOne.length; ++i) {
        result.push(vecOne[i] * num);
    }

    return result;
}

export function VecDiv(vecOne: Array<number>, vecTwo: Array<number>) {
    let result = [];

    let i = 0;
    while (i < vecOne.length) {
        if (i < vecTwo.length) {
            result.push(vecTwo[i] !== 0 ? vecOne[i] / vecTwo[i] : 0);
        } else {
            result.push(0);
        }
        i++;
    }

    while (i < vecTwo.length) {
        result.push(0);
        i++;
    }

    return result;
}

// Matrices //
export function Mat3MulMat3(mat3One: Array<number>, mat3Two: Array<number>) {
    const result = [];
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            let sum = 0;
            for (let k = 0; k < 3; k++) {
                sum += mat3One[(i * 3) + k] * mat3Two[(k * 3) + j];
            }
            result.push(sum);
        }
    }
    return result;
}

export function Vec3MulMat3(vec3: Array<number>, mat3: Array<number>) {
    const result = [];
    for (let i = 0; i < 3; ++i) {
        let sum = 0;
        for (let j = 0; j < 3; ++j) {
            sum += vec3[j] * mat3[(j * 3) + i];
        }
        result.push(sum);
    }
    return result;
}

export function Mat4MulMat4(mat4One: Array<number>, mat4Two: Array<number>) {
    const result = [];
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += mat4One[(i * 4) + k] * mat4Two[(k * 4) + j];
            }
            result.push(sum);
        }
    }
    return result;
}

export function Vec3MulMat4(vec3: Array<number>, mat4: Array<number>) {
    const vec4 = [vec3[0], vec3[1], vec3[2], 1];

    const result = [];
    for (let i = 0; i < 4; ++i) {
        let sum = 0;
        for (let j = 0; j < 4; ++j) {
            sum += vec4[j] * mat4[(j * 4) + i];
        }
        result.push(sum);
    }
 
    return [result[0], result[1], result[2]];
}

export function Mat3ToMat4(mat3: Array<number>) {
    const result = [];

    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            result.push(mat3[(i * 3) + j]);
        }

        result.push(0);
    }

    result.push(0, 0, 0, 1);

    return result;
}

export function VisPoints(pg: Playground, points: Array<Array<number>>, pointScale: number, pointColor: string) {
    for (let p of points) {
        pg.visPoint(p, {pscale:pointScale, color:pointColor});
    }
}

export function Length(points: Array<number>) {
    let length = 0;
    for (let i = 0; i < points.length; ++i) {
        length += Math.pow(points[i], 2);
    }

    return Math.sqrt(length);
}

export function Normalize(points: Array<number>) {
    let length = Length(points);
    if (length == 0.0) { length = 1; }

    return VecMulNum(points, 1.0 / length);
}

export function VecDotProduct(vecOne: Array<number>, vecTwo: Array<number>) {
    let dotProduct = 0;
    for (let i = 0; i < vecOne.length && i < vecTwo.length; ++i) {
        dotProduct += vecOne[i] * vecTwo[i];
    }

    return dotProduct;
}

export function VecAngleInRad(vecOne: Array<number>, vecTwo: Array<number>) {
    let lengthOne = Length(vecOne);
    let lengthTwo = Length(vecTwo);

    if (lengthOne == 0 || lengthTwo == 0) { return 0; }

    return Math.acos(VecDotProduct(vecOne, vecTwo) / (lengthOne * lengthTwo));
}

export function CrossProduct(vecOne: Array<number>, vecTwo: Array<number>) {
    if (vecOne.length < 3 || vecTwo.length < 3) { return [0, 0, 0]; }
    
    let crossProduct = [];

    crossProduct.push((vecOne[1] * vecTwo[2]) - (vecOne[2] * vecTwo[1]));
    crossProduct.push(-((vecOne[0] * vecTwo[2]) - (vecOne[2] * vecTwo[0])));
    crossProduct.push((vecOne[0] * vecTwo[1]) - (vecOne[1] * vecTwo[0]));

    return crossProduct;
}

export function ConvertRasterSpaceToScreenSpace(position: Array<number>, windowSize: Array<number>) {
    if (position.length < 2 || windowSize.length < 2 || windowSize[0] == 0 || windowSize[1] == 0) {
        return [0, 0, 0];
    }

    const xNDC = (position[0] + 0.5) / windowSize[0];
    const yNDC = (position[1] + 0.5) / windowSize[1];

    return [(2 * xNDC) - 1, 1 - (2 * yNDC), -1];
}

export function easeOutBounce(x: number): number {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}

export function raySphereIntersect(v: Array<number>, o: Array<number>, sphereCenter: Array<number>, sphereRadius: number): [number, number] {
    const co = VecSub(o, sphereCenter);
    const ov = VecSub(v, o); // vector from sphere to ray (V - O)

    const a = VecDotProduct(ov, ov);
    const b = 2 * VecDotProduct(ov, co);
    const c = VecDotProduct(co, co) - Math.pow(sphereRadius, 2);

    const discriminant = Math.pow(b, 2) - (4 * a * c);

    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    return [t1, t2]
}

export type Light = {
    intensity: number;
    position: Array<number>;
};
export function lighting(surfPosition: Array<number>, surfNormal: Array<number>, lights: Array<Light>//<--- parameters for surface position, normal and array of lights
) {
    let intensity = 0.0;

    for (let i = 0; i < lights.length; i++) {
        const incidentVec =  Normalize(VecSub(lights[i].position, surfPosition)); // <--- normalized vector from surface to light
       
        const dotP = VecDotProduct(surfNormal, incidentVec); // <--- dot product between surface normal and incident vector 

        if (dotP > 0) {
            intensity += lights[i].intensity * dotP; // <--- scale the lights intensity with the dot product
        }
    }
    return intensity;
}
