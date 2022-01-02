const RADIANS_PER_DEGREE = Math.PI / 180

export const toRadians = (deg) => {
    return RADIANS_PER_DEGREE * deg
}

export const getPerspectiveDistance = (fovDeg, screenHeight) => {
    const fovRad = toRadians(fovDeg)
    const viewerToScreenDistance = screenHeight / 2 / Math.tan(fovRad / 2)

    return viewerToScreenDistance
}

export class Vector {
    static normalize(vec) {
        const vecLength = Math.sqrt(vec.reduce((sum, comp) => sum + comp ** 2, 0))
        return vec.map((comp) => comp / vecLength)
    }

    static add(vec1, vec2) {
        const resVec = vec1.length >= vec2.length ? vec1 : vec2
        return resVec.map((comp, idx) => comp + (vec2[idx] || 0))
    }

    static subtract(vec1, vec2) {
        return this.add(vec1, this.invert(vec2))
    }

    static dot(vec, scalar) {
        return vec.map((comp) => comp * scalar)
    }

    static cross([x1, y1, z1], [x2, y2, z2]) {
        return [y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2]
    }

    static invert(vec) {
        return this.dot(vec, -1)
    }
}

export class Matrix {
    static transpose(matrix) {
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

    static multiply(m1, m2) {
        return m1.map((row, i) => (
            m2[0].map((_, j) => (
                row.reduce((acc, _, n) => (
                    acc + m1[i][n] * m2[n][j]
                ), 0)
            ))
        )) 
    }
}

export class Transform3d {
    static get identityMatrix() {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
    }

    static lookAt(cameraPos, vecTarget, vecUp) {
        const cameraDirection = Vector.normalize(Vector.subtract(cameraPos, vecTarget))
        const rightCameraVec = Vector.normalize(Vector.cross(vecUp, cameraDirection))
        const upCameraVec = Vector.normalize(Vector.cross(cameraDirection, rightCameraVec))

        const [Rx, Ry, Rz] = rightCameraVec
        const [Ux, Uy, Uz] = upCameraVec
        const [Dx, Dy, Dz] = cameraDirection

        const [Px, Py, Pz] = cameraPos

        return Matrix.multiply(
            [
                [Rx, Ry, Rz, 0],
                [Ux, Uy, Uz, 0],
                [Dx, Dy, Dz, 0],
                [ 0,  0,  0, 1],
            ],
            [
                [1, 0, 0, -Px],
                [0, 1, 0, -Py],
                [0, 0, 1, -Pz],
                [0, 0, 0,   1],
            ]
        )
    }

    static perspective(fovDeg, screenHeight) {
        const d = getPerspectiveDistance(fovDeg, screenHeight)

        return [
            [1, 0,    0, 0],
            [0, 1,    0, 0],
            [0, 0,    1, 0],
            [0, 0, -1/d, 1],
        ]
    }

    static translate([x, y, z]) {
        return [
            [1, 0, 0,  x],
            [0, 1, 0, -y],
            [0, 0, 1,  z],
            [0, 0, 0,  1],
        ]
    }

    static scale([x, y, z]) {
        return [
            [x, 0, 0, 0],
            [0, y, 0, 0],
            [0, 0, z, 0],
            [0, 0, 0, 1],
        ]
    }

    static rotate(deg, vec) {
        const rad = toRadians(deg)

        const s = Math.sin(rad)
        const c = Math.cos(rad)

        const [x, invY, z] = Vector.normalize(vec)
        const y = -invY

        return [
            [   c+(1-c)*x*x, -s*z+(1-c)*x*y,  s*y+(1-c)*x*z, 0],
            [ s*z+(1-c)*x*y,    c+(1-c)*y*y, -s*x+(1-c)*y*z, 0],
            [-s*y+(1-c)*x*z,  s*x+(1-c)*y*z,    c+(1-c)*z*z, 0],
            [             0,              0,              0, 1],
        ]
    }

    static rotateX(deg) {
        const rad = toRadians(deg)

        const s = Math.sin(rad)
        const c = Math.cos(rad)

        return [
            [1, 0, 0, 0],
            [0, c,-s, 0],
            [0, s, c, 0],
            [0, 0, 0, 1],
        ]
    }

    static rotateY(deg) {
        const rad = toRadians(deg)

        const s = Math.sin(rad)
        const c = Math.cos(rad)

        return [
            [c, 0,-s, 0],
            [0, 1, 0, 0],
            [s, 0, c, 0],
            [0, 0, 0, 1],
        ]
    }

    static rotateZ(deg) {
        const rad = toRadians(deg)

        const s = Math.sin(rad)
        const c = Math.cos(rad)

        return [
            [c,-s, 0, 0],
            [s, c, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
    }
}
