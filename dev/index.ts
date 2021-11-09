import Terminal from '../src/Terminal'
import './reset.css'

import { Color, Transform, Misc, Background, StyledText } from '../src/Color'

const terminal = new Terminal()
terminal.mount(document.getElementById('terminal'))

interface Command {
    description: string,
    execute: () => void
}

interface Directory {
    name: string,
    contents: (File | Directory)[]
}

interface File {
    name: string,
    extension: string
    contents: string
}

async function main() {
    let disk: Directory = {
        name: '~',
        contents: [
            {
                name: 'os',
                contents: []
            },
            {
                name: 'user',
                contents: [
                    {
                        name: 'hello',
                        extension: 'txt',
                        contents: 'Welcome to Axis Shell!'
                    }
                ]
            }
        ]
    }

    let currentDirectory = ['~', 'user']

    const commands: { [key: string]: Command } = {
        'help': {
            description: 'Helps you!',
            execute: () => 
            {
                terminal.out([Transform.BOLD, Color.PINK, 'Help Command'])
                terminal.skip()

                Object.entries(commands).forEach(cmd => terminal.out([Color.RED, cmd[0], Misc.RESET, ': ', cmd[1].description]))
            }
        },
        'dir': {
            description: 'Display current folder content',
            execute: () => {
                let currentDir: Directory = disk

                console.log(currentDir)

                currentDirectory.forEach(dir => {
                    currentDir = currentDir.contents.filter(c => c.name === dir)
                })

                console.log(currentDir)

                terminal.out([ currentDirectory.join('/') ])
                terminal.skip()
                terminal.out([ currentDir.contents.toString() ])
            }
        }
    }

    while (true) {
        await terminal.input((value) => {
            if (Object.keys(commands).includes(value)) {
                commands[value].execute()
            } else {
                terminal.out([value, ' - unknown command'])
            }
        }, currentDirectory.join('/') + ' $ ')

        terminal.skip()
    }
}

main()