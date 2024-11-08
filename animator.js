
class BrainAnimator extends ASCIIAnimator {
    animate(t) {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;
        const animatedMatrix = Array(rows).fill().map(() => Array(cols).fill(' '));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this.matrix[i][j] !== ' ') {
                    const x = j - cols / 2;
                    const y = i - rows / 2;
                    const angle = Math.sin(t * 0.1) * 0.2;
                    const newX = Math.round(x * Math.cos(angle) - y * Math.sin(angle) + cols / 2);
                    const newY = Math.round(x * Math.sin(angle) + y * Math.cos(angle) + rows / 2);
                    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
                        animatedMatrix[newY][newX] = this.matrix[i][j];
                    }
                }
            }
        }

        this.animatedArt = this.matrixToAscii(animatedMatrix);
    }
}

class DragonAnimator extends ASCIIAnimator {
    animate(t) {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;
        const animatedMatrix = Array(rows).fill().map(() => Array(cols).fill(' '));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this.matrix[i][j] !== ' ') {
                    const newJ = Math.round(j + Math.sin(i / 2 + t * 0.1) * 2);
                    if (newJ >= 0 && newJ < cols) {
                        animatedMatrix[i][newJ] = this.matrix[i][j];
                    }
                }
            }
        }

        this.animatedArt = this.matrixToAscii(animatedMatrix);
    }
}

class UnicornAnimator extends ASCIIAnimator {
    animate(t) {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;
        const animatedMatrix = Array(rows).fill().map(() => Array(cols).fill(' '));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this.matrix[i][j] !== ' ') {
                    const newI = Math.round(i + Math.sin(t * 0.2) * 1.5);
                    if (newI >= 0 && newI < rows) {
                        animatedMatrix[newI][j] = this.matrix[i][j];
                    }
                }
            }
        }

        this.animatedArt = this.matrixToAscii(animatedMatrix);
    }
}

class PhoenixAnimator extends ASCIIAnimator {
    animate(t) {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;
        const animatedMatrix = Array(rows).fill().map(() => Array(cols).fill(' '));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this.matrix[i][j] !== ' ') {
                    const distFromCenter = Math.sqrt(Math.pow(i - rows / 2, 2) + Math.pow(j - cols / 2, 2));
                    const newI = Math.round(i + Math.sin(distFromCenter * 0.5 - t * 0.1) * 1.5);
                    const newJ = Math.round(j + Math.cos(distFromCenter * 0.5 - t * 0.1) * 1.5);
                    if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols) {
                        animatedMatrix[newI][newJ] = this.matrix[i][j];
                    }
                }
            }
        }

        this.animatedArt = this.matrixToAscii(animatedMatrix);
    }
}

class MermaidAnimator extends ASCIIAnimator {
    animate(t) {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;
        const animatedMatrix = Array(rows).fill().map(() => Array(cols).fill(' '));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this.matrix[i][j] !== ' ') {
                    const newJ = Math.round(j + Math.sin(i / 3 + t * 0.2) * 2);
                    if (newJ >= 0 && newJ < cols) {
                        animatedMatrix[i][newJ] = this.matrix[i][j];
                    }
                }
            }
        }

        this.animatedArt = this.matrixToAscii(animatedMatrix);
    }
}
