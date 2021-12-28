import { transform3d, multiplyMatrix, toCssMatrixView } from "./utils/math"
import { Style, FaceColor, CubeFace } from "./consts"

import { MagicCube } from "./MagicCube"

const rootElement = document.querySelector(`.${Style.Root}`)

const magicCube = new MagicCube()

rootElement.appendChild(magicCube.element)

const initPost = multiplyMatrix(
    transform3d.translate([150, 150, 0]),
    transform3d.rotate(45, [1, 1, 1]),
)

let rotationAngle = 0

const cb = () => {
    rotationAngle += 1

    const pos = multiplyMatrix(
        initPost,
        transform3d.rotate(rotationAngle, [1, -1, 1]),
    )

    magicCube.element.style.transform = `matrix3d(${toCssMatrixView(pos)})`

    requestAnimationFrame(cb)
} 

requestAnimationFrame(cb)
