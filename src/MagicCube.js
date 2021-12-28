// import { transform3d, multiplyMatrix, toCssMatrixView } from "./utils/math"
import { Style, FaceColor, CubeFace } from "./consts"
import { MagicCubeSettings } from "./settings/magicCube"

import { Cubelet } from "./Cubelet"

export class MagicCube {
    constructor() {
        this.magicCubeEl = document.createElement("div")
        this.magicCubeEl.classList.add(Style.MagicCube)

        this.createMagicCube()
    }

    get element() {
        return this.magicCubeEl
    }

    createMagicCube() {
        const cubeletElements = this.generateCubeletElements()

        cubeletElements.forEach(({ element, pos }) => {
            element.style.transform = `matrix3d(${pos})`
            this.magicCubeEl.appendChild(element)
        })
    }

    generateCubeletElements() {
        return MagicCubeSettings.map((cube) => ({
            element: (new Cubelet(cube.colors)).element,
            pos: cube.pos,
        }))
    }
}
