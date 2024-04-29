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

const v1 = [1, 1, 3];
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

// Some vectors
const v = [2,2,3]
const w = [1,2,3]

// Do some math
const sub = [v[0] - w[0], v[1] - w[1], v[2] - w[2]]


// Visualize
pg.gridXZ(); // Grid

pg.visVector(v,{color:"orange",label:"V"});
pg.visVector(w,{color:"dodgerblue",label:"W"});
pg.visVector(sub,{color:"green",placeAt:w});