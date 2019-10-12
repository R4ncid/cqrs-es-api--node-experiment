export interface HandlerInterface {
    handle(command: CommandInterface):Promise<void>
}

export interface CommandInterface {}