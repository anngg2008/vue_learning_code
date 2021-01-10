function main() {
    let canvas = document.getElementById("my_canvas") as HTMLCanvasElement;
    let gl = canvas.getContext("webgl");

    let vert_src = document.getElementById("vertex-shader").innerText;
    let frag_src = document.getElementById("fragment-shader").innerText;

    
    const verties = new Float32Array([
        -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
        0.0, 0.5, 0.0, 1.0, 0.0, 1.0,
    ]);
    const BYTES = verties.BYTES_PER_ELEMENT;
    
    let prog = initShaderProgram(gl, vert_src, frag_src);
    gl.useProgram(prog);

    let vbo = initVBO(gl, verties);

    let pos_layout = gl.getAttribLocation(prog, "pos");
    gl.vertexAttribPointer(pos_layout, 3, gl.FLOAT, false, 6 * BYTES, 0 * BYTES);
    gl.enableVertexAttribArray(pos_layout);

    let color_layout = gl.getAttribLocation(prog, "pos");
    gl.vertexAttribPointer(color_layout, 3, gl.FLOAT, false, 6 * BYTES, 3 * BYTES);
    gl.enableVertexAttribArray(color_layout);

    setInterval(() => {
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }, 1000 / 16.67);
}