import { Style } from "../consts"
import { transposeMatrix } from "./math"

// spawnPoint is needed to bind objects to the center of the view
const spawnPoint = document.querySelector(`.${Style.SpawnPoint}`)

export const toCssMatrixView = (matrix) => {
    return transposeMatrix(matrix).join(',')
}

export const spawnObject = (object) => {
    spawnPoint.appendChild(object.element)
    return object
}

export const transformObject = (object, matrix) => {
    // translate property aligns the view and object centers
    // it is necessary for correct transformations
    object.element.style.transform = `translate(-50%, -50%) matrix3d(${toCssMatrixView(matrix)})`
    return object
}
