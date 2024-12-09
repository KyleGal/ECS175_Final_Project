class ShadowMap
{
    constructor ( gl )
    {
        const depthProgram = createProgram(gl, depthVertexShader, depthFragmentShader);

        // Create light pov
        const inverseLightDirection = new DOMPoint(-0.5, 2, -2);
        const lightPovProjection = createOrtho(-1,1,-1,1,0,4);
        const lightPovView = createLookAt(inverseLightDirection, origin);
        const lightPovMvp = lightPovProjection.multiply(lightPovView);

        const lightPovMvpDepthLocation = gl.getUniformLocation(depthProgram, 'lightPovMvp');
        gl.useProgram(depthProgram);
        gl.uniformMatrix4fv(lightPovMvpDepthLocation, false, lightPovMvp.toFloat32Array());
    }
}
