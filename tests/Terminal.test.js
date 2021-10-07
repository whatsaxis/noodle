import Terminal from '../src/Terminal'

describe('Terminal API', () => {
    let terminal

    beforeEach(() => {
        document.body.innerHTML = '<div id="terminal"></div>'

        terminal = new Terminal()
    })

    it('Creates a terminal successfully', () => {
        terminal.mount(document.getElementById('terminal'))

        expect(document.body.innerHTML).toBe(
            '<div id="terminal"><div id="terminal-history"></div><div id="terminal-prompt"><div id="terminal-typing"></div></div></div>'
        )
    })

    it('Can write a line', () => {
        terminal.mount(document.getElementById('terminal'))

        terminal.out(['Test'])

        expect(document.body.innerHTML).toBe(
            '<div id="terminal"><div id="terminal-history"><div><span style="color: #ffffff;">Test</span></div></div><div id="terminal-prompt"><div id="terminal-typing"></div></div></div>'
        )
    })

    it('Can skip a line', () => {
        terminal.mount(document.getElementById('terminal'))

        terminal.skip()

        expect(document.body.innerHTML).toBe(
            '<div id="terminal"><div id="terminal-history"><div><span style="color: #ffffff;">&nbsp;</span></div></div><div id="terminal-prompt"><div id="terminal-typing"></div></div></div>'
        )
    })
})