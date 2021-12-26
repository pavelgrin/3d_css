import { Styles } from "./consts"

const CUBE_FACES = ["front", "top", "bottom", "left", "right", "back"]

export class SmallCube {
    constructor(colors) {
        this.colors = colors

        this.cubeElement = document.createElement("div")
        this.cubeElement.classList.add(Styles.Cube)

        this.createCube()
    }

    get element() {
        return this.cubeElement
    }

    createCube() {
        const faceElements = this.generateFaceElements()

        faceElements.forEach((element) => {
            this.cubeElement.appendChild(element)
        })
    }

    generateFaceElements() {
        return CUBE_FACES.map((face) => (
            this.createCubeFace(this.colors[face])
        ))
    }

    createCubeFace = (faceColor = "") => {
        const underlay = document.createElement("div")
        underlay.classList.add(Styles.Underlay)
    
        if (faceColor) {
            const cubeFace = document.createElement("div")
            cubeFace.classList.add(Styles.CubeFace)
    
            cubeFace.style.backgroundColor = faceColor
    
            underlay.appendChild(cubeFace)
        }
    
        return underlay
    }
}
