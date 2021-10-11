import './terminal.css'
import './assets/fonts.css'

import { Style, formatText } from './Color'
import { render } from './Render'

class Terminal {
    private domElement: HTMLElement | null = null

    private history: HTMLDivElement[] = []

    private terminalHistory: HTMLDivElement
    private terminalPrompt: HTMLDivElement
    private terminalTyping: HTMLDivElement

    mount(element: HTMLElement) {
        this.domElement = element
        this.domElement.classList.add('terminal')

        this.terminalHistory = document.createElement('div')
        this.terminalHistory.setAttribute('class', 'terminal-history')

        this.terminalPrompt = document.createElement('div')
        this.terminalPrompt.setAttribute('class', 'terminal-prompt')

        this.terminalTyping = document.createElement('div')
        this.terminalTyping.setAttribute('class', 'terminal-typing')

        this.terminalPrompt.append(this.terminalTyping)

        this.domElement.append(this.terminalHistory)
        this.domElement.append(this.terminalPrompt)
    }

    out(message: (string | Style)[]) {
        this.checkMount()

        this.history.push(formatText(message))

        this.renderHistory()
    }

    skip() {
        this.checkMount()

        // Simply add a blank space!
        this.out([' '])
    }

    async input(callback: (value: string) => void, prepend: string = '') {
        return new Promise((resolve, reject) => {
            this.checkMount()

            while (this.terminalPrompt.children.length !== 1) {
                this.terminalPrompt.removeChild(this.terminalPrompt.firstChild)
            }

            const pre = document.createElement('span')
            pre.setAttribute('style', 'display: inline;')
            pre.innerHTML = prepend.replaceAll(' ', '&nbsp;')

            this.terminalPrompt.prepend(pre)

            let command: string[] = [cursor]
    
            const translateCursor = (value: number) => {
                const ci = command.indexOf(cursor)
    
                const tmp = command[ci + value]
    
                // Check for invalid cursor movement
                if (ci === 0 && value < 0 || ci === command.length - 1 && value > 0) return
    
                command[ci + value] = command[ci]
                command[ci] = tmp
            }
    
            const specialKeys = {
                ArrowLeft: () => translateCursor(-1),
                ArrowRight: () => translateCursor(1),
                Backspace: () => {
                    const ci = command.indexOf(cursor)
    
                    if (ci === 0) return
    
                    command.splice(ci - 1, 1)
                },
                Enter: () => { 
                    const formatted: string = command.filter(e => e !== cursor).join('')
    
                    command = []
                    this.terminalTyping.innerHTML = ''
    
                    document.removeEventListener('keydown', handler, true)


                    this.history.push(formatText([prepend, formatted]))
                    this.renderHistory()

                    resolve(true)

                    /*
                        Make sure to call the callback AFTER the promise
                        * is resolved, so that the value of the input is pushed
                        first, and then anything that comes in the callback
                    */
                   
                    callback( formatted )
                }
            }
    
            const handler = (e: KeyboardEvent) => {
                if (Object.keys(specialKeys).includes(e.key)) {
                    specialKeys[e.key as keyof typeof specialKeys]()
    
                    render(command, this.terminalTyping)
                    return
                }
            
                if (/^[A-Za-z0-9\s!@#$%^&*()-_=+{}\\|'";:<>,./?]$/.test(e.key)) {
                    command.splice(command.indexOf(cursor), 0, e.key)
                    render(command, this.terminalTyping)
                }
            }
    
            document.addEventListener(
                'keydown',
                handler,
                true
            )
    
            render(command, this.terminalTyping)

        })
    }

    private renderHistory() {
        // Clear history before we re-render it
        this.terminalHistory.innerHTML = ''

        this.history.forEach(h => {
            this.terminalHistory.append(h)
        })
    }

    private checkMount() {
        if (this.domElement === null) throw new Error('Terminal must be mounted before doing this!')
    }
}

export const cursor = '$cursor'

export default Terminal