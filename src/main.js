import { Styles } from "./consts"

import { Cubelet } from "./Cubelet"

const rootElement = document.querySelector(`.${Styles.Root}`)

const cube = new Cubelet({
    front: "#009b48 ",
    top: "#ffffff",
    bottom: "#b71234",
    left: "#ffd500",
    right: "#0046ad",
    back: "#ff5800",
})

rootElement.appendChild(cube.element)
