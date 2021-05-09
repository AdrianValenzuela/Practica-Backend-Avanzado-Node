'use strict';

const connectionPromise = require('../lib/connectAMPQ');

async function publishTask(task, message) {

    main().catch(err => console.log('Hubo un error', err));

    async function main() {

        const conn = await connectionPromise;
        const channel = await conn.createChannel();
        await channel.assertQueue(task, {
            durable: true
        });

        // enviar un mensaje a la cola
        channel.sendToQueue(task, Buffer.from(JSON.stringify(message)), {
            persistent: true
        });
    }
}

module.exports = publishTask;