interface Argument {
    name: string
}

interface Flag {
    name: string
    flag: string
}

interface Command {
    alias: string
    args: Argument[]
    flags: Flag[]
}

export default Command