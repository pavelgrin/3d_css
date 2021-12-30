import {
    transform3d,
    multiplyMatrix,
    toCssMatrixView,
    getPerspectiveDistance
} from "./utils/math"

import { Style } from "./consts"

import { MagicCube } from "./MagicCube"

const rootElement = document.querySelector(`.${Style.Root}`)
const screenHeight = rootElement.offsetHeight
rootElement.style.perspective = `${getPerspectiveDistance(45, screenHeight)}px`

const magicCube = new MagicCube()

rootElement.appendChild(magicCube.element)

const initModelMatrix = multiplyMatrix(
    transform3d.translate([200, 200, -100]),
    transform3d.rotate(45, [1, 0, 0]),
)

let rotationAngle = 0

const cb = () => {
    rotationAngle += 1

    const modelMatrix = multiplyMatrix(
        initModelMatrix,
        transform3d.rotate(rotationAngle, [1, -1, 1]),
    )

    magicCube.element.style.transform = `matrix3d(${toCssMatrixView(modelMatrix)})`

    requestAnimationFrame(cb)
}

requestAnimationFrame(cb)
