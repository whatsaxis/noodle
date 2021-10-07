import './terminal.css'
import './assets/fonts.css'

import { Style, formatText } from './Color'

class Terminal {
    private domElement: HTMLElement | null = null

    private history: HTMLDivElement[] = []

    private terminalHistory: HTMLDivElement
    private terminalPrompt: HTMLDivElement
    private terminalTyping: HTMLDivElement

    mount(element: HTMLElement) {
        this.domElement = element

        this.terminalHistory = document.createElement('div')
        this.terminalHistory.setAttribute('id', 'terminal-history')

        this.terminalPrompt = document.createElement('div')
        this.terminalPrompt.setAttribute('id', 'terminal-prompt')

        this.terminalTyping = document.createElement('div')
        this.terminalTyping.setAttribute('id', 'terminal-typing')

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

export default Terminal