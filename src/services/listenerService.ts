import pino from "pino";
import config from "../../config";

export default function(
  channel: any,
  eventsArray: any,
) {
  channel.consume(config.rabbit.name, (stringifiedMsg: any) => {
    pino().info(" [x] Received: %s", stringifiedMsg.content);
    const msg = JSON.parse(stringifiedMsg.content);
    eventsArray.map((key: any) => {
      if (key.eventType === msg.eventType) {
        key.collection.findOne({ event: msg.eventValue }).then((doc: any) => {
          if (doc === null) {
             key.collection.insertOne({ event: msg.eventValue });
          }
      });
      }
    });
  }, { noAck: true });
}