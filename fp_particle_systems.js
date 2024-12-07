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
        const leafFilePath = './models/leaf/leaf.obj'; // Update the path as needed
        const loader = new OBJLoader(leafFilePath);
        //console.log("Parsing a leaf", loader.load(gl))
        const [vertexData, indices, material] = loader.load(gl);
        // Store the loaded data in the system
        this.indices = indices;
        this.vertexData = vertexData;

        let kA = [0.5882, 0.5882, 0.5882]
        let kD = [0.5882, 0.5882, 0.5882]
        let kS = [0.0000, 0.0000, 0.0000]
        let shininess = 10.0
        //let map_kD = new Texture(`models/leaf/high_res_leaf_texture_by_hhh316.jpg`, gl)

        this.leafMaterial = new Material(kA, kD, kS, shininess, map_kD)

        //console.log("material from particlesystem constructor", this.leafMaterial)
        // console.log('u_material.kA', this.leafMaterial.kA)
        // console.log('u_material.kD', this.leafMaterial.kD);
        // console.log('u_material.kS', this.leafMaterial.kS);
        // console.log('u_material.shininess', this.leafMaterial.shininess);
    }

    spawnLeaf(position, velocity, lifespan) {
        //console.log("spawnleaf called", this.leafMaterial)
        if (!(this.leafMaterial)) {
            throw 'Material not loaded! or Material wrong';
        }
        if (!(this.leafMaterial instanceof Material)) {
            throw 'Leaf model wront type'
        }
        //console.log("Spawning leaf at: ", position, "with veolicty: ", velocity)
        //console.log("spawning leaf, here is the material", this.leafMaterial)
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

    // update(deltaTime) {
    //     // Update all particles
    //     for (let particle of this.particles) {
    //         particle.update(deltaTime);
    //     }
    // }

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

    // Ns 10.0000
	// Ni 1.5000
	// d 1.0000
	// Tr 0.0000
	// Tf 1.0000 1.0000 1.0000 
	// illum 2
	// Ka 0.5882 0.5882 0.5882
	// Kd 0.5882 0.5882 0.5882
	// Ks 0.0000 0.0000 0.0000
	// Ke 0.0000 0.0000 0.0000
	// map_Ka E:\MAX CRATING\laef tuccher\high_res_leaf_texture_by_hhh316.jpg
	// map_Kd E:\MAX CRATING\laef tuccher\high_res_leaf_texture_by_hhh316.jpg

    // * @param {Array<Number>} kA Ambient color of the material
    //  * @param {Array<Number>} kD Diffuse color of the material
    //  * @param {Array<Number>} kS Specular color of the material
    //  * @param {Number} shininess Shininess of the specular color
    //  * @param {Texture} map_kD Optional image texture for this material
    //  * @param {Texture} map_nS Optional roughness texture for this material
    //  * @param {Texture} map_norm Optional normal texture for this material
