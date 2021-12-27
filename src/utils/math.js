const RADIANS_PER_DEGREE = Math.PI / 180

export const toRadians = (deg) => {
    return RADIANS_PER_DEGREE * deg
}

export const normalizeVector = (vec) => {
    const vecLength = Math.sqrt(vec.reduce((sum, comp) => sum + comp ** 2, 0))
    return vec.map((comp) => comp / vecLength)
}

export const transposeMatrix = (matrix) => {
    const transposedMatrix = []

    const rowLength = matrix.length
    const colLength = matrix[0].length
    const length = Math.max(rowLength, colLength)

    for (let row = 0; row < length; ++row) {
        for (let col = row; col < length; ++col) {
            if (!transposedMatrix[row]) {
                transposedMatrix[row] = []
            }

            if (!transposedMatrix[col]) {
                transposedMatrix[col] = []
            }

            if (matrix[col]) {
                transposedMatrix[row][col] = matrix[col][row]
            }

            if (matrix[row]) {
                transposedMatrix[col][row] = matrix[row][col]
            }
        }
    }

    return transposedMatrix
}

export const multiplyMatrix = (m1, m2) => {
    return m1.map((row, i) => (
        m2[0].map((_, j) => (
            row.reduce((acc, _, n) => (
                acc + m1[i][n] * m2[n][j]
            ), 0)
        ))
    ))
}

export const toCssMatrixView = (matrix) => {
    return transposeMatrix(matrix).join(',')
}

export const transform3d = Object.freeze({
    get identityMatrix() {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
    },

    translate([x, y, z]) {
        return [
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1],
        ]
    },

    scale([x, y, z]) {
        return [
            [x, 0, 0, 0],
            [0, y, 0, 0],
            [0, 0, z, 0],
            [0, 0, 0, 1],
        ]
    },

    rotate(deg, vec) {
        const rad = toRadians(deg)

        const s = Math.sin(rad)
        const c = Math.cos(rad)

        const [x, y, z] = normalizeVector(vec)

        return [
            [   c+(1-c)*x*x, -s*z+(1-c)*x*y,  s*y+(1-c)*x*z, 0],
            [ s*z+(1-c)*x*y,    c+(1-c)*y*y, -s*x+(1-c)*y*z, 0],
            [-s*y+(1-c)*x*z,  s*x+(1-c)*y*z,    c+(1-c)*z*z, 0],
            [             0,              0,              0, 1],
        ]
    },

    rotateX(deg) {
        const rad = toRadians(deg)

        const s = Math.sin(rad)
        const c = Math.cos(rad)

        return [
            [1, 0, 0, 0],
            [0, c,-s, 0],
            [0, s, c, 0],
            [0, 0, 0, 1],
        ]
    },

    rotateY(deg) {
        const rad = toRadians(deg)

        const s = Math.sin(rad)
        const c = Math.cos(rad)

        return [
            [c, 0,-s, 0],
            [0, 1, 0, 0],
            [s, 0, c, 0],
            [0, 0, 0, 1],
        ]
    },

    rotateZ(deg) {
        const rad = toRadians(deg)

        const s = Math.sin(rad)
        const c = Math.cos(rad)

        return [
            [c,-s, 0, 0],
            [s, c, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
    },
})
