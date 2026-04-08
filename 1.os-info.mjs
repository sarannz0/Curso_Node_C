const os = require( node.os )

console.log('Sistema operativo', os.platform())
console.log('Version del sistema operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus())
console.log('Memoria libre', os.freemem())
console.log('memoria total', os.totalmem())
console.log('uptime', os.uptime())