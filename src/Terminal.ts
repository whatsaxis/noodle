import './terminal.css'
import './assets/fonts.css'

import { StyledText, formatText } from './Color'
import { render } from './Render'

interface AnimationOptions {
    repeat?: boolean | number,
    block?: boolean,
    finalFrame?: StyledText | null
}

class Terminal {
    private domElement: HTMLElement | null = null

    private history: HTMLDivElement[] = []

    private terminalHistory: HTMLDivElement
    private terminalPrompt: HTMLDivElement
    private terminalTyping: HTMLDivElement

    private selected: boolean

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

        this.selected = false

        document.addEventListener('click', (event) => {
            if (event.target === this.domElement) return

            this.selected = false
        }, false)

        this.domElement.addEventListener('click', () => {
            this.selected = true
        }, false)
    }

    out(message: StyledText) {
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
        return new Promise((resolve) => {
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
                        is resolved, so that the value of the input is pushed
                        first, and then anything that comes in the callback
                    */
                   
                    callback( formatted )
                }
            }
    
            const handler = (e: KeyboardEvent) => {
                if (!this.selected) return

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

    async animate(animation: StyledText[], update: number, options: AnimationOptions = { repeat: true, block: false, finalFrame: null }) {
        const { repeat, block, finalFrame } = options

        return new Promise((resolve) => {
            const domAnimation = document.createElement('div')

            let stopped = false
            let frame = 0
            let repeats = typeof repeat === 'number' ? repeat : null

            if (!block) resolve(true)

            // Render initial frame
            domAnimation.innerHTML = formatText(animation[0]).innerHTML
    
            // Timer Logic
            const timer = setInterval(() => {
                if (stopped === true) {
                    clearInterval(timer)
                    resolve(true)
                    return
                }
        
                if (!(frame + 1 > animation.length - 1)) frame++
                else {
                    // Check for repeat option
                    if (repeat === true) frame = 0
                    else if (repeats !== null) {
                        if (repeats > 0) {
                            frame = 0
                            repeats--
                        } else {
                            // Stop animation

                            if (finalFrame !== null) domAnimation.innerHTML = formatText(finalFrame).innerHTML

                            clearInterval(timer)
                            resolve(true)
                            return
                        }
                    }
                    else {
                        // Stop animation

                        if (finalFrame !== null) domAnimation.innerHTML = formatText(finalFrame).innerHTML

                        clearInterval(timer)
                        resolve(true)
                        return
                    }
                }
        
                // Actually update the animation
                domAnimation.innerHTML = formatText(animation[frame]).innerHTML
            }, update)
        
            // Push to history
            this.history.push(domAnimation)
            this.renderHistory()
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