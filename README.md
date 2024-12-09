# ECS 175 - Final Project

*Instructions:* [https://canvas.ucdavis.edu/courses/912181/assignments/1267411](https://canvas.ucdavis.edu/courses/912181/assignments/1267411)

## Hosting and running the project
The assignment is a simple HTML+JS website with minimal dependencies. To run it we recommend using one of the following methods. You are free to use alternative means to host the site. Before submitting, make sure it works with either of the methods shown here as there could be slight differences in how the web servers handle paths and file loading.

### Using Python
If you have python installed on your system you can use the built-in HTTP Server that ships with it to host the project.

*Windows & Linux*
```bash
cd /path/to/the/project
python -m http.server
```

*macOS*
```bash
cd /path/to/the/project
python3 -m http.server
```

## Using VSCode Plugin
There is a convenient plugin for VSCode that lets you host the current working directory as a website. Download and install the plugin from the VSCode marketplace:
[https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
# ECS175_Final_Project

## Particle Systems

The 'Particles' (or leaves in this case) are managed by a ParticleSystem class, which is responsible for spawning the leaves, and has hardcoded loading for the leaf model and texture values. This was in part due to a formatting issue with the .mtl and .obj files that we were able to get for the leaves, for which the current ObjLoader and MtlLoader were not fully equipped to parse. 

The Grid allows us to know exactly where we are placing the tree models, so these locations are passed into each leaf spawning loop to indicate where to generate leaves. When a new seed is generated, the old asynchornous processes are halted and replaced with new ones (as long as some trees are in the scene). 

The actual leaves are an extension of our shadedObject3D class, but with some extra variables such as velocity and position to keep track of how they are supposed to fall. 
We constantly update the velocity and position with random increments to simulate a more lifelike falling trajectory. 

The Wind and Gravity sliders scale the lateral and vertical velocities, respectively, allowing them to be 'blown' by the wind, as well as fall faster. The WebGLApp and AppState files are updated accordingly. 

## Procedural Generation

