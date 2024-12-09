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

(Calvin Yee)
The 'Particles' (or leaves in this case) are managed by a ParticleSystem class, which is responsible for spawning the leaves, and has hardcoded loading for the leaf model and texture values. This was in part due to a formatting issue with the .mtl and .obj files that we were able to get for the leaves, for which the current ObjLoader and MtlLoader were not fully equipped to parse. 

The Grid allows us to know exactly where we are placing the tree models, so these locations are passed into each leaf spawning loop to indicate where to generate leaves. When a new seed is generated, the old asynchornous processes are halted and replaced with new ones (as long as some trees are in the scene). 

The actual leaves are an extension of our shadedObject3D class, but with some extra variables such as velocity and position to keep track of how they are supposed to fall. 
We constantly update the velocity and position with random increments to simulate a more lifelike falling trajectory. 

The Wind and Gravity sliders scale the lateral and vertical velocities, respectively, allowing them to be 'blown' by the wind, as well as fall faster. The WebGLApp and AppState files are updated accordingly. 

## Procedural Generation

(Kyle Galvez)
Procedural generation is managed by the ProcGeneration class, which is responsible for object placement map and height map generation onto a 20x20 grid. The object placement and height map are applied to the platform model.

The height map is generated using a Perlin noise function. Noise is added at different frequencies, which results in a mix of low frequency hills and small high frequency hills to make our terrain more realistic.

Object placement is determined through a combination of the Perlin noise function and a fractal algorithm. Within a neighborhood size determined by some constant R, an object is placed at the highest noise value. A high R results in very sparse object placement, while a small R results in dense object placement. A tree, rock, or grass model is chosen at random to be placed at this max noise value.

Users are able to change the seed to generate a new height map and object placement map.

## Shadow Mapping

(Yunfei Kwan)
(https://github.com/RinKwan/Final)

Shadow mapping uses two shaders to render the scene from the perspective of the light source, and records the depth value of each pixel to generate a depth map. In the final rendering, each pixel is checked from the camera's perspective to see if it is illuminated. By comparing the depth value of the pixel with the value in the depth map, it can be determined whether the pixel is in the shadow.

However, when shadow mapping a moving object in dog-bike, there was an unsolvable problem. The difficult part is to write the code into the framework according to homework 3. Our framework is not easy to expand the shadow function because shadows require two shaders. Our framework has only one shader. Adding another shader was difficult to integrate, and I was not able to complete it on time. There is another very difficult problem: shadow mapping must be compatible with the other JS programs. I added the shadow function to the shader, and finally merged them together, and the shader part conflicted. And I found that I could not complete the function by adding shadow mapping. js alone. I tried to rewrite the app files but could not display the lighting. As a result, I could see different colors but the picture was pitch black. Therefore, I did not integrate the code together but put it separately in the Github link above.
