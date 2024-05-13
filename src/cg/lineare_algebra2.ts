import { color, degrees } from "three/examples/jsm/nodes/Nodes.js";
import Playground from "./playground";

const pg = new Playground();
pg.gridXZ(); // Grid


//3x3 matrix_function
function matrixProduct(a: number[][], b: number[][]) {
    // Ergebnismatrix initialisieren
    const result = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // Matrixmultiplikation durchführen
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Berechne das Element an Position (i, j) der Ergebnismatrix
            for (let k = 0; k < 3; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    // Ergebnismatrix zurückgeben
    return result;
}

//MulitVecMatrix 
// Function to multiply a vector (3x1) by a matrix (3x3)
function multVecMatrix(vector: number[], matrix: number[][]) {
    // Initialize result vector
    let result = [0, 0, 0];

    // Perform vector-matrix multiplication
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i] += matrix[i][j] * vector[j];
        }
    }

    return result;
}

// Create three arbitrary 3x3 matrices
const matrix1 = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
];

const matrix2 = [
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3]
];

const matrix32 = [
    [2, 2, 2],
    [3, 3, 3],
    [2, 2, 2]
];

// Create an arbitrary vector (3x1)
const vector10 = [1, 2, 4];

//Apply transformations sequentially using individual matrices

const transformedVector = multVecMatrix(multVecMatrix(multVecMatrix(vector10, matrix1), matrix2), matrix3);
console.log("Transformed vector (Sequential Transformations):", transformedVector);
pg.visVector(transformedVector, {color:"black", label:"einzelnd"});

const Matrix01 = matrixProduct (matrixProduct(matrix1,matrix2), matrix32);
console.log("Result Matrixproduct: ",Matrix01);


// Apply transformation using the combined matrix (A * B * C)
const combinedTransformedVector = multVecMatrix(vector10, Matrix01);
pg.visVector (combinedTransformedVector, {color:"purple", label:"combined"});

console.log("Transformed vector (Combined Matrix):", combinedTransformedVector);


// ROTATE! 

// Function to convert degrees to radians
function degToRad(degrees: number) {
    return degrees * Math.PI / 180;
}

// Function to create a rotation matrix around the x-axis
function rotX(angleDegrees: number) {
    const angleRad = degToRad(angleDegrees);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    return [
        [1, 0, 0],
        [0, cos, -sin],
        [0, sin, cos]
    ];
}

// Function to create a rotation matrix around the y-axis
function rotY(angleDegrees: number) {
    const angleRad = degToRad(angleDegrees);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    return [
        [cos, 0, sin],
        [0, 1, 0],
        [-sin, 0, cos]
    ];
}

// Function to create a rotation matrix around the z-axis
function rotZ(angleDegrees: number) {
    const angleRad = degToRad(angleDegrees);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    return [
        [cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1]
    ];
}

// Function to multiply a vector (3x1) by a matrix (3x3)
/*function multVecMatrix(vector: number[], matrix: number[][]) {
    let result = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i] += matrix[i][j] * vector[j];
        }
    }

    return result;
}*/

// Example usage:
const vector11 = [6, 0, 0]; // Initial vector along the x-axis

// Rotate the vector around x-axis by 90 degrees
const rotationMatrixX = rotX(90);
const rotatedVectorX = multVecMatrix(vector11, rotationMatrixX);
console.log("Rotated vector around x-axis:", rotatedVectorX);
pg.visVector(rotatedVectorX, {color:"red", label:"X"});

// Rotate the vector around y-axis by 90 degrees
const rotationMatrixY = rotY(90);
const rotatedVectorY = multVecMatrix(vector11, rotationMatrixY);
console.log("Rotated vector around y-axis:", rotatedVectorY);
pg.visVector(rotatedVectorY, {color:"blue", label:"Y"});


// Rotate the vector around z-axis by 90 degrees
const rotationMatrixZ = rotZ(90);
const rotatedVectorZ = multVecMatrix(vector, rotationMatrixZ);
console.log("Rotated vector around z-axis:", rotatedVectorZ);
pg.visVector(rotatedVectorZ, {color:"black", label:"Z"});


// Shearing



// Define cube points as an array of arrays
const cubePoints: number[][] = [
    [0, 0, 0],  // Point 1
    [1, 0, 0],  // Point 2
    [1, 1, 0],  // Point 3
    [0, 1, 0]   // Point 4
];

// Define shear matrices
const shears: number[][] = [
    [1, 1, 0, 0, 1, 0, 0, 0, 1], // Shear in xy-plane along x-axis
    [1, 0, 1, 0, 1, 0, 0, 0, 1], // Shear in xy-plane along y-axis
    [1, 0, 0, 1, 1, 0, 0, 0, 1], // Shear in xz-plane along x-axis
    [1, 0, 0, 0, 1, 1, 0, 0, 1], // Shear in xz-plane along z-axis
    [1, 0, 0, 0, 1, 0, 1, 0, 1], // Shear in yz-plane along y-axis
    [1, 0, 0, 0, 1, 0, 0, 1, 1]  // Shear in yz-plane along z-axis
];

// Visualize shear vectors for each shear matrix
shears.forEach((shear, index) => {
    const color = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'][index]; // Choose color based on shear matrix index
    for (let i = 0; i < 3; i++) {
        const vector = [shear[i], shear[i + 3], shear[i + 6]];
        pg.visVector(vector, { color });
    }
});

// Apply shear transformation to cube points and visualize
for (let p of cubePoints) {
    // Iterate over each shear matrix
    shears.forEach((shear, index) => {
        const transformedPoint = multVecMatrix(p, shear);
        const color = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'][index]; // Choose color based on shear matrix index
        pg.visPoint(transformedPoint, { color, pscale: 0.05 }); // Visualize transformed point
    });
}

export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];

export type Matrix3 = [
    number, number, number,
    number, number, number,
    number, number, number
];

export type Matrix4 = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
];

export function multVec3Matrix4(v: Vec3, m: Matrix4): Vec3 {
    const v4: Vec4 = [v[0], v[1], v[2], 1];
    const result: Vec4 = [0, 0, 0, 0];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            result[i] += v4[j] * m[j * 4 + i];
        }
    }

    // Convert result back to Vec3 (ignore the fourth component)
    return [result[0], result[1], result[2]];
}
export function matrix4Product(a: Matrix4, b: Matrix4): Matrix4 {
    const result: Matrix4 = [];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += a[i * 4 + k] * b[k * 4 + j];
            }
            result[i * 4 + j] = sum; // Weise das Ergebnis direkt dem entsprechenden Index zu
        }
    }

    return result;
}

export function matrix3ToMatrix4(m: Matrix3): Matrix4 {
    const result: Matrix4 = [
        m[0], m[1], m[2], 0,
        m[3], m[4], m[5], 0,
        m[6], m[7], m[8], 0,
        0, 0, 0, 1
    ];
    return result;
}

// Beispieltests
const vector: Vec3 = [1, 2, 3];
const matrixA: Matrix4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];

const matrixB: Matrix4 = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1];
const matrix3: Matrix3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];

// Test multVec3Matrix4
const resultVec: Vec3 = multVec3Matrix4(vector, matrixA);
console.log("Result of vector-matrix multiplication:", resultVec); // Expected: [1, 2, 3]
pg.visVector (resultVec, {color:"black", label:"Result"});

// Test matrix4Product
const productMatrix: Matrix4 = matrix4Product(matrixA, matrixB);
console.log("Result of matrix product:", productMatrix);
pg.visVector(productMatrix, {color:"blue", label:"resultM"});

// Test matrix3ToMatrix4
//const resultMatrix4: Matrix4 = matrix3ToMatrix4(matrix3);
//console.log("Result of converting Matrix3 to Matrix4:", resultMatrix4);
//pg.visVector(resultMatrix4, {color:"blue", label:"resultM4"});


