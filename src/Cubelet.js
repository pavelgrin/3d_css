import { transform3d, multiplyMatrix, toCssMatrixView } from "./utils/math"
import { Style } from "./consts"

const CUBE_WIDTH = 100
const FACE_OFFSET = CUBE_WIDTH / 2

const CubeFaces = Object.freeze({
    Front: {
        name: "front",
        pos: transform3d.translate([0, 0, FACE_OFFSET]),
    },
    Top: {
        name: "top",
        pos: multiplyMatrix(
            transform3d.rotate(-90, [1, 0, 0]),
            transform3d.translate([0, 0, FACE_OFFSET]),
        ),
    },
    Bottom: {
        name: "bottom",
        pos: multiplyMatrix(
            transform3d.rotate(90, [1, 0, 0]),
            transform3d.translate([0, 0, FACE_OFFSET]),
        ),
    },
    Left: {
        name: "left",
        pos: multiplyMatrix(
            transform3d.rotate(90, [0, 1, 0]),
            transform3d.translate([0, 0, FACE_OFFSET]),
        ),
    },
    Right: {
        name: "right",
        pos: multiplyMatrix(
            transform3d.rotate(-90, [0, 1, 0]),
            transform3d.translate([0, 0, FACE_OFFSET]),
        ),
    },
    Back: {
        name: "back",
        pos: multiplyMatrix(
            transform3d.rotate(180, [0, 1, 0]),
            transform3d.translate([0, 0, FACE_OFFSET]),
        ),
    },
})

export class Cubelet {
    constructor(colors) {
        this.colors = colors

        this.cubeElement = document.createElement("div")
        this.cubeElement.classList.add(Style.Cubelet)

        this.createCube()
    }

    get element() {
        return this.cubeElement
    }

    createCube() {
        const faceElements = this.generateFaceElements()

        faceElements.forEach(({ element, pos }) => {
            element.style.transform = `matrix3d(${toCssMatrixView(pos)})`
            this.cubeElement.appendChild(element)
        })
    }

    generateFaceElements() {
        return Object.keys(CubeFaces).map((face) => ({
            element: this.createCubeFace(this.colors[CubeFaces[face].name]),
            pos: CubeFaces[face].pos,
        }))
    }

    createCubeFace(faceColor = "") {
        const underlay = document.createElement("div")
        underlay.classList.add(Style.Underlay)
    
        if (faceColor) {
            const cubeFace = document.createElement("div")
            cubeFace.classList.add(Style.CubeFace)
    
            cubeFace.style.backgroundColor = faceColor
    
            underlay.appendChild(cubeFace)
        }
    
        return underlay
    }
}
