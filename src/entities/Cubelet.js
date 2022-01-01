import { Style } from "../consts"
import { CubeletSettings } from "../settings/cubelet"

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
            element.style.transform = `matrix3d(${pos})`
            this.cubeElement.appendChild(element)
        })
    }

    generateFaceElements() {
        return CubeletSettings.map(({ name, pos }) => ({
            element: this.createCubeFace(this.colors[name]),
            pos,
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
