import { LeafParticle } from "./assignment3.object3d.js";
import { OBJLoader } from "./assignment3.objloader.js";
import Material from "./js/app/material.js";
import Texture from './assignment3.texture.js'

class ParticleSystem {
    constructor(gl, shader) {
        // Prepare to store the leaf model and texture
        this.gl = gl;
        this.shader = shader;
        this.leafMaterial = null;
        this.particles = [];
        this.vertexData;
        this.indices;
        
        // Hardcode the loading of the leaf model and texture
        this.loadLeafModel(gl);
    }

    loadLeafModel(gl) {
        // Load the leaf OBJ file using the OBJLoader
        const leafFilePath = './models/leaf/leaf.obj';
        const loader = new OBJLoader(leafFilePath);
        const [vertexData, indices, material] = loader.load(gl); //For vertex and index data
        this.indices = indices;
        this.vertexData = vertexData;

        let kA = [0.5882, 0.5882, 0.5882] //mtl properties from .mtl file
        let kD = [0.5882, 0.5882, 0.5882]
        let kS = [0.0000, 0.0000, 0.0000]
        let shininess = 10.0

        this.leafMaterial = new Material(kA, kD, kS, shininess)
    }

    spawnLeaf(position, velocity, lifespan) {
        if (!(this.leafMaterial)) {
            throw 'Material not loaded! or Material wrong';
        }
        if (!(this.leafMaterial instanceof Material)) {
            throw 'Leaf model wront type'
        }
        const leafParticle = new LeafParticle(
            this.gl,
            this.shader,
            this.vertexData,
            this.indices,
            this.gl.TRIANGLES,
            this.leafMaterial,
            position,
            velocity,
            lifespan
        );
        this.particles.push(leafParticle);
    }


    render(gl) {
        // Render all particles
        for (let i = 0; i < this.particles.length; i ++) {
            if (this.particles[i].shouldRemove) {
                this.particles.splice(i, 1)
            }
        }
        for (let particle of this.particles) {
            particle.render(gl);
        }
    }
}
export default ParticleSystem;
