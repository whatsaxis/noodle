import Terminal from '../src/Terminal'
import './reset.css'

import { Color, Background, Misc } from '../src/Color'

const terminal = new Terminal()
terminal.mount(document.getElementById('terminal'))

Object.entries(Color).forEach((k) => {
    console.log(k[1])
    let name = k[0].replaceAll('_', ' ')
    let length = name.length

    for (let i = 0; i < 15 - length; i++) {
        name += ' '
    }

    terminal.out([k[1], name, Misc.RESET, Background[k[0] as keyof typeof Color], '   '])
})