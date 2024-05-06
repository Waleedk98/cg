import { color, degrees } from "three/examples/jsm/nodes/Nodes.js";
import Playground from "./playground";

const pg = new Playground();

//3x3 matrix_function
function matrixProduct(a, b) {
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
const matrixA = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];

const matrixB = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];

const productMatrix = matrixProduct(matrixA, matrixB);
console.log(productMatrix);


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
    [2, 2, 2],
    [2, 2, 2],
    [2, 2, 2]
];

const matrix2 = [
    [9, 2, 7],
    [1, 2, 1],
    [2, 2, 2]
];

const matrix3 = [
    [2, 2, 2],
    [2, 2, 2],
    [2, 2, 2]
];

// Create an arbitrary vector (3x1)
const vector = [4, 8, 9];

// Apply transformations sequentially using individual matrices
let transformedVector = multVecMatrix(vector, matrix1);
console.log("Transformvector: ", transformedVector);
pg.visVector(transformedVector, {color:"blue", label:"transformedvector"});

const transformedVector1 = multVecMatrix(transformedVector, matrix2);
console.log("Transformvector1: ", transformedVector1);
pg.visVector(transformedVector1, {color:"red", label:"transformedvector1"});

const transformedVector2 = multVecMatrix(transformedVector1, matrix3);
console.log("Transformvector2: ", transformedVector2);
pg.visVector(transformedVector2, {color:"green", label:"transformedvector3"});

console.log("Transformed vector (Sequential Transformations):", transformedVector2);

/* Combine all three matrices into one matrix (A * B * C)
const combinedMatrix = [
    multVecMatrix(matrix1[0], matrix2),
    multVecMatrix(matrix1[1], matrix2),
    multVecMatrix(matrix1[2], matrix2)
];

const combinedMatrix2 = [
    multVecMatrix(combinedMatrix[0], matrix3),
    multVecMatrix(combinedMatrix[1], matrix3),
    multVecMatrix(combinedMatrix[2], matrix3)
];
*/
const Matrix01 = matrixProduct (matrixProduct(matrix1,matrix2), matrix3);
console.log("Matrix01: ",Matrix01);



// Apply transformation using the combined matrix (A * B * C)
const combinedTransformedVector = multVecMatrix(vector, Matrix01);

console.log("Transformed vector (Combined Matrix):", combinedTransformedVector);



