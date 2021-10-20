import Terminal from '../src/Terminal'
import './reset.css'

import { Color, Transform, Misc, Background, StyledText } from '../src/Color'

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
    const frames = [
        [
            Background.LIGHT_GRAY,
            ' INITIALISING AXIS SHELL™ '
        ],
        [
            Background.BLUE,
            '      LOADING ASSETS      '
        ],
        [
            Background.YELLOW,
            '      LOADING SCRIPTS      '
        ],
        [
            Background.CYAN,
            '  ESTABLISHING CONNECTION  '
        ],
        [
            Background.LIGHT_GREEN,
            '       HACKING NASA       '
        ]
    ]

    await terminal.animate(frames, 1500, { repeat: false, block: true, finalFrame: [ Background.LIGHT_PURPLE, ' WELCOME ' ] })

    terminal.skip()

    const commands: { [key: string]: () => void } = {
        'help': () => terminal.out([Transform.BOLD, Color.PINK, 'Help Command'])
    }

    while (true) {
        // todo add optional thingy before the msg eee

        await terminal.input((value) => {
            if (Object.keys(commands).includes(value)) {
                commands[value]()
            } else {
                terminal.out([value, ' - unknown command'])
            }
        }, '$ ')

        terminal.skip()
    }
}

main()