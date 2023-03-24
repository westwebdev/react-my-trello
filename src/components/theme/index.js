import { extendTheme } from "@chakra-ui/react"
import breakpoints from "./breakpoints"
import sizes from "./sizes"
import link from "./link"

const overwrites = {
    breakpoints: breakpoints,
    sizes: sizes,
    components: {
        Link : link
    }
}

export default extendTheme(overwrites)