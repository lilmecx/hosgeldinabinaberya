const Discord = require("discord.js");
const tokens = [
  "ODIyMTg0MDU1NTM3MDA4NjQx.YFOkkg.3TP2VMXRUx4HO7WBPX9ef0Br5io",
  "ODIyMTg1NzA4ODM0NzgzMzAz.YFOmHA.hXgyigmCKIazCPf5LYxsfV-DdD4",
  "ODIyMTg2NDg5NDYyMjU5NzEz.YFOm1g.K7N8Vpm4tsxzvN3um6T9bjqXQZo"
];
const chnls = [
  "827165800476573738",
  "827165801555165195",
  "827165802478043256"
];
const selamlı = [];
for (let index = 0; index < tokens.length; index++) {
  const token = tokens[index];
  const client = new Discord.Client();
  client.login(token);
  let concon;
  client.on("ready", async () => {
    console.log(client.user.username);
    await client.user.setActivity({
      name: "Ses botu yaptırmak için DM Spatz#1918",
      type: "LISTENING"
    });
    concon = await client.channels.cache.get(chnls[index]).join();
  });
  let ses;
  client.on("voiceStateUpdate", async (prev, cur) => {
    if (cur.member.user.bot) return;
    if (cur.channel && cur.channel.id === chnls[index]) {
      if (cur.channelID === prev.channelID) return;
      if (
        selamlı.includes(cur.member.id) &&
        cur.member.roles.highest.rawPosition <
          cur.guild.roles.cache.get("827165775499624489").rawPosition
      ) {
        //ROLID
        //console.log(selamlı);
        ses = await concon.play("./tekrardan.mp3");
        return;
      }
      if (
        cur.member.roles.highest.rawPosition <
        cur.guild.roles.cache.get("827165775499624489").rawPosition
      ) {
        //ROLID
        ses = await concon.play("./hosgeldin.mp3");
        selamlı.push(cur.member.user.id);
      } else if (
        cur.member.roles.highest.rawPosition >
        cur.guild.roles.cache.get("827165767597817877").rawPosition
      ) {
        //ROLID
        ses = await concon.play("./yetkili.mp3");
        selamlı.push(cur.member.user.id);
      }
    }
    if (
      prev.channel &&
      prev.channel.id === chnls[index] &&
      prev.channel.members.size === 1 &&
      ses
    )
      ses.end();
  });
  client.on("guildMemberUpdate", async (prev, cur) => {
    if (concon.channel.members.some(biri => biri.user.id === cur.user.id)) {
      if (prev.roles.highest.rawPosition < cur.roles.highest.rawPosition) {
        ses = await concon.play("./elveda.mp3");
      }
    } else return;
  });
  client.on("voiceStateUpdate", async (prev, cur) => {
    if (cur.member.id === client.user.id)
      concon = await client.channels.cache.get(chnls[index]).join();
  });
}
