// Importieren der benötigten Funktionen aus lineare_algebra1.ts
import Playground from "./playground";


export function vecDotProduct(u: number[], v: number[]): number {
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

export function vecMultiplyScalar(scalar: number, vector: number[]): number[] {
    // Erzeugt einen neuen Vektor, der das Ergebnis der Skalarmultiplikation enthält
    const result: number[] = [];
    
    // Durchläuft jeden Eintrag im Vektor und multipliziert ihn mit dem Skalar
    for (let i = 0; i < vector.length; i++) {
        result[i] = scalar * vector[i];
    }
    
    // Gibt den neuen Vektor zurück, der das Ergebnis der Skalarmultiplikation enthält
    return result;
}

export function vecSubtract(vector1: number[], vector2: number[]): number[] {
    // Überprüfen, ob beide Vektoren die gleiche Länge haben
    if (vector1.length !== vector2.length) {
        throw new Error("Vectors must have the same length for subtraction.");
    }
    
    // Erzeugt einen neuen Vektor für das Ergebnis der Vektorsubtraktion
    const result: number[] = [];
    
    // Durchläuft jeden Eintrag in den Vektoren und subtrahiert die entsprechenden Einträge
    for (let i = 0; i < vector1.length; i++) {
        result[i] = vector1[i] - vector2[i];
    }
    
    // Gibt den neuen Vektor zurück, der das Ergebnis der Vektorsubtraktion enthält
    return result;
}

// Erstellen einer neuen Playground-Instanz
const pg = new Playground();
console.log("test");

// Definition der Eigenschaften der Kugel: Position und Radius
const sphere = {
    position: [0, 0.5, -3],
    radius: 1.23
};

// Visualisierung der Kameraposition (optional)
pg.visCamera(-1);

// Visualisierung eines Gitters in der XZ-Ebene (optional)
pg.gridXZ();

// Definition des Ursprungspunkts O
const o = [0, 0, 0];

// Berechnung des Vektors CO (O - C)
const co = vecSubtract(o, sphere.position);

// Festlegen der Schrittweite für die Schleifen über die Koordinaten auf der Bildebene
const step = 1 / 8;

// Schleife über y- und x-Koordinaten auf der Bildebene
for (let yCoord = -1; yCoord <= 1; yCoord += step) {
    for (let xCoord = -1; xCoord <= 1; xCoord += step) {

        // Definition des Vektors V für die aktuelle Pixelkoordinate
        const v = [xCoord, yCoord, -1];

        // Berechnung des Vektors OV (V - O)
        const ov = vecSubtract(v, o);

        // Visualisierung des Vektors OV
        pg.visVector(ov);

        // Berechnung der Koeffizienten a, b und c für die quadratische Gleichung
        const a = vecDotProduct(ov, ov);
        const b = 2 * vecDotProduct(ov, co);
        const c = vecDotProduct(co, co) - sphere.radius * sphere.radius;

        // Berechnung der Diskriminante der quadratischen Gleichung
        const discriminant = b * b - 4 * a * c;

        // Überprüfen, ob die Diskriminante nicht-negativ ist, um gültige Schnittpunkte sicherzustellen
        if (discriminant >= 0) {
            // Berechnung der Lösungen t1 und t2 der quadratischen Gleichung
            const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            
            // Visualisierung der Schnittpunkte, wenn sie nicht-negativ sind
            if (t1 >= 0) {
                pg.visPoint(vecMultiplyScalar(t1, v), { color: "red" });
            }

            if (t2 >= 0) {
                pg.visPoint(vecMultiplyScalar(t2, v), { color: "blue" });
            }
        }
    }
}
