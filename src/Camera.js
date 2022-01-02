import { Vector, Transform3d, toRadians } from "./utils/math"

export class Camera {
    constructor(position = [0, 0, 1000], target = [0, 0, 0]) {
        this.up = [0, 1, 0]
        this.yaw = -90
        this.pitch = 0

        this.position = position
        this.direction = Vector.normalize(Vector.subtract(target, position))
    }

    updateYawAngle(angle) {
        this.yaw += angle
    }

    updatePitchAngle(angle) {
        this.pitch += angle

        if (this.pitch > 89) {
            this.pitch = 89
        } else if (this.pitch < -89) {
            this.pitch = -89
        }
    }

    updateCameraDirection() {
        const frontX = Math.cos(toRadians(this.yaw)) * Math.cos(toRadians(this.pitch))
        const frontY = Math.sin(toRadians(this.pitch))
        const frontZ = Math.sin(toRadians(this.yaw)) * Math.cos(toRadians(this.pitch))

        this.direction = Vector.normalize([frontX, frontY, frontZ])
    }

    move({ forward, back, left, right, yaw, pitch }) {
        const lateralOffset = right - left
        const longitudinalOffset = forward - back

        const lateralDirection = Vector.normalize(Vector.cross(this.direction, this.up))
        const longitudinalDirection = this.direction

        const lateralOffsetVec = Vector.dot(lateralDirection, lateralOffset)
        const longitudinalOffsetVec = Vector.dot(longitudinalDirection, longitudinalOffset)

        const offsetVec = Vector.add(lateralOffsetVec, longitudinalOffsetVec)

        this.position = Vector.add(this.position, offsetVec)

        this.updateYawAngle(yaw)
        this.updatePitchAngle(pitch)
        this.updateCameraDirection()
    }

    lookAt() {
        const target = Vector.add(this.position, this.direction)
        return Transform3d.lookAt(this.position, target, this.up)
    }
}
