import { render, renderCursor } from '../src/Render'
import { cursor } from '../src/Terminal'

describe('Rendering Module', () => {
    let element
    beforeEach(() => {
        document.body.innerHTML = '<div id="test"></div>'
        element = document.getElementById('test')
    })

    it('Can render a cursor', () => {
        const cursor = renderCursor()

        expect(cursor.nodeName.toLowerCase()).toBe('span')
        expect(cursor.classList).toContain('terminal-cursor')
        expect(cursor.innerHTML).toBe('&nbsp;')
    })

    it('Can render a blank command', () => {
        const command = [cursor]

        render(command, element)

        expect(document.body.innerHTML).toBe('<div id="test"><span class="terminal-cursor">&nbsp;</span></div>')
    })

    it('Can render a command with cursor at the end', () => {
        const command = [...'Testing...', cursor]

        render(command, element)

        expect(document.body.innerHTML).toBe('<div id="test">Testing...<span class="terminal-cursor">&nbsp;</span></div>')
    })

    it('Can render a command with cursor in the middle', () => {
        const command = [...'Test', cursor, ...'ing...']

        render(command, element)

        expect(document.body.innerHTML).toBe('<div id="test">Test<span class="terminal-cursor">&nbsp;</span>ng...</div>')
    })

    
    it('Can render a command with cursor at the beginning', () => {
        const command = [cursor, ...'Testing...']

        render(command, element)

        expect(document.body.innerHTML).toBe('<div id="test"><span class="terminal-cursor">&nbsp;</span>esting...</div>')
    })
})