class mat4 {
    _data: Array<GLfloat>

    constructor(data?: Array<GLfloat>) {
        if (null !== data) {

            if (16 !== data.length) {
                throw "Data length is not 16";
            }

            this._data = data;
        } else {
            this._data = new Array<GLfloat>(16);
        }
    }

    static identity(): mat4 {
        return new mat4([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
    }

    row(index: number): Array<GLfloat> {
        if(0 <= index && index < 4) {
            let ret_data = this._data.filter((_, i) => {
                return (i >= 4 * index) && (i < 4 * (index + 1));
            });

            return ret_data;
        }

        return null;
    }

    col(index: number): Array<GLfloat> {
        if(0 <= index && index < 4) {
            let ret_data = this._data.filter((_, i) => {
                return i % 4 == index;
            });

            return ret_data;
        }

        return null;
    }

    addNumber(rhs: GLfloat): mat4 {
        let ret_data = this._data.map(v => { return v + rhs; });

        return new mat4(ret_data);
    }

    addMat4(rhs: mat4): mat4 {
        let ret_data = new Array<GLfloat>();

        Array.from({ length: 16 }, (_, k) => { return k; }).forEach(index => {
            ret_data.push(this._data[index] + rhs._data[index]);
        })

        return new mat4(ret_data);
    }

    dotMat4(rhs: mat4): mat4 {
        let ret_data = new Array<GLfloat>();

        Array.from({ length: 4 }, (_, k) => { return k; }).forEach(r => {
            Array.from({ length: 4 }, (_, k) => { return k; }).forEach(c => {
                let sum = Array.from({ length: 4 }, (_, k) => { return k; }).map(i => {
                    return this.row(r)[i] * rhs.col(c)[i];
                }).reduce((total, v) => { return total + v; }, 0);

                ret_data.push(sum);
            });
        });

        return new mat4(ret_data);
    }

    dotNumber(rhs: GLfloat): mat4 {
        let ret_data = this._data.map(v => { return v * rhs; });

        return new mat4(ret_data);
    }

    toFloat32Array(): Float32Array {
        return new Float32Array(this._data);
    }
}