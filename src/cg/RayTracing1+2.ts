import Framebuffer from "./framebuffer";

type Vec3 = [number, number, number];

interface ISphere {
    center: Vec3;
    radius: number;
    color: [number, number, number];
}

function vecDotProduct(u: Vec3, v: Vec3): number {
    return u.reduce((sum, ui, i) => sum + ui * v[i], 0);
}

function vecSubtract(vector1: Vec3, vector2: Vec3): Vec3 {
    return vector1.map((v, i) => v - vector2[i]) as Vec3;
}

function vecMultiplyScalar(scalar: number, vector: Vec3): Vec3 {
    return vector.map(v => scalar * v) as Vec3;
}

function raySphereIntersect(v: Vec3, o: Vec3, sphere: ISphere): [number | null, number | null] {
    const co = vecSubtract(o, sphere.center);
    const a = vecDotProduct(v, v);
    const b = 2 * vecDotProduct(v, co);
    const c = vecDotProduct(co, co) - sphere.radius * sphere.radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant >= 0) {
        const sqrtDiscriminant = Math.sqrt(discriminant);
        const t1 = (-b + sqrtDiscriminant) / (2 * a);
        const t2 = (-b - sqrtDiscriminant) / (2 * a);
        return [t1, t2];
    }

    return [null, null];
}

const width = 600;
const height = 600;
const framebuffer = new Framebuffer(width, height);
const imagePlaneDist = -1;

const tNear = 1;
const tFar = 1000;

const spheres: ISphere[] = [
    {
        center: [0, 0, -5],
        radius: 1,
        color: [255, 0, 0]
    },
    {
        center: [2, 0, -5],
        radius: 1,
        color: [0, 255, 0]
    },
    {
        center: [-2, 0, -5],
        radius: 1,
        color: [0, 0, 255]
    }
];

const o: Vec3 = [0, 0, 0]; // the camera/viewer origin

// Loop over framebuffer pixels
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        // Convert raster to screen space
        const xNorm = (x / width) * 2 - 1; // Normalize x to [-1, 1]
        const yNorm = 1 - (y / height) * 2; // Normalize y to [1, -1]
        const v: Vec3 = [xNorm, yNorm, imagePlaneDist];

        let closestSphere: ISphere | null = null;
        let closestIntersection = tFar;

        for (let i = 0; i < spheres.length; i++) {
            const [t1, t2] = raySphereIntersect(v, o, spheres[i]);

            if (t1 !== null && t1 < closestIntersection && tNear < t1 && t1 < tFar) {
                closestIntersection = t1;
                closestSphere = spheres[i];
            }

            if (t2 !== null && t2 < closestIntersection && tNear < t2 && t2 < tFar) {
                closestIntersection = t2;
                closestSphere = spheres[i];
            }
        }

        if (!closestSphere) {
            framebuffer.draw(x, y, [0, 0, 0]); // Draw background color (black)
        } else {
            framebuffer.draw(x, y, closestSphere.color); // Draw color of closest sphere
        }
    }
}

framebuffer.update();
framebuffer.save("spheres");
