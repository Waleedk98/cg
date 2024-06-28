import Playground from "./playground"; // Import the Playground class to use its visualization methods
const pg = new Playground(); // Create a new Playground instance

const sphere = {
    position: [0, 0.5, -3], // Define the sphere's center position
    radius: 1.23 // Define the sphere's radius
}

pg.visCamera(-1); // Set the camera position
pg.gridXZ(); // Draw the grid on the XZ plane

const o: number[] = [0, 0, 0]; // Origin point
const co: number[] = [o[0] - sphere.position[0], o[1] - sphere.position[1], o[2] - sphere.position[2]]; // Vector from sphere center to origin

const step = 1 / 32; // Step size for the grid

// Function to calculate dot product of two vectors
function dotProduct(v1: number[], v2: number[]): number {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

// Function to multiply a vector by a scalar
function vecMultiplyScalar(scalar: number, vector: number[]): number[] {
    return [scalar * vector[0], scalar * vector[1], scalar * vector[2]];
}

// Loop over y coordinates
for (let yCoord = -1; yCoord <= 1; yCoord += step) {
    // Loop over x coordinates
    for (let xCoord = -1; xCoord <= 1; xCoord += step) {
        const v: number[] = [xCoord, yCoord, -1]; // Define the ray direction
        const ov: number[] = [v[0] - o[0], v[1] - o[1], v[2] - o[2]]; // Vector from origin to the point on the image plane

        //pg.visVector(ov); // Visualize the vector

        // Calculate coefficients a, b, c for the quadratic equation
        const a: number = dotProduct(ov, ov); // a = (V-O)·(V-O)
        const b: number = 2 * dotProduct(ov, co); // b = 2 * (V-O)·(O-C)
        const c: number = dotProduct(co, co) - sphere.radius * sphere.radius; // c = (O-C)·(O-C) - r^2

        const discriminant: number = b * b - 4 * a * c; // Calculate the discriminant

        if (discriminant >= 0) { // If the discriminant is non-negative, there are real solutions
            const t1: number = (-b + Math.sqrt(discriminant)) / (2 * a);
            const t2: number = (-b - Math.sqrt(discriminant)) / (2 * a);

            if (t1) {
                pg.visPoint(vecMultiplyScalar(t1, v), { color: "red" }); // Visualize the first intersection point in red
            }

            if (t2) {
                pg.visPoint(vecMultiplyScalar(t2, v), { color: "blue" }); // Visualize the second intersection point in blue
            }
        }
    }
}
