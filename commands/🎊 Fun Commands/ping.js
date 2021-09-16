module.exports = {
    name: "ping",
    description: "\`Hiển thị AIP của bot\`",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Ping ping ping ping....`);

        msg.edit(`🏓 Pong pong!
        Độ trễ là: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        Độ trễ API mới là: ${Math.round(client.ping)}ms`);
    }
}
