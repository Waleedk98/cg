// framebuffer.ts

export type Color3 = [number, number, number];

export interface ICoord2D {
    x: number;
    y: number;
}

export default class Framebuffer {
     canvas: HTMLCanvasElement;
     ctx: CanvasRenderingContext2D | null;
     buffer: ImageData | undefined;
     color: Color3 = [0, 0, 0];
     saveLink: HTMLAnchorElement | undefined;
     saveButton: HTMLButtonElement | undefined;
     logField: HTMLUListElement | undefined;

    constructor(width = 100, height = 100) {
        // Initialisierung des Canvas und der Elemente
        const appEl = document.getElementById("app")!;
        appEl.style.display = "flex";
        appEl.style.height = "100vh";
        appEl.style.width = "100vw";
        appEl.style.flexDirection = "column";
        appEl.style.justifyContent = "center";
        appEl.style.alignItems = "center";

        this.canvas = document.createElement("canvas");
        this.canvas.id = "framebuffer";
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.borderWidth = "2px";

        const header = document.createElement("h2");
        header.innerText = `framebuffer: ${width}x${height}`;
        appEl.appendChild(header);
        appEl.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        if (!this.ctx) {
            console.warn("No canvas 2d context!");
            return;
        }

        // Setup save link
        this.saveLink = document.createElement("a");
        this.saveLink.id = "save";
        this.saveLink.style.display = "none";
        appEl.appendChild(this.saveLink);

        // Save button
        this.saveButton = document.createElement("button");
        this.saveButton.innerText = "Download Frames";
        appEl.appendChild(this.saveButton);

        this.saveButton.addEventListener("click", () => this.download());

        // Log 
        this.logField = document.createElement("ul");
        this.logField.id = "log";
        appEl.appendChild(this.logField);

        // Get pixel data
        this.buffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(x: number, y: number, color: Color3 = [80, 80, 80], parameters?: {}): void {
        this.color = color;

        if (!this.buffer) return;

        // Berechnung des Offsets für den Pixel
        const offset = 4 * x + (this.buffer.width * 4) * y;

        // Setzen der Farbwerte im Puffer
        const [r, g, b] = this.color;
        this.buffer.data[offset] = r; // Red
        this.buffer.data[offset + 1] = g; // Green
        this.buffer.data[offset + 2] = b; // Blue
        this.buffer.data[offset + 3] = 255; // Alpha (undurchsichtig)
    }

    update(): void {
        if (!this.ctx || !this.buffer) return;

        // Zeichnen des Puffers auf das Canvas
        this.ctx.putImageData(this.buffer, 0, 0);
    }

    save(name: string): void {
        if (this.canvas) {
            sessionStorage.setItem("render." + name, this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        }
    }

    download(): void {
        for (const key in sessionStorage) {
            if (key.indexOf("render.") === 0) {
                sessionStorage.getItem(key);
                console.info("Downloading", key);
                this.saveLink!.setAttribute('download', key + '.png');
                this.saveLink!.setAttribute('href', sessionStorage[key]);
                this.saveLink!.click();
            }
        }
    }

    log(content: string): void {
        if (this.logField) {
            this.logField.innerText = content;
        }
    }

    clear(): void {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.buffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            this.update();
        }
    }
}
