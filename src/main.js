import { Matrix, Transform3d, getPerspectiveDistance } from "./utils/math"
import {
    spawnObject,
    transformObject,
    getFrameTime,
    getFps,
} from "./utils/render"

import {
    Style,
    ControlKeys,
    ColorMapping,
    KEYBOARD_SENSITIVITY,
    MOUSE_SENSITIVITY,
    CUBE_WIDTH,
} from "./consts"

import { Camera } from "./Camera"
import { Input } from "./Input"

import { Cubelet } from "./entities/Cubelet"
import { MetaScreen } from "./entities/MetaScreen"

const rootElement = document.querySelector(`.${Style.Root}`)
const screenHeight = rootElement.offsetHeight
rootElement.style.perspective = `${getPerspectiveDistance(45, screenHeight)}px`

const camera = new Camera()
const input = new Input()

const metaScreen = spawnObject(new MetaScreen())

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const generateObjects = () => {
    const quantity = 50
    const objects = []

    for (let i = 0; i < quantity; ++i) {
        const object = spawnObject(new Cubelet(ColorMapping))

        objects.push({
            object,
            model: Matrix.multiply(
                Transform3d.translate([
                    getRandomInt(-quantity, quantity) * CUBE_WIDTH,
                    getRandomInt(-quantity, quantity) * CUBE_WIDTH,
                    getRandomInt(-quantity, quantity) * CUBE_WIDTH,
                ]),
                Transform3d.rotate(getRandomInt(0, 360), [
                    getRandomInt(0, 100) / 100,
                    getRandomInt(0, 100) / 100,
                    getRandomInt(0, 100) / 100,
                ])
            ),
        })
    }

    return objects
}

const processInput = (camera, frameTime) => {
    const mouseMovement = input.getMouseMove()

    if (!input.isPressed([ControlKeys.RightMouse])) {
        document.exitPointerLock()
        return
    }

    if (!document.pointerLockElement) {
        rootElement.requestPointerLock()
        return
    }

    const cameraSpeed = frameTime * KEYBOARD_SENSITIVITY

    const cameraChanging = {
        forward: 0,
        back: 0,
        left: 0,
        right: 0,
        yaw: mouseMovement.x * MOUSE_SENSITIVITY,
        pitch: mouseMovement.y * MOUSE_SENSITIVITY,
    }

    if (input.isPressed(ControlKeys.W)) {
        cameraChanging.forward = cameraSpeed
    }

    if (input.isPressed(ControlKeys.S)) {
        cameraChanging.back = cameraSpeed
    }

    if (input.isPressed(ControlKeys.A)) {
        cameraChanging.left = cameraSpeed
    }

    if (input.isPressed(ControlKeys.D)) {
        cameraChanging.right = cameraSpeed
    }

    camera.move(cameraChanging)
}

const objects = generateObjects()

const cb = () => {
    const frameTime = getFrameTime()
    const fps = getFps(frameTime)

    processInput(camera, frameTime)

    const view = camera.lookAt()

    objects.forEach(({ object, model }) => {
        transformObject(object, Matrix.multiply(view, model))
    })

    metaScreen.update({ posVec: camera.position, fps })
    requestAnimationFrame(cb)
}

requestAnimationFrame(cb)
