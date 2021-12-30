import { Style } from "../consts"
import { transposeMatrix } from "./math"

const AVERAGE_FPS_COUNT = 10

const fpsState = {
    counter: 0,
    fpsStorage: 0,
    prevTime: null,
    fps: "--",
}

// spawnPoint is needed to bind objects to the center of the view
const spawnPoint = document.querySelector(`.${Style.SpawnPoint}`)

export const toCssMatrixView = (matrix) => {
    return transposeMatrix(matrix).join(",")
}

export const spawnObject = (object) => {
    // translate property aligns the view and object centers
    // it is necessary for correct transformations
    object.element.style.transform = "translate(-50%, -50%)"
    spawnPoint.appendChild(object.element)
    return object
}

export const transformObject = (object, matrix) => {
    object.element.style.transform = `translate(-50%, -50%) matrix3d(${toCssMatrixView(matrix)})`
    return object
}

export const getFps = () => {
    const currentTime = Date.now()

    if (!fpsState.prevTime) {
        fpsState.prevTime = currentTime
        return fpsState.fps
    }

    if (fpsState.counter < AVERAGE_FPS_COUNT) {
        fpsState.fpsStorage += currentTime - fpsState.prevTime
        fpsState.prevTime = currentTime
        fpsState.counter += 1

        return fpsState.fps
    }
    
    fpsState.fps = Math.floor(1000 / (fpsState.fpsStorage / AVERAGE_FPS_COUNT))
    
    fpsState.counter = 0
    fpsState.fpsStorage = 0

    return fpsState.fps
}
