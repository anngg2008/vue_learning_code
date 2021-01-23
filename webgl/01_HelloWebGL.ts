let angleX = 0.0;
let angleY = 0.0;
let angleZ = 0.0;
let PER_ANGLE = Math.PI / 180.0;

function main() {
    let canvas = document.getElementById("my_canvas") as HTMLCanvasElement;
    let gl = canvas.getContext("webgl");

    let vert_src = document.getElementById("vertex-shader").innerText;
    let frag_src = document.getElementById("fragment-shader").innerText;

    const verties = new Float32Array([
        -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
        0.0, 0.5, 0.0, 0.0, 0.0, 1.0,
    ]);
    const BYTES = verties.BYTES_PER_ELEMENT;
    
    let prog = initShaderProgram(gl, vert_src, frag_src);
    gl.useProgram(prog);

    let vbo = initVBO(gl, verties);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    let pos_layout = gl.getAttribLocation(prog, "pos");
    gl.vertexAttribPointer(pos_layout, 3, gl.FLOAT, false, 6 * BYTES, 0 * BYTES);
    gl.enableVertexAttribArray(pos_layout);

    let color_layout = gl.getAttribLocation(prog, "color");
    gl.vertexAttribPointer(color_layout, 3, gl.FLOAT, false, 6 * BYTES, 3 * BYTES);
    gl.enableVertexAttribArray(color_layout);

    let mvp = gl.getUniformLocation(prog, "mvp");
    let mvp_mat = mat4.identity();
    
    angleY += PER_ANGLE * 10;

    setInterval(() => {
        // 2nd openGL is column first.
        mvp_mat = mat4.rotate(angleX, angleY, angleZ).dot(mvp_mat);
        gl.uniformMatrix4fv(mvp, false, mvp_mat.toFloat32Array());
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }, 1000 / 16.67);
}