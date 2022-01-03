import { Matrix, Transform3d, getPerspectiveDistance } from "./utils/math"
import { spawnObject, transformObject, getFrameTime, getFps } from "./utils/render"

import { Style, ControlKeys, KEYBOARD_SENSITIVITY, MOUSE_SENSITIVITY } from "./consts"

import { Camera } from "./Camera"
import { Input } from "./Input"

import { MagicCube } from "./entities/MagicCube"
import { MetaScreen  } from "./entities/MetaScreen"

const rootElement = document.querySelector(`.${Style.Root}`)
const screenHeight = rootElement.offsetHeight
rootElement.style.perspective = `${getPerspectiveDistance(45, screenHeight)}px`

const camera = new Camera()
const input = new Input()

const metaScreen = spawnObject(new MetaScreen())

const magicCube1 = spawnObject(new MagicCube())
const magicCube2 = spawnObject(new MagicCube())
const magicCube3 = spawnObject(new MagicCube())

const cube1Model = Matrix.multiply(
    Transform3d.translate([300, 0, 0]),
    Transform3d.rotate(45, [1, 1, 0]),
)

const cube2Model = Matrix.multiply(
    Transform3d.translate([-300, 0, 0]),
    Transform3d.rotate(45, [1, 0, 1]),
)

const cube3Model = Matrix.multiply(
    Transform3d.translate([0, 400, 0]),
    Transform3d.rotate(45, [0, 1, 1]),
)

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

const cb = () => {
    const frameTime = getFrameTime()
    const fps = getFps(frameTime)

    processInput(camera, frameTime)

    const view = camera.lookAt()

    transformObject(magicCube1, Matrix.multiply(view, cube1Model))
    transformObject(magicCube2, Matrix.multiply(view, cube2Model))
    transformObject(magicCube3, Matrix.multiply(view, cube3Model))

    metaScreen.update({ posVec: camera.position, fps })
    requestAnimationFrame(cb)
}

requestAnimationFrame(cb)
