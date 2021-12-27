import { transform3d, multiplyMatrix, toCssMatrixView } from "./utils/math"
import { Style, FaceColor } from "./consts"

import { Cubelet } from "./Cubelet"

const rootElement = document.querySelector(`.${Style.Root}`)

const cube = new Cubelet({
    front: FaceColor.Green,
    top: FaceColor.White,
    bottom: FaceColor.Red,
    left: FaceColor.Yellow,
    right: FaceColor.Blue,
    back: FaceColor.Orange,
})

rootElement.appendChild(cube.element)

const initPost = multiplyMatrix(
    transform3d.translate([150, 150, 0]),
    transform3d.rotate(45, [1, 1, 1]),
)

let rotationAngle = 0

const cb = () => {
    rotationAngle += 1

    const pos = multiplyMatrix(
        initPost,
        transform3d.rotate(rotationAngle, [1, 1, 1]),
    )

    cube.element.style.transform = `matrix3d(${toCssMatrixView(pos)})`

    requestAnimationFrame(cb)
} 

requestAnimationFrame(cb)
