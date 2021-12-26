import { Styles } from "./consts"

import { SmallCube } from "./SmallCube"

const rootElement = document.querySelector(`.${Styles.Root}`)

const cube = new SmallCube({
    front: "#009b48 ",
    top: "#ffffff",
    bottom: "#b71234",
    left: "#ffd500",
    right: "#0046ad",
    back: "#ff5800",
})

rootElement.appendChild(cube.element)
