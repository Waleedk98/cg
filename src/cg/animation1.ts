import { easeOutBounce } from "./helper";
import Framebuffer from "./framebuffer";

const canvasWidth = 100;
const canvasHeight = 100;
const framebuffer = new Framebuffer(canvasWidth, canvasHeight);

let frameIndex = 0;

// Durchlaufe Werte von 0 bis 1 in Schritten von 0,02
for (let step = 0; step <= 1; step += 0.02) {
    framebuffer.clear();
        
    // Berechne Offsets für RGB
    const redOffset = easeOutBounce(((step + 0) * 2) % 1);
    const greenOffset = easeOutBounce(((step + 0.33) * 4) % 1);
    const blueOffset = easeOutBounce((step + 0.66) % 1);

    // Skaliere Werte von 0-1 auf -1 bis 1
    const scaledRed = redOffset * 2 - 1;
    const scaledGreen = greenOffset * 2 - 1;
    const scaledBlue = blueOffset * 2 - 1;

    const redValue = Math.round((canvasHeight - 1) * Math.abs(scaledRed));
    const greenValue = Math.round((canvasHeight - 1) * Math.abs(scaledGreen));
    const blueValue = Math.round((canvasHeight - 1) * Math.abs(scaledBlue));

    framebuffer.draw(25, redValue, [255, 0, 0]);
    framebuffer.draw(50, greenValue, [0, 255, 0]);
    framebuffer.draw(75, blueValue, [0, 0, 255]);
    
    framebuffer.update();
    framebuffer.save("frame." + ++frameIndex);
}
