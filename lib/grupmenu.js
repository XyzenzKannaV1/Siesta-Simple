const chalk = require('chalk')
const fs = require('fs')

global.grupmenu = (prefix, hituet) => {
return`  𝗚𝗥𝗨𝗣
.𝗮𝗱𝗱
.𝗸𝗶𝗰𝗸
.𝗸𝗶𝗰𝗸𝘁𝗶𝗺𝗲
.𝘄𝗲𝗹𝗰𝗼𝗺𝗲
.𝗮𝗻𝘁𝗶𝗹𝗶𝗻𝗸
.𝗵𝗶𝗱𝗲𝘁𝗮𝗴
.𝘁𝗮𝗴𝗮𝗹𝗹
`}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})