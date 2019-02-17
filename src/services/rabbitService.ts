import pino from "pino";
const amqp = require("amqplib");
import config from "../../config";

export default async function initializeRabbitConnection() {
  try {
    const connection = await amqp.connect(config.rabbit.uri);
    const channel = await connection.createChannel();
    channel.assertQueue(config.rabbit.name, { durable: false });
    return channel;
  } catch (e) {
    pino().error(e);
    return e;
  }
}