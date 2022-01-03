import { Style } from "../consts"

export class MetaScreen {
    constructor() {
        this.screenEl = document.createElement("div")
        this.screenEl.classList.add(Style.Meta)

        this.controlHintEl = null
        this.coordinatesEl = null
        this.fpsEl = null

        this.createMetaScreen()
        this.updateControlHint()
    }

    get element() {
        return this.screenEl
    }

    update({ posVec, fps }) {
        this.updateCoordinates(posVec)
        this.updateFps(fps)
    }

    updateControlHint() {
        const mouse = document.createElement("div")
        mouse.classList.add(Style.HintMouse)

        const plus = document.createElement("div")
        plus.classList.add(Style.HintPlus)

        const keys = Array.from({ length: 4 }, () => {
            const el = document.createElement("div")
            el.classList.add(Style.HintItem)
            return el
        })

        const [keyW, keyA, keyS, keyD] = keys

        plus.textContent = "+"
        keyW.textContent = "W"
        keyA.textContent = "A"
        keyS.textContent = "S"
        keyD.textContent = "D"

        this.controlHintEl.append(mouse, plus, ...keys)
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
        this.controlHintEl = document.createElement("div")
        this.controlHintEl.classList.add(Style.ControlHint)

        this.coordinatesEl = document.createElement("div")
        this.coordinatesEl.classList.add(Style.Coordinates)

        this.fpsEl = document.createElement("div")
        this.fpsEl.classList.add(Style.Fps)

        this.screenEl.appendChild(this.controlHintEl)
        this.screenEl.appendChild(this.coordinatesEl)
        this.screenEl.appendChild(this.fpsEl)
    }
}
