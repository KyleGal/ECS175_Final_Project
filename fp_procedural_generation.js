import * as THREE from "./js/lib/glmatrix/three.js"

class ProcGeneration {

    constructor(seed) {
        this.height = 20;
        this.width = 20;
        this.seed = seed;
        console.log("Initial SEED:", seed);

        // Initialize the permutation table and gradient vectors
        this.perm = [];
        this.grad3 = [
            [1, 1, 0], [ -1, 1, 0], [ 1, -1, 0], [ -1, -1, 0]
        ];
        
        // Generate and duplicate the permutation table
        for (let i = 0; i < 256; i++) {
            this.perm[i] = Math.floor(Math.random() * 256);
        }
        this.perm = this.perm.concat(this.perm);  // Duplicate the permutation array
    }


    // Perlin Noise function
    perlinNoise(x, y) {
        // Grid cell coordinates
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;

        // Relative position within the cell
        x -= Math.floor(x);
        y -= Math.floor(y);

        // Fade curves
        const u = THREE.fade(x);
        const v = THREE.fade(y);

        // Hash coordinates of the square's corners
        const A = this.perm[X] + Y;
        const B = this.perm[X + 1] + Y;

        // Interpolate between corners
        return THREE.lerp(v,
            THREE.lerp(u,
                THREE.grad(this.perm[A], x, y),
                THREE.grad(this.perm[B], x - 1, y)
            ),
            THREE.lerp(u,
                THREE.grad(this.perm[A + 1], x, y - 1),
                THREE.grad(this.perm[B + 1], x - 1, y - 1)
            )
        );
    }

    // place trees, rocks, and grass
    objectPlacementGeneration() {
        let perlin_noise = [], ret_map = [];
        for (let y = 0; y < this.height; y++) {
            perlin_noise[y] = [];
            ret_map[y] = [];
            for (let x = 0; x < this.width; x++) {
                let nx = x / this.width - 0.5, ny = y / this.height - 0.5;
                perlin_noise[y][x] = this.perlinNoise(50*nx, 50*ny);
            }
        }

        let R = 3; // object frequency (smaller means more objects)
        for (let yc = 0; yc < this.height; yc++) {
            for (let xc = 0; xc < this.width; xc++) {
                let max = 0;
            
                for (let dy = -R; dy <= R; dy++) {
                    for (let dx = -R; dx <= R; dx++) {
                        let xn = dx + xc, yn = dy + yc;
                        if (0 <= yn && yn < this.height && 0 <= xn && xn < this.width) {
                            let e = perlin_noise[yn][xn];
                            if (e > max) { max = e; }
                        }
                    }
                }
                ret_map[yc][xc] = [perlin_noise[yc][xc], max];
            }
        }

        return ret_map;

    }

    terrainGeneration() {
        // Numbers we can adjust to get different terrain
        let fudge_factor = 1.2;
        let pow = 2.0; // higher exponent means flatter valleys

        let elevation = [];
        for (let y = 0; y < this.height; y++) {
            elevation[y] = [];
            for (let x = 0; x < this.width; x++) {  
                // let nx = (x*this.seed)/this.width - 0.5, ny = (y*this.seed)/this.height - 0.5; 
                let nx = x/this.width - 0.5 + (this.seed * 0.01), ny = y/this.height - 0.5 + (this.seed * 0.01);
                // fractal terrain for hills/mountains
                let e = 1 * this.perlinNoise(1 * nx, 1 * ny) 
                    + 0.5 * this.perlinNoise(2 * nx, 2 * ny)
                    + 0.25 * this.perlinNoise(4 * nx, 4 * ny);
                e = e / (1 + 0.5 + 0.25);
                // if (e < 0) e = Math.abs(e);

                // raising e to some power results in flat valleys
                elevation[y][x] = Math.pow(e*fudge_factor, pow);
            }
          }
        return elevation;
    }
}

export default ProcGeneration;