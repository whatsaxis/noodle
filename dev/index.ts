import Terminal from '../src/Terminal'
import './reset.css'

import { Color, Transform, Misc, Background } from '../src/Color'

const terminal = new Terminal()
terminal.mount(document.getElementById('terminal'))

// Object.entries(Color).forEach((k) => {
//     console.log(k[1])
//     let name = k[0].replaceAll('_', ' ')
//     let length = name.length

//     for (let i = 0; i < 15 - length; i++) {
//         name += ' '
//     }

//     terminal.out([k[1], name, Misc.RESET, Background[k[0] as keyof typeof Color], '   '])
// })

async function main() {
    // terminal.out([Color.PINK, Transform.BOLD, 'Awesome Input Thing'])
    // terminal.skip()

    // while (true) {
    //     // todo add optional thingy before the msg eee

    //     await terminal.input((value) => {
    //         terminal.out([Color.RED, 'You Entered: ', Misc.RESET, value])
    //     }, '> ')

    //     terminal.skip()
    // }

    terminal.input((value) => console.log(value))
}

main()