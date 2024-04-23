
import Playground from "./playground";



const pg = new Playground();

const point = [0.5, 0.6, -3];
const distImagePlane = -1;

// Funktion zur perspektivischen Teilung

// Creates a basic camera visualization
pg.visCamera(distImagePlane);

pg.visVector(point, { color: "orange", label: "P", triangles: true })

// Funktion zur perspektivischen Teilung
function perspDivide(p: Array<number>,dist:number) {
    const x = distImagePlane * p[0] / p[2];
    const y = distImagePlane * p[1] / p[2];
    const z = distImagePlane;
    return [x,y,z]
}


let pProjected = perspDivide(point, distImagePlane);
pg.visVector(pProjected, { color: "blue", label: "P'", triangles: true })