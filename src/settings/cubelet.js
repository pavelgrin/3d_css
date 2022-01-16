import { Matrix, Transform3d } from "../utils/math"
import { toCssMatrixView } from "../utils/render"
import { CUBE_WIDTH, CubeFace } from "../consts"

const FACE_OFFSET = CUBE_WIDTH / 2

const getFacePosition = (angle, vec) => {
    const posMatrix = Matrix.multiply(
        Transform3d.rotate(angle, vec),
        Transform3d.translate([0, 0, FACE_OFFSET])
    )

    return toCssMatrixView(posMatrix)
}

export const CubeletSettings = Object.freeze([
    {
        name: CubeFace.Front,
        pos: getFacePosition(0, [1, 0, 0]),
    },
    {
        name: CubeFace.Top,
        pos: getFacePosition(-90, [1, 0, 0]),
    },
    {
        name: CubeFace.Bottom,
        pos: getFacePosition(90, [1, 0, 0]),
    },
    {
        name: CubeFace.Left,
        pos: getFacePosition(-90, [0, 1, 0]),
    },
    {
        name: CubeFace.Right,
        pos: getFacePosition(90, [0, 1, 0]),
    },
    {
        name: CubeFace.Back,
        pos: getFacePosition(180, [0, 1, 0]),
    },
])
