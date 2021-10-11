import { cursor } from './Terminal'

export function render(command: string[], to: HTMLDivElement) {
  to.innerHTML = ''

  command.forEach((c, i) => {
    if (c !== cursor && command[i - 1] !== cursor) {
      to.append(c)
    } else if (command[i - 1] === cursor) {
      const cursor = renderCursor()
      to.append(cursor)
    } else if (
      command[command.length - 1] === cursor &&
      i === command.length - 1
    ) {
      const cursor = renderCursor()
      to.append(cursor)
    }
  })
}

export function renderCursor() {
  const cursor = document.createElement('span')
  cursor.innerHTML = '&nbsp;'

  cursor.classList.add('terminal-cursor')

  return cursor
}
