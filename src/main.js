import {
    normalizeVector,
    sumVector,
    crossVector,
    multiplyVectorByScalar,
    transform3d,
    multiplyMatrix,
    getPerspectiveDistance,
} from "./utils/math"

import { spawnObject, transformObject, getFrameTime, getFps } from "./utils/render"

import { Style } from "./consts"

import { MagicCube } from "./entities/MagicCube"
import { MetaScreen  } from "./entities/MetaScreen"

const rootElement = document.querySelector(`.${Style.Root}`)
const screenHeight = rootElement.offsetHeight
rootElement.style.perspective = `${getPerspectiveDistance(45, screenHeight)}px`

const metaScreen = spawnObject(new MetaScreen())

const magicCube1 = spawnObject(new MagicCube())
const magicCube2 = spawnObject(new MagicCube())
const magicCube3 = spawnObject(new MagicCube())

const cube1Pos = multiplyMatrix(
    transform3d.translate([300, 0, 0]),
    transform3d.rotate(45, [1, 1, 0]),
)

const cube2Pos = multiplyMatrix(
    transform3d.translate([-300, 0, 0]),
    transform3d.rotate(45, [1, 0, 1]),
)

const cube3Pos = multiplyMatrix(
    transform3d.translate([0, 400, 0]),
    transform3d.rotate(45, [0, 1, 1]),
)

const CAMERA_SPEED = 50

const Key = Object.freeze({
    W: "KeyW",
    A: "KeyA",
    S: "KeyS",
    D: "KeyD",
    LeftMouse: 0,
    RightMouse: 2,
})

const camera = {
    position: [0, 0, 1],
    front: multiplyVectorByScalar([0, 0, 1], -1),
    up: [0, 1, 0],
    yawDeg: 0,
    pitchDeg: 0,
}

const pressedKeys = {
    [Key.LeftMouse]: false,
    [Key.RightMouse]: false,
    [Key.W]: false,
    [Key.A]: false,
    [Key.S]: false,
    [Key.D]: false,
}

const mouseMovement = {
    x: 0,
    y: 0,
}

document.addEventListener("contextmenu", (event) => {
    event.preventDefault()
})

document.addEventListener("mousedown", (event) => {
    pressedKeys[event.button] = true
})

document.addEventListener("mouseup", (event) => {
    pressedKeys[event.button] = false
})

document.addEventListener("mousemove", (event) => {
    mouseMovement.x += event.movementX
    mouseMovement.y -= event.movementY
})

document.addEventListener("keydown", (event) => {
    pressedKeys[event.code] = true
})

document.addEventListener("keyup", (event) => {
    pressedKeys[event.code] = false
})

const processInput = (frameTime) => {
    if (!pressedKeys[Key.RightMouse]) {
        mouseMovement.x = 0
        mouseMovement.y = 0

        rootElement.style.cursor = "auto"
        return
    }

    rootElement.style.cursor = "none"

    const cameraSpeed = frameTime || CAMERA_SPEED

    if (pressedKeys[Key.W]) {
        const changeVec = multiplyVectorByScalar(camera.front, cameraSpeed)
        camera.position = sumVector(camera.position, changeVec)
    }

    if (pressedKeys[Key.S]) {
        const changeVec = multiplyVectorByScalar(camera.front, cameraSpeed * -1)
        camera.position = sumVector(camera.position, changeVec)
    }

    if (pressedKeys[Key.A]) {
        const vec = normalizeVector(crossVector(camera.front, camera.up))
        const changeVec = multiplyVectorByScalar(vec, cameraSpeed * -1)
        camera.position = sumVector(camera.position, changeVec)
    }

    if (pressedKeys[Key.D]) {
        const vec = normalizeVector(crossVector(camera.front, camera.up))
        const changeVec = multiplyVectorByScalar(vec, cameraSpeed )
        camera.position = sumVector(camera.position, changeVec)
    }
}

const cb = () => {
    const frameTime = getFrameTime()
    const fps = getFps(frameTime)

    processInput(frameTime)

    const view = transform3d.lookAt(camera.position, sumVector(camera.position, camera.front), camera.up)

    transformObject(magicCube1, multiplyMatrix(view, cube1Pos))
    transformObject(magicCube2, multiplyMatrix(view, cube2Pos))
    transformObject(magicCube3, multiplyMatrix(view, cube3Pos))

    metaScreen.update({ posVec: camera.position, fps })

    requestAnimationFrame(cb)
}

requestAnimationFrame(cb)
