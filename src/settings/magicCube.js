import { transform3d, multiplyMatrix, toCssMatrixView } from "../utils/math"
import {
    CUBE_WIDTH,
    MAGIC_CUBE_WIDTH,
    CubeFace,
    ColorMapping,
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
        colors: { [CubeFace.Front]: ColorMapping[CubeFace.Front] },
        pos: getPiecePos([0, 0, CUBE_WIDTH]),
    },
    {
        colors: { [CubeFace.Top]: ColorMapping[CubeFace.Top] },
        pos: getPiecePos([0, CUBE_WIDTH, 0]),
    },
    {
        colors: { [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom] }, 
        pos: getPiecePos([0, -CUBE_WIDTH, 0]),
    },
    {
        colors: { [CubeFace.Left]: ColorMapping[CubeFace.Left] },
        pos: getPiecePos([CUBE_WIDTH, 0, 0]),
    },
    {
        colors: { [CubeFace.Right]: ColorMapping[CubeFace.Right] }, 
        pos: getPiecePos([-CUBE_WIDTH, 0, 0]),
    },
    {
        colors: { [CubeFace.Back]: ColorMapping[CubeFace.Back] }, 
        pos: getPiecePos([0, 0, -CUBE_WIDTH]),
    },
]

const edgePieces = [
    {
        colors: {
            [CubeFace.Front]: ColorMapping[CubeFace.Front],
            [CubeFace.Top]: ColorMapping[CubeFace.Top],
        }, 
        pos: getPiecePos([0, CUBE_WIDTH, CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Front]: ColorMapping[CubeFace.Front],
            [CubeFace.Right]: ColorMapping[CubeFace.Right],
        }, 
        pos: getPiecePos([-CUBE_WIDTH, 0, CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Front]: ColorMapping[CubeFace.Front],
            [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom],
        }, 
        pos: getPiecePos([0, -CUBE_WIDTH, CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Front]: ColorMapping[CubeFace.Front],
            [CubeFace.Left]: ColorMapping[CubeFace.Left],
        }, 
        pos: getPiecePos([CUBE_WIDTH, 0, CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Back]: ColorMapping[CubeFace.Back],
            [CubeFace.Top]: ColorMapping[CubeFace.Top],
        }, 
        pos: getPiecePos([0, CUBE_WIDTH, -CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Back]: ColorMapping[CubeFace.Back],
            [CubeFace.Right]: ColorMapping[CubeFace.Right],
        }, 
        pos: getPiecePos([-CUBE_WIDTH, 0, -CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Back]: ColorMapping[CubeFace.Back],
            [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom],
        }, 
        pos: getPiecePos([0, -CUBE_WIDTH, -CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Back]: ColorMapping[CubeFace.Back],
            [CubeFace.Left]: ColorMapping[CubeFace.Left],
        }, 
        pos: getPiecePos([CUBE_WIDTH, 0, -CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Top]: ColorMapping[CubeFace.Top],
            [CubeFace.Right]: ColorMapping[CubeFace.Right],
        }, 
        pos: getPiecePos([-CUBE_WIDTH, CUBE_WIDTH, 0]),
    },
    {
        colors: {
            [CubeFace.Top]: ColorMapping[CubeFace.Top],
            [CubeFace.Left]: ColorMapping[CubeFace.Left],
        }, 
        pos: getPiecePos([CUBE_WIDTH, CUBE_WIDTH, 0]),
    },
    {
        colors: {
            [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom],
            [CubeFace.Right]: ColorMapping[CubeFace.Right],
        }, 
        pos: getPiecePos([-CUBE_WIDTH, -CUBE_WIDTH, 0]),
    },
    {
        colors: {
            [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom],
            [CubeFace.Left]: ColorMapping[CubeFace.Left],
        }, 
        pos: getPiecePos([CUBE_WIDTH, -CUBE_WIDTH, 0]),
    },
]

const cornerPieces = [
    {
        colors: {
            [CubeFace.Front]: ColorMapping[CubeFace.Front],
            [CubeFace.Top]: ColorMapping[CubeFace.Top],
            [CubeFace.Left]: ColorMapping[CubeFace.Left],
        }, 
        pos: getPiecePos([CUBE_WIDTH, CUBE_WIDTH, CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Front]: ColorMapping[CubeFace.Front],
            [CubeFace.Top]: ColorMapping[CubeFace.Top],
            [CubeFace.Right]: ColorMapping[CubeFace.Right],
        }, 
        pos: getPiecePos([-CUBE_WIDTH, CUBE_WIDTH, CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Front]: ColorMapping[CubeFace.Front],
            [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom],
            [CubeFace.Left]: ColorMapping[CubeFace.Left],
        }, 
        pos: getPiecePos([CUBE_WIDTH, -CUBE_WIDTH, CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Front]: ColorMapping[CubeFace.Front],
            [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom],
            [CubeFace.Right]: ColorMapping[CubeFace.Right],
        }, 
        pos: getPiecePos([-CUBE_WIDTH, -CUBE_WIDTH, CUBE_WIDTH]),
    },

    {
        colors: {
            [CubeFace.Back]: ColorMapping[CubeFace.Back],
            [CubeFace.Top]: ColorMapping[CubeFace.Top],
            [CubeFace.Left]: ColorMapping[CubeFace.Left],
        }, 
        pos: getPiecePos([CUBE_WIDTH, CUBE_WIDTH, -CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Back]: ColorMapping[CubeFace.Back],
            [CubeFace.Top]: ColorMapping[CubeFace.Top],
            [CubeFace.Right]: ColorMapping[CubeFace.Right],
        }, 
        pos: getPiecePos([-CUBE_WIDTH, CUBE_WIDTH, -CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Back]: ColorMapping[CubeFace.Back],
            [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom],
            [CubeFace.Left]: ColorMapping[CubeFace.Left],
        }, 
        pos: getPiecePos([CUBE_WIDTH, -CUBE_WIDTH, -CUBE_WIDTH]),
    },
    {
        colors: {
            [CubeFace.Back]: ColorMapping[CubeFace.Back],
            [CubeFace.Bottom]: ColorMapping[CubeFace.Bottom],
            [CubeFace.Right]: ColorMapping[CubeFace.Right],
        }, 
        pos: getPiecePos([-CUBE_WIDTH, -CUBE_WIDTH, -CUBE_WIDTH]),
    },
]

export const MagicCubeSettings = Object.freeze([
    ...centerPieces,
    ...cornerPieces,
    ...edgePieces,
])
