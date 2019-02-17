import BlueBird from "bluebird";
import config from "../../config";
import {
  TokenRankedListContract
} from "./contractService";

const getPastEvents = {
  async getWhiteListRegistryEvent(RegistryContract: any, collection: any) {
    const Registry = BlueBird.promisifyAll(RegistryContract);
    const events = await Registry.getPastEvents("_WhiteList", { fromBlock: config.initBlock });
    await events.map(async (event: any) => {
      const doc = await collection.findOne({ event });
      if (doc !== null) return true;
      const result = await collection.insertOne({ event });
      return result;
    });
    return true;
  },

  async getVotes(votesCollection: any) {
    const TokenRankedList = BlueBird.promisifyAll(TokenRankedListContract);
    const events = await TokenRankedList.getPastEvents("Vote", { fromBlock: config.initBlock });
    await events.map(async (event: any) => {
      const doc = await votesCollection.findOne({ event });
      if (doc !== null) return true;
      event.returnValues._amount = parseFloat(
        event.returnValues._amount
      );
      event.returnValues._periodIndex = parseFloat(
        event.returnValues._periodIndex
      );
      const result = await votesCollection.insertOne({ event });
      return result;
    });
    return true;
  }
};

export default getPastEvents;
