class ASCIIAnimator {
    constructor(asciiArt, info) {
        this.originalArt = asciiArt.trim().split('\n');
        this.matrix = this.asciiToMatrix(this.originalArt);
        this.animatedArt = this.originalArt; // Default to static ASCII art
        this.info = info; // Anesthesia information
        this.hue = 0; // Hue for color animation
    }

    asciiToMatrix(ascii) {
        return ascii.map(row => row.split(''));
    }

    matrixToAscii(matrix) {
        return matrix.map(row => row.join('')).join('\n');
    }

    animate(t) {
        // Override in subclasses for specific animations
        this.hue = (this.hue + t * 10) % 360; // Rotate hue over time
        document.getElementById('ascii-container').style.color = `hsl(${this.hue}, 100%, 50%)`;
        return this.matrixToAscii(this.matrix); // Return static art by default
    }

    getInfo() {
        return this.info; // Return anesthesia information
    }
}
