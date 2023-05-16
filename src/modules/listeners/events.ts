import { AnyError, Errors, Event, Maker, ApplicationCommandOptionTypes } from 'erine';

class Listeners extends Maker {
    @Event
    async ready() {
        this.bot.fold.sync().then(() => console.log('[/] - Slash commands updated!'));
        console.log(this.bot.user.tag.concat(' is successfully conected!'));
    }

    @Event
    async commandError(error: AnyError) {
        console.log(error);
        if (error instanceof Errors.MissingRequiredParam) {
            await error.ctx.send({
                embeds: [{
                    title: "¡Parámetro faltante!",
                    description: `El parámetro: **${error.param.name}** debe ser provisto.`,
                    fields: [{
                        name: 'Información',
                        value: [
                            `Nombre:${error.param.name}`,
                            `Descripción:${error.param.description}`,
                            `Tipo:${error.param.required ? 'Requerido' : 'No requerido'}`,
                            `AppCmdType:${error.param.type}`
                        ].map((str: string) => `**${str.split(':')[0]}**: ${str.split(':')[1]}`).join('\n')
                    }],
                    color: 0xCCE5FF
                }]
            })
        }
    }
}

export const data = Listeners;