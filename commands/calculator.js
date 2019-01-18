const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;

exports.run = (client, msg, args) => {
    if (args.length < 1) {
        throw 'You must provide a equation to be solved on the calculator';
    }

    const question = args.join(' ');

    let answer;
    try {
        answer = math.eval(question);
    } catch (err) {
        throw `Invalid math equation: ${err}`;
    }

    msg.delete();
    msg.channel.send({
        embed: client.embed('', stripIndents`
                **Equation:**\n\`\`\`\n${question}\n\`\`\`
                **Answer:**\n\`\`\`\n${answer}\n\`\`\`
                `)
    });
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "calculator",
    category: "Fun Commands",
    description: "Calculates any math equations",
    usage: "calculate <equation>"
  };