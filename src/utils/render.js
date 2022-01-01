import { Style, AVERAGE_FPS_COUNT } from "../consts"
import { transposeMatrix } from "./math"

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

export const getFrameTime = () => {
    if (!getFrameTime.prevTime) {
        getFrameTime.prevTime = Date.now()
        return 0
    }

    const currentTime = Date.now()
    const frameTime = currentTime - getFrameTime.prevTime
    getFrameTime.prevTime = currentTime

    return frameTime
}

export const getFps = (frameTime) => {
    if (!getFps.state) {
        getFps.state = {
            counter: 0,
            fpsStorage: 0,
            fps: "--",
        }
    }

    if (getFps.state.counter < AVERAGE_FPS_COUNT) {
        getFps.state.fpsStorage += frameTime
        getFps.state.counter += 1

        return getFps.state.fps
    }

    const averageFrameTime = getFps.state.fpsStorage / AVERAGE_FPS_COUNT
    getFps.state.fps = Math.floor(1000 / averageFrameTime)

    getFps.state.counter = 0
    getFps.state.fpsStorage = 0

    return getFps.state.fps
}
