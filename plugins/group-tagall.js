import fetch from 'node-fetch'

const handler = async (m, { conn, text, participants, command }) => {

  const groupMetadata = await conn.groupMetadata(m.chat)
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'Sin descripción disponible.'
  const groupImg = await conn.profilePictureUrl(m.chat, 'image').catch(_ => banner)
  const totalMembers = participants.length
  const sender = m.pushName || 'Usuario desconocido'


  const mensaje = text ? text : '¡Atención a todos! 🌳'
  let texto = `﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌
🍁 𝙈𝙀𝙉𝘾𝙄𝙊𝙉 𝙂𝙀𝙉𝙀𝙍𝘼𝙇 🌴
﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌
> *Grupo:* ${groupName}
> *Miembros:* ${totalMembers}
> *Autor:* ${sender}
> *Mensaje:* ${mensaje}

🪵 *Descripción:*
${groupDesc ? `> ${groupDesc}` : 'No hay descripción.'}

﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌
🍃 𝙈𝙀𝙉𝘾𝙄𝙊𝙉𝘼𝘿𝙊𝙎
﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌
${participants.map((p, i) => `${i + 1}. @${p.id.split('@')[0]}`).join('\n')}


> ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }`.trim()
  
  await conn.sendMessage(m.chat, {
    image: { url: groupImg },
    caption: texto,
    mentions: participants.map(a => a.id)
  })
}

handler.help = ['todos', 'invocar', 'tagall']
handler.tags = ['group']
handler.command = ['todos', 'invocar', 'tagall']
handler.admin = true
handler.group = true

export default handler