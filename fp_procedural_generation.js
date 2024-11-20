class ProcGeneration {

    constructor() {
        // Initialize the permutation table and gradient vectors
        this.perm = [];
        this.grad3 = [
            [1, 1, 0], [ -1, 1, 0], [ 1, -1, 0], [ -1, -1, 0],
            [ 1, 0, 1], [ -1, 0, 1], [ 1, 0, -1], [ -1, 0, -1],
            [ 0, 1, 1], [ 0, -1, 1], [ 0, 1, -1], [ 0, -1, -1]
        ];
        
        // Generate and duplicate the permutation table
        for (let i = 0; i < 256; i++) {
            this.perm[i] = Math.floor(Math.random() * 256);
        }
        this.perm = this.perm.concat(this.perm);  // Duplicate the permutation array
    }

    // Dot product function for 3D vectors
    dot(g, x, y, z) {
        return g[0] * x + g[1] * y + g[2] * z;
    }

    // Fade function to smooth transitions
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    // Lerp (Linear interpolation) function
    lerp(t, a, b) {
        return a + t * (b - a);
    }

    // Grad function returns a smooth gradient vector at the point (x, y, z)
    grad(hash, x, y, z) {
        let h = hash & 15;
        let u = h < 8 ? x : y;
        let v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1 ? -1 : 1) * u + (h & 2 ? -1 : 1) * v);
    }

    // Perlin Noise function
    perlin(x, y, z) {
        let X = Math.floor(x) & 255;
        let Y = Math.floor(y) & 255;
        let Z = Math.floor(z) & 255;
    
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
    
        let u = this.fade(x);
        let v = this.fade(y);
        let w = this.fade(z);
    
        let A = this.perm[X] + Y;
        let AA = this.perm[A] + Z;
        let AB = this.perm[A + 1] + Z;
        let B = this.perm[X + 1] + Y;
        let BA = this.perm[B] + Z;
        let BB = this.perm[B + 1] + Z;
    
        return this.lerp(w,
            this.lerp(v,
                this.lerp(u, this.dot(this.grad(this.perm[AA], x, y, z), x, y, z),
                        this.dot(this.grad(this.perm[BA], x - 1, y, z), x - 1, y, z)),
                this.lerp(u, this.dot(this.grad(this.perm[AB], x, y - 1, z), x, y - 1, z),
                        this.dot(this.grad(this.perm[BB], x - 1, y - 1, z), x - 1, y - 1, z))
            ),
            this.lerp(v,
                this.lerp(u, this.dot(this.grad(this.perm[AA + 1], x, y, z - 1), x, y, z - 1),
                        this.dot(this.grad(this.perm[BA + 1], x - 1, y, z - 1), x - 1, y, z - 1)),
                this.lerp(u, this.dot(this.grad(this.perm[AB + 1], x, y - 1, z - 1), x, y - 1, z - 1),
                        this.dot(this.grad(this.perm[BB + 1], x - 1, y - 1, z - 1), x - 1, y - 1, z - 1))
            )
        );
    }
}

export default ProcGeneration;