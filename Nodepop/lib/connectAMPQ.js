'use strict';

require('dotenv').config();

const amqplib = require('amqplib');
const connectionPromise = amqplib.connect(process.env.AMQP_SERVER_URL);
module.exports = connectionPromise;
