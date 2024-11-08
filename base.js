class ASCIIAnimator {
    constructor(asciiArt, info) {
        this.originalArt = asciiArt.trim().split('\n');
        this.matrix = this.asciiToMatrix(this.originalArt);
        this.animatedArt = this.originalArt;
        this.info = info;
    }

    asciiToMatrix(ascii) {
        return ascii.map(row => row.split(''));
    }

    matrixToAscii(matrix) {
        return matrix.map(row => row.join('')).join('\n');
    }

    animate(t) {
        // This method should be overridden by each creature's specific animation
    }

    render(container) {
        container.innerHTML = `<pre>${this.animatedArt}</pre>`;
    }

    getInfo() {
        return this.info;
    }
}
