import pino from "pino";
import { MongoClient } from "mongodb";
import Bluebird from "bluebird";
import config from "../../config";

const dbService = {
  async initializeDb() {
    try {
      const mongo: any = Bluebird.promisifyAll(MongoClient);
      const client = await mongo.connectAsync(config.db.uri);
      const db = client.db(config.db.name);
      return db;
    } catch (e) {
      console.error(e);
      return e;
    }
  },

  async createCollections(db: any) {
    try {
      const candidatesCollection: any = db.collection("candidates");
      const votersCollection: any = db.collection("voters");
      const votesCollection: any = db.collection("votes");

      return {
        candidatesCollection,
        votersCollection,
        votesCollection
      };
    } catch (e) {
      return e;
    }
  },

  reinitalizeCollections(
    candidatesCollection: any,
    votersCollection: any,
    votesCollection: any
  ) {
    try {
      candidatesCollection.remove({});
      pino().info("Candidate collection reset");
      votersCollection.remove({});
      pino().info("Voter collection reset");
      votesCollection.remove({});
      pino().info("Votes collection reset");
      return;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
};

export default dbService;
