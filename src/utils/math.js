const RADIANS_PER_DEGREE = Math.PI / 180

export const toRadians = (deg) => {
    return RADIANS_PER_DEGREE * deg
}

export const normalizeVector = (vec) => {
    const vecLength = Math.sqrt(vec.reduce((sum, comp) => sum + comp ** 2, 0))
    return vec.map((comp) => comp / vecLength)
}

export const sumVector = (vec1, vec2) => {
    const resVec = vec1.length >= vec2.length ? vec1 : vec2
    return resVec.map((comp, idx) => comp + (vec2[idx] || 0))
}

export const crossVector = ([x1, y1, z1], [x2, y2, z2]) => {
    return [y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2]
}

export const multiplyVectorByScalar = (vec, value) => {
    return vec.map((comp) => comp * value)
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

export const getPerspectiveDistance = (fovDeg, screenHeight) => {
    const fovRad = toRadians(fovDeg)
    const viewerToScreenDistance = screenHeight / 2 / Math.tan(fovRad / 2)

    return viewerToScreenDistance
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

    lookAt(cameraPos, vecTarget, vecUp) {
        const invVecTarget = multiplyVectorByScalar(vecTarget, -1)

        const cameraDirection = normalizeVector(sumVector(cameraPos, invVecTarget))
        const rightCameraVec = normalizeVector(crossVector(vecUp, cameraDirection))
        const upCameraVec = normalizeVector(crossVector(cameraDirection, rightCameraVec))

        const [Rx, Ry, Rz] = rightCameraVec
        const [Ux, Uy, Uz] = upCameraVec
        const [Dx, Dy, Dz] = cameraDirection

        const [Px, Py, Pz] = cameraPos

        return multiplyMatrix(
            [
                [Rx, Ry, Rz, 0],
                [Ux, Uy, Uz, 0],
                [Dx, Dy, Dz, 0],
                [ 0,  0,  0, 1],
            ],
            [
                [1, 0, 0, -Px],
                [0, 1, 0,  Py],
                [0, 0, 1, -Pz],
                [0, 0, 0,   1],
            ]
        )
    },

    perspective(fovDeg, screenHeight) {
        const d = getPerspectiveDistance(fovDeg, screenHeight)

        return [
            [1, 0,    0, 0],
            [0, 1,    0, 0],
            [0, 0,    1, 0],
            [0, 0, -1/d, 1],
        ]
    },

    translate([x, y, z]) {
        return [
            [1, 0, 0,  x],
            [0, 1, 0, -y],
            [0, 0, 1,  z],
            [0, 0, 0,  1],
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

        const [x, invY, z] = normalizeVector(vec)
        const y = -invY

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
