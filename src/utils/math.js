const RADIANS_PER_DEGREE = Math.PI / 180

export const toRadians = (deg) => {
    return RADIANS_PER_DEGREE * deg
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
        return []
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
