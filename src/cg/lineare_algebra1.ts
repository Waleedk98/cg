import { color, degrees } from "three/examples/jsm/nodes/Nodes.js";
import Playground from "./playground";

const pg = new Playground();


//Vektor length fuction
function vecLength(vector: string | any[]) {
    // Initialize sum of squares of each component
    let sumOfSquares = 0;

    // Loop through each component of the vector
    for (let i = 0; i < vector.length; i++) {
        // Add the square of each component to the sum
        sumOfSquares += vector[i] ** 2;
    }

    // Return the square root of the sum of squares (magnitude)
    return Math.sqrt(sumOfSquares);
}

const v1 = [1, 1, 1];
const lengthOfV = vecLength(v1);
console.log("Length of vector v1:", lengthOfV); // Output: Length of vector v: 3.742


// Normalize 

function vecNormalize(vector: number[]): number[] {
    const length = vecLength(vector);

    // Handle the case when the length is 0 (to prevent division by zero)
    const computedLength = length === 0 ? 1 : length;

    // Calculate the inverse of the computed length
    const inverseLength = 1 / computedLength;

    // Normalize the vector by multiplying each component by the inverse length
    const normalizedVector = vector.map(component => component * inverseLength);

    return normalizedVector;
}

const v2 = [2, 2, 3];
const normalizedV = vecNormalize(v2);
console.log("Normalized vector v2:", normalizedV); // Output: Normalized vector v: [0.5345224838248488, 0.5345224838248488, 0.8017837257372732]

// vecDotProduct A * B
function vecDotProduct(u: number[], v: number[]): number {
    // Check if the vectors have the same length
    if (u.length !== v.length) {
        throw new Error("Vectors must have the same length for dot product calculation.");
    }

    // Initialize the dot product sum
    let dotProduct = 0;

    // Compute the dot product
    for (let i = 0; i < u.length; i++) {
        dotProduct += u[i] * v[i];
    }

    return dotProduct;
}

// Beispiel-Vektoren
const vector1 = [1, 0, 1];
const vector2 = [1, 1, 0];

// Berechne das Dotprodukt der Vektoren
const dotProduct = vecDotProduct(vector1, vector2);
console.log("Dot Product:", dotProduct);

// Berechne die Längen (Normen) der Vektoren
const lengthVector1 = vecLength(vector1);
console.log("vetor1_length:",lengthVector1);
const lengthVector2 = vecLength(vector2);
console.log("vetor2_length:",lengthVector2);

// Berechne den Kosinuswert des Winkels zwischen den Vektoren
const cosineTheta =  (dotProduct / (lengthVector1 * lengthVector2));
console.log("Cosinus:", cosineTheta);

// Berechne den Winkel in Radiant
const thetaRadians = Math.acos(cosineTheta);
//const thetaRadians = Math.max(-1,Math.min(1, Math.acos(cosineTheta)));
console.log("Winkel:", thetaRadians);

// Konvertiere den Winkel von Radiant in Grad
const angleDegrees = thetaRadians * (180 / Math.PI);

console.log("Degrees between vector1 and vector2:", angleDegrees);
// Some vectors
const v = [2,2,3]
const w = [1,2,3]

// Do some math
const sub = [v[0] - w[0], v[1] - w[1], v[2] - w[2]]

//crossproduct AxB
function vecCrossProduct(u: number[], v: number[]): number[] {
    // Check if both vectors have exactly three components
    if (u.length !== 3 || v.length !== 3) {
        throw new Error("Cross product is only defined for 3-dimensional vectors.");
    }

    // Compute the components of the cross product
    const crossProductX = u[1] * v[2] - u[2] * v[1];
    const crossProductY = u[2] * v[0] - u[0] * v[2];
    const crossProductZ = u[0] * v[1] - u[1] * v[0];

    // Return the resulting cross product vector
    return [crossProductX, crossProductY, crossProductZ];
}

// Test the vecCrossProduct function
const vector3 = [1, 1, 0]; // i
const vector4 = [1, 0, 1]; // j
pg.visVector(vector3, {color: "black", label:"vector3"});
pg.visVector(vector4, {color: "green", label:"vector4"});

const crossProduct1 = vecCrossProduct(vector3, vector4);
console.log("Cross product vector (i x j):", crossProduct1); // Expected: [0, 0, 1] (k)
pg.visVector(crossProduct1, {color:"purple", label:"crossproduct1"});

const crossProduct2 = vecCrossProduct(vector4, vector3);
console.log("Cross product vector (j x i):", crossProduct2); // Expected: [0, 0, -1] (-k)
pg.visVector(crossProduct2, {color:"brown", label:"crossproduct2"});



// Visualize
pg.gridXZ(); // Grid

/*
pg.visVector(v,{color:"orange",label:"V"});
pg.visVector(w,{color:"dodgerblue",label:"W"});
pg.visVector(sub,{color:"green",placeAt:w});
pg.visVector(normalizedV, {color :"Yellow", label:"Normalized" });
pg.visVector(vector1, {color:"blue", label: "vektor1"});
pg.visVector(vector2, {color:"red", label: "vektor2"});
*/