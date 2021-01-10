function initShaderProgram(gl: WebGL2RenderingContext | WebGLRenderingContext, vert_src: string, frag_src: string)
    : WebGLProgram {
    let vShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vShader, vert_src);
    gl.compileShader(vShader);
    if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
        let info = gl.getShaderInfoLog(vShader);
        throw "Could not compile WebGL program. \n\n" + info;
    }

    let fShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShader, frag_src);
    gl.compileShader(fShader);
    if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
        let info = gl.getShaderInfoLog(fShader);
        throw "Could not compile WebGL program. \n\n" + info;
    }

    let prog = gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        let info = gl.getProgramInfoLog(prog);
        throw "Could not compile WebGL program. \n\n" + info;
    }

    gl.deleteShader(vShader);
    gl.deleteShader(fShader);

    return prog;
}

function initVBO(gl: WebGL2RenderingContext | WebGLRenderingContext, data: Float32Array): WebGLBuffer {
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
}