'use strict';

const connectionPromise = require('../lib/connectAMPQ');

// se ejecuta en una ventana a parte
publishTask('resize-photo');

async function publishTask(task) {
    
    main().catch(err => console.log('Hubo un error', err));
    
    async function main() {
    
        const conn = await connectionPromise;
        const channel = await conn.createChannel();
        await channel.assertQueue(task, {
            durable: true
        });

        channel.prefetch(1);        
        
        // console.log('hello'); si lo muestra en la consola
        channel.consume(task, msg => {
            // no consigo hacer que consuma la tarea
            // y en rabbitMQ se ha creado correctamente
            // console.log('hello'); no lo muestra en la consola
            console.log(msg.content.toString());
            
            // con jimp hacer el resize, en el paylod de la tarea está el nombre de la imagen
            
            channel.ack(msg);
        });
    }
}
