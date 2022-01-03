export class Input {
    constructor() {
        this.keysState = {}
        this.mouseMovement = { x: 0, y: 0 }

        this.setupListeners()
    }

    isPressed(key) {
        return this.keysState[key]
    }

    getMouseMove() {
        const { x, y } = this.mouseMovement
        this.mouseMovement = { x: 0, y: 0 }
        return { x, y }
    }

    setupListeners() {
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault()
        })

        document.addEventListener("mousemove", (event) => {
            this.mouseMovement.x += event.movementX
            this.mouseMovement.y -= event.movementY
        })

        document.addEventListener("mousedown", (event) => {
            this.keysState[event.button] = true
        })

        document.addEventListener("mouseup", (event) => {
            this.keysState[event.button] = false
        })

        document.addEventListener("keydown", (event) => {
            this.keysState[event.code] = true
        })

        document.addEventListener("keyup", (event) => {
            this.keysState[event.code] = false
        })
    }
}
