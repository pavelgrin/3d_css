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

const magicCube1 = new MagicCube()
const magicCube2 = new MagicCube()

rootElement.appendChild(magicCube1.element)
rootElement.appendChild(magicCube2.element)

const radius = 1000

const cb = () => {
    const camX = Math.sin(Date.now() / 1000) * radius;
    const camZ = Math.cos(Date.now() / 1000) * radius;

    const modelMatrix1 = multiplyMatrix(
        transform3d.translate([0, 0, 0]),
        transform3d.rotate(0, [0, 1, 0]),
    )

    const viewMatrix1 = multiplyMatrix(
        transform3d.lookAt([camX, 0, camZ], [0, 0, 0], [0, 1, 0]),
        modelMatrix1,
    )

    magicCube1.element.style.transform = `matrix3d(${toCssMatrixView(viewMatrix1)})`

    //////////////////////////

    const modelMatrix2 = multiplyMatrix(
        transform3d.translate([500, 0, -500]),
        transform3d.rotate(0, [0, 1, 0]),
    )

    const viewMatrix2 = multiplyMatrix(
        transform3d.lookAt([camX, 0, camZ], [0, 0, 0], [0, 1, 0]),
        modelMatrix2,
    )

    magicCube2.element.style.transform = `matrix3d(${toCssMatrixView(viewMatrix2)}`

    requestAnimationFrame(cb)
}

requestAnimationFrame(cb)
