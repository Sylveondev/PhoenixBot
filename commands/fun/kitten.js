const { Command } = require('@sapphire/framework');
const { PermissionFlagsBits, AttachmentBuilder, Attachment } = require('discord.js');
const { send } = require('@sapphire/plugin-editable-commands');
const bent = require('bent');

class PingCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'kitten',
      aliases: ['kitty'],
      description: 'Send a random kitty kat from [cataas](https://cataas.com).',
      detailedDescription: {
        usage: 'kitten',
        examples: ['kitten'],
        args: ['No args included.']
      },
      cooldownDelay: 10_000,
      requiredClientPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles],
      preconditions: ['modonly']
    });
  }

  async messageRun(message) {
    const getStream = await bent('https://cataas.com');
    const stream = await getStream('/kitten');

    if (stream.statusCode != 200) return send(message, `\`\`\`${stream.status}\`\`\``);

    //const obj = await stream.json();

    await send(message, { files: [stream] });
  }
}
module.exports = {
  PingCommand
};