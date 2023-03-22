import { extendTheme } from "@chakra-ui/react"
import breakpoints from "./breakpoints"
import sizes from "./sizes"

const overwrites = {
    breakpoints: breakpoints,
    sizes: sizes
}

export default extendTheme(overwrites)