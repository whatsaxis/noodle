import { Color, Background, Transform, Misc, formatText } from '../src/Color'


describe('Color API', () => {
    it('Can generate a DOM element using default values', () => {
        const text = formatText(['Hello World!'])

        expect(text.innerHTML).toBe('<span style="color: #ffffff;">Hello&nbsp;World!</span>')
    })

    it('Can generate a DOM element using a color', () => {
        const text = formatText([Color.RED, 'Hello World!'])
        expect(text.innerHTML).toBe('<span style="color: #ff5555;">Hello&nbsp;World!</span>')
    })
    
    it('Can generate a DOM element using a background color', () => {
        const text = formatText([Background.RED, 'Hello World!'])
        expect(text.innerHTML).toBe('<span style="color: #ffffff;background-color: #ff5555;">Hello&nbsp;World!</span>')
    })

    it('Can generate a DOM element using a transform', () => {
        const text = formatText([Transform.BOLD, 'Hello World!'])
        expect(text.innerHTML).toBe('<span style="color: #ffffff;font-weight: bold;">Hello&nbsp;World!</span>')
    })

    it('Can generate a DOM element using multiple transforms', () => {
        const text = formatText([Transform.BOLD, Transform.ITALIC, 'Hello World!'])
        expect(text.innerHTML).toBe('<span style="color: #ffffff;font-weight: bold;font-style: italic;">Hello&nbsp;World!</span>')
    })
    
    it('Can generate a DOM element using the RESET event', () => {
        const text = formatText([Color.RED, Transform.BOLD, Background.GREEN, 'Hello', Misc.RESET, 'World!'])
        expect(text.innerHTML).toBe('<span style="color: #ff5555;background-color: #5d7c15;font-weight: bold;">Hello</span><span style="color: #ffffff;">World!</span>')
    })
})