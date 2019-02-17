require("dotenv").config();
import pino from "pino";
import listener from "./services/listenerService";
import initializeRabbitConnection from "./services/rabbitService";
import dbService from "./services/dbService";
import getPastEvents from "./services/pastEvents";
import config from "../config";

import {
  VotersRegistryContract,
  CandidatesRegistryContract
} from "../src/services/contractService";

async function start() {
  const db = await dbService.initializeDb();
  const collections = await dbService.createCollections(db);
  const candidatesCollection = collections.candidatesCollection;
  const votersCollection = collections.votersCollection;
  const votesCollection = collections.votesCollection;

  if (config.db.reset === true) {
    await dbService.reinitalizeCollections(
      candidatesCollection,
      votersCollection,
      votesCollection
    );
  }

  /*
   * Create rabbit channel
   */
  const channel = await initializeRabbitConnection();

  /*
   * Listen to the new events
   */
  const eventsArray = [
    { eventType: "Vote", collection: votesCollection },
    { eventType: "_WhiteList_Candidate", collection: candidatesCollection },
    { eventType: "_WhiteList_Voter", collection: votersCollection }
  ];

  listener(channel, eventsArray);

  pino().info("The cache is running");
  pino().info("Press CTRL-C to stop");
}

start();
