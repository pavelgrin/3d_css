import { transform3d, multiplyMatrix, toCssMatrixView } from "../utils/math"
import {
    CUBE_WIDTH,
    MAGIC_CUBE_WIDTH,
    FaceColor,
    CubeFace,
} from "../consts"

const INIT_CUBELET_OFFSET = MAGIC_CUBE_WIDTH / 2 - CUBE_WIDTH / 2

const initOffsetMatrix = transform3d.translate([INIT_CUBELET_OFFSET, INIT_CUBELET_OFFSET, 0])

const getPiecePos = (vec) => {
    const posMatrix = (multiplyMatrix(
        initOffsetMatrix,
        transform3d.translate(vec),
    ))

    return toCssMatrixView(posMatrix)
}

const centerPieces = [
    {
        colors: { [CubeFace.Front]: FaceColor.Green },
        pos: getPiecePos([0, 0, CUBE_WIDTH]),
    },
    {
        colors: { [CubeFace.Top]: FaceColor.White },
        pos: getPiecePos([0, CUBE_WIDTH, 0]),
    },
    {
        colors: { [CubeFace.Bottom]: FaceColor.Red }, 
        pos: getPiecePos([0, -CUBE_WIDTH, 0]),
    },
    {
        colors: { [CubeFace.Left]: FaceColor.Yellow },
        pos: getPiecePos([CUBE_WIDTH, 0, 0]),
    },
    {
        colors: { [CubeFace.Right]: FaceColor.Blue }, 
        pos: getPiecePos([-CUBE_WIDTH, 0, 0]),
    },
    {
        colors: { [CubeFace.Back]: FaceColor.Orange }, 
        pos: getPiecePos([0, 0, -CUBE_WIDTH]),
    },
]

const edgePieces = []

const cornerPieces = []

export const MagicCubeSettings = Object.freeze([
    ...centerPieces,
    ...cornerPieces,
    ...edgePieces,
])
