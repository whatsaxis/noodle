/*
Interface & Type Definitions
*/

export type Style = IColorCode | IBackgroundColorCode | IColorTransformation | IColorMisc
export type StyledText = (string | Style)[]

interface BaseStyle {
    type: 1 | 2 | 3 | 4
}

interface IColorCode extends BaseStyle {
    hex: string
}

interface IBackgroundColorCode extends BaseStyle {
    hex: string
}

interface IColorTransformation extends BaseStyle {
    style: string
}

interface IColorMisc extends BaseStyle {
    signal: string
}


type Color = 
    'WHITE'        |
    'LIGHT_GRAY'   |
    'GRAY'         |
    'YELLOW'       |
    'ORANGE'       |
    'RED'          |
    'DARK_RED'     |
    'BROWN'        |
    'LIGHT_GREEN'  |
    'GREEN'        |
    'LIGHT_BLUE'   |
    'BLUE'         |
    'CYAN'         |
    'PINK'         |
    'LIGHT_PURPLE' |
    'PURPLE'       |
    'BLACK'

type BackgroundColor = Color | 'NONE'
type Transformation = 'BOLD' | 'ITALIC' | 'UNDERLINED'
type Misc = 'RESET'

/*
Color Definitions
*/

export const Color: Record<Color, IColorCode> = {
    WHITE        : { hex: '#ffffff', type: 1 },
    LIGHT_GRAY   : { hex: '#9c9d97', type: 1 },
    GRAY         : { hex: '#474f52', type: 1 },
    YELLOW       : { hex: '#ffd83d', type: 1 },
    ORANGE       : { hex: '#f9801d', type: 1 },
    RED          : { hex: '#ff5555', type: 1 },
    DARK_RED     : { hex: '#aa0000', type: 1 },
    BROWN        : { hex: '#825432', type: 1 },
    LIGHT_GREEN  : { hex: '#80c71f', type: 1 },
    GREEN        : { hex: '#5d7c15', type: 1 },
    LIGHT_BLUE   : { hex: '#3ab3da', type: 1 },
    BLUE         : { hex: '#3c44a9', type: 1 },
    CYAN         : { hex: '#169c9d', type: 1 },
    PINK         : { hex: '#f38caa', type: 1 },
    LIGHT_PURPLE : { hex: '#c64fbd', type: 1 },
    PURPLE       : { hex: '#8932b7', type: 1 },
    BLACK        : { hex: '#1d1c21', type: 1 },
}

export const Background: Record<BackgroundColor, IBackgroundColorCode> = {
    WHITE        : { hex: '#ffffff', type: 2 },
    LIGHT_GRAY   : { hex: '#9c9d97', type: 2 },
    GRAY         : { hex: '#474f52', type: 2 },
    YELLOW       : { hex: '#ffd83d', type: 2 },
    ORANGE       : { hex: '#f9801d', type: 2 },
    RED          : { hex: '#ff5555', type: 2 },
    DARK_RED     : { hex: '#aa0000', type: 2 },
    BROWN        : { hex: '#825432', type: 2 },
    LIGHT_GREEN  : { hex: '#80c71f', type: 2 },
    GREEN        : { hex: '#5d7c15', type: 2 },
    LIGHT_BLUE   : { hex: '#3ab3da', type: 2 },
    BLUE         : { hex: '#3c44a9', type: 2 },
    CYAN         : { hex: '#169c9d', type: 2 },
    PINK         : { hex: '#f38caa', type: 2 },
    LIGHT_PURPLE : { hex: '#c64fbd', type: 2 },
    PURPLE       : { hex: '#8932b7', type: 2 },
    BLACK        : { hex: '#1d1c21', type: 2 },

    NONE         : { hex: 'N/A', type: 2 }
}

export const Transform: Record<Transformation, IColorTransformation> = {
    BOLD         : { style: 'font-weight: bold;', type: 3 },
    ITALIC       : { style: 'font-style: italic;', type: 3 },
    UNDERLINED   : { style: 'text-decoration: underline;', type: 3 }
}

export const Misc: Record<Misc, IColorMisc> = {
    RESET: { signal: 'RESET', type: 4 }
}

/*
Helper Functions
*/

function isStyle(object: any): object is Style {
    if (!(object instanceof Object)) return false

    if ('type' in object) return true

    return false
}

export function formatText(text: StyledText) {
    let currentColor = Color.WHITE
    let currentBackgroundColor = Background.NONE
    let currentTransformations: IColorTransformation[] = []

    const container = document.createElement('div')

    text.forEach((t) => {
        if (isStyle(t)) {
            if (t.type === 1) currentColor = t as IColorCode
            if (t.type === 2) currentBackgroundColor = t as IBackgroundColorCode
            if (t.type === 3) currentTransformations.push(t as IColorTransformation)
            if (t.type === 4) {
                const misc = t as IColorMisc

                if (misc.signal === 'RESET') {
                    currentColor = Color.WHITE
                    currentBackgroundColor = Background.NONE
                    currentTransformations = []
                }
            }
        } else {
            const char = document.createElement('span')

            // Set content
            const cleaned = t.replaceAll(' ', '&nbsp;')
            char.innerHTML = cleaned

            const style = []

            // Set Color
            style.push(`color: ${ currentColor.hex };`)

            // Set Background Color
            if (currentBackgroundColor !== Background.NONE) style.push(`background-color: ${ currentBackgroundColor.hex };`)

            // Apply Transformations
            currentTransformations.forEach(t => {
                style.push(t.style)
            })

            // Finally, apply styles
            char.setAttribute('style', style.join(''))

            container.append(char)
        }
    })

    return container
}

export default Color