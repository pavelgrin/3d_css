const RADIANS_PER_DEGREE = Math.PI / 180

export const toRadians = (deg) => {
    return RADIANS_PER_DEGREE * deg
}

export const normalizeVector = (vec) => {
    const vecLength = Math.sqrt(vec.reduce((sum, comp) => sum + comp ** 2, 0))
    return vec.map((comp) => comp / vecLength)
}

export const toCssMatrixView = (matrix) => {
    const cssMatrix = []

    for (let i = 0; i < matrix.length; ++i) {
        const row = matrix[i]
        
        for (let j = 0; j < row.length; ++j) {
            const item = row[j]
            
            if (!cssMatrix[j]) {
                cssMatrix[j] = []
            }

            cssMatrix[j].push(item)
        }
    }

    return cssMatrix.join(',')
}

export const transform3d = Object.freeze({
    translate(vec) {
        return []
    },

    scale(vec) {
        return []
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
