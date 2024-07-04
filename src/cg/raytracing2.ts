import Framebuffer from "./framebuffer";
import * as helper from './helper.js';
import spheresData from '/Users/waleedkhaliq/Desktop/Studium/4.Semester/GDV/project/computergraphics/src/cg/bird.json';

// Blender-Transformationsdaten
const birdTransformMatrix: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number] = [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, -2.5, 0.0, 1.0
];

const birdRotationMatrix = helper.Mat3ToMat4(helper.RotX(helper.DegToRad(-90)));
const finalBirdTransform = helper.Mat4MulMat4(birdRotationMatrix, birdTransformMatrix);

for (let sphere of spheresData) {
    sphere.center = helper.Vec3MulMat4(sphere.center as [number, number, number], finalBirdTransform);
}

const canvasWidth = 600;
const canvasHeight = 600;
const framebuffer = new Framebuffer(canvasWidth, canvasHeight);
const imagePlaneDistance = -1;

const nearClippingPlane = 1;
const farClippingPlane = 1000;

const bgColor: [number, number, number] = [80, 40, 40];
const origin: [number, number, number] = [0, 0, 0];

const sceneLights: Array<helper.Light> = [
    { 
        intensity: 2.0,
        position: helper.Vec3MulMat3([0, 0, 10] as [number, number, number], helper.RotX(helper.DegToRad(-30)))
    },
    {
        intensity: 1.0,
        position: helper.Vec3MulMat3(helper.Vec3MulMat3([0, 0, 10] as [number, number, number], helper.RotX(helper.DegToRad(-20))), helper.RotY(helper.DegToRad(-90)))
    },
    {
        intensity: 1.5,
        position: helper.Vec3MulMat3([0, 0, -10] as [number, number, number], helper.RotX(helper.DegToRad(30)))
    }
];

const cameraTranslation: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number] = [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 7.5, 1.0
];

const cameraRotationX = helper.Mat3ToMat4(helper.RotX(helper.DegToRad(-20)));
const initialCameraTransform = helper.Mat4MulMat4(cameraTranslation, cameraRotationX);

let frameCount = 0;

for (let t = 0; t <= 1; t += 0.02) {
    framebuffer.clear();

    const cameraRotationY = helper.Mat3ToMat4(helper.RotY(helper.DegToRad(360 * t)));
    const currentCameraTransform = helper.Mat4MulMat4(initialCameraTransform, cameraRotationY);

    for (let x = 0; x <= canvasWidth; x++) {
        for (let y = 0; y <= canvasHeight; y++) {

            const screenSpaceCoord = helper.ConvertRasterSpaceToScreenSpace([x, y], [canvasWidth, canvasHeight]) as [number, number, number];
            const transformedCoord = helper.Vec3MulMat4(screenSpaceCoord, currentCameraTransform) as [number, number, number];
            const transformedOrigin = helper.Vec3MulMat4(origin, currentCameraTransform) as [number, number, number];

            let closestSphere = null;
            let minIntersection = Infinity;

            for (let sphere of spheresData) {
                const [t1, t2] = helper.raySphereIntersect(transformedCoord, transformedOrigin, sphere.center as [number, number, number], sphere.radius);

                if (t1 < minIntersection && nearClippingPlane < t1 && t1 < farClippingPlane) {
                    minIntersection = t1;
                    closestSphere = sphere;
                }

                if (t2 < minIntersection && nearClippingPlane < t2 && t2 < farClippingPlane) {
                    minIntersection = t2;
                    closestSphere = sphere;
                }
            }

            if (!closestSphere) {
                framebuffer.draw(x, y, bgColor);
            } else {
                const surfacePosition = helper.RayEquation(transformedCoord, transformedOrigin, minIntersection) as [number, number, number];
                const surfaceNormal = helper.VecSub(surfacePosition, closestSphere.center as [number, number, number]) as [number, number, number];
                const lightIntensity = helper.lighting(surfacePosition, surfaceNormal, sceneLights);
                const sphereColor = helper.VecMulNum(closestSphere.color, lightIntensity) as [number, number, number];
                framebuffer.draw(x, y, [sphereColor[0], sphereColor[1], sphereColor[2]]);
            }
        }
    }

    framebuffer.update();
    framebuffer.save("spheres." + ++frameCount);
    console.log("Frame: %d", frameCount);
}
