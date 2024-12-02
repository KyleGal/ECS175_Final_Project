import * as THREE from "./js/lib/glmatrix/three.js"

class ProcGeneration {

    constructor(seed) {
        this.height = 10;
        this.width = 10;
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

    // create map for terrain generation
    // value is a 50x50 matrix
    objectPlacementGeneration() {

        let value = [];   
        for (let y = 0; y < this.height; y++) {
            value[y] = [];
            for (let x = 0; x < this.width; x++) {      
                // skip middle lane
                if (y >= (2/5 * this.height) && y <= (3/5 * this.height)) {
                    value[y][x] = null;
                    continue;
                }
                console.log("SEED FOR GENERATION: ", this.seed);

                // offset coordinates with seed
                let nx = (x * this.seed)/this.width - 0.5;
                let ny = (y * this.seed)/this.height - 0.5; 

                let noise_result = THREE.normalize(this.perlinNoise(nx, ny));
                console.log("NOISE RESULT: ", noise_result);

                // determine model type
                let model_type;
                if (noise_result < 0.6) model_type = 'grass';
                else if (noise_result < 0.85) model_type = 'rock';
                else if (noise_result <= 1.0) model_type = 'tree';
                else console.log("Incorrect noise_result: ", noise_result);

                value[y][x] = model_type;
            }
        }

        return value;
    }
    

    terrainGeneration() {
        let elevation = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {      
                let nx = x/this.width - 0.5, ny = y/this.height - 0.5;
                let e = 1 * noise(1 * nx, 1 * ny) 
                    + 0.5 * noise(2 * nx, 2 * ny)
                    + 0.25 * noise(4 * nx, 4 * ny);
                e = e / (1 + 0.5 + 0.25)
                
                let fudge_factor = 1.2;
                elevation[y][x] = Math.pow(e*fudge_factor, 0.50);
            }
          }
    }

    biome(e) {
        if (e < 0.10) return 'WATER';
        return 'LAND';
    }
}

export default ProcGeneration;