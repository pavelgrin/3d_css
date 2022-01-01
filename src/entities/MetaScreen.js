import { Style } from "../consts"

export class MetaScreen {
    constructor() {
        this.screenEl = document.createElement("div")
        this.screenEl.classList.add(Style.Meta)

        this.coordinatesEl = null
        this.fpsEl = null

        this.createMetaScreen()
    }

    get element() {
        return this.screenEl
    }

    update({ posVec, fps }) {
        this.updateCoordinates(posVec)
        this.updateFps(fps)
    }

    updateCoordinates([x, y, z]) {
        this.coordinatesEl.innerHTML = `
            X:${x < 0 ? Math.floor(x) : `&nbsp${Math.floor(x)}`}<br>
            Y:${y < 0 ? Math.floor(y) : `&nbsp${Math.floor(y)}`}<br>
            Z:${z < 0 ? Math.floor(z) : `&nbsp${Math.floor(z)}`}
        `
    }

    updateFps(fps) {
        this.fpsEl.textContent = `FPS: ${fps}`
    }

    createMetaScreen() {
        this.coordinatesEl = document.createElement("div")
        this.coordinatesEl.classList.add(Style.Coordinates)

        this.fpsEl = document.createElement("div")
        this.fpsEl.classList.add(Style.Fps)

        this.screenEl.appendChild(this.coordinatesEl)
        this.screenEl.appendChild(this.fpsEl)
    }
}
