// task.ts

// Importieren der Framebuffer-Klasse aus dem kompilierten JavaScript-Code
import Framebuffer from './framebuffer.ts';

// Beispielverwendung der Framebuffer-Klasse
const framebuffer = new Framebuffer(800, 600);
framebuffer.draw(100, 200, [255, 0, 0]); // Beispiel: Zeichne rotes Pixel an den Koordinaten (100, 200)
framebuffer.update(); // Aktualisiere das Canvas

// Weitere Verwendung der Framebuffer-Klasse...

// Define a Vector3 type representing a 3D vector with x, y, z components
interface Vector3 {
    x: number;
    y: number;
    z: number;
}

// Define a function to convert from raster space to screen space
function rasterToScreen(xRaster: number, yRaster: number, width: number, height: number): Vector3 {
    // Convert from raster space to normalized device coordinates (NDC) [0, 1]
    const ndcX = (xRaster + 0.5) / width;
    const ndcY = (yRaster + 0.5) / height;

    // Convert from NDC [0, 1] to screen space [-1, 1]
    const screenX = 2 * ndcX - 1;
    const screenY = 1 - 2 * ndcY;

    // Return the resulting screen coordinates as a Vector3
    return { x: screenX, y: screenY, z: 0 };
}

// Example usage:
const rasterX = 100;
const rasterY = 200;
const canvasWidth = 800;
const canvasHeight = 600;

// Convert raster coordinates (100, 200) to screen space using a canvas size of (800, 600)
const screenCoords = rasterToScreen(rasterX, rasterY, canvasWidth, canvasHeight);

// Output the resulting screen coordinates
console.log(screenCoords); // Output: { x: -0.375, y: 0.5, z: 0 }
