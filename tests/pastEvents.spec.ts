import {} from "mocha";
const assert = require("assert");

import dbService from "../src/services/dbService";
import pastEvents from "../src/services/pastEvents";
import {
    VotersRegistryContract,
    CandidatesRegistryContract
  } from "../src/services/contractService";

let db;
let collections;

before("Creating required collections", async () => {
    db = await dbService.initializeDb();
    collections = await dbService.createCollections(db);
});
describe("past events should be properaly saved", () => {
  it("should save whitelist past events on candidate collection", async () => {
    const candidates = await pastEvents
        .getWhiteListRegistryEvent(CandidatesRegistryContract, collections.candidatesCollection);
    assert.equal(candidates, true);
    const candidatesList = await collections.candidatesCollection.find({}).toArray();
    assert.notEqual(candidatesList, undefined);
   });
   it("should save whitelist past events on voters collection", async () => {
     const voters = await pastEvents
        .getWhiteListRegistryEvent(VotersRegistryContract, collections.votersCollection);
     assert.equal(voters, true);
     const votersList = await collections.votersCollection.find({}).toArray();
     assert.notEqual(votersList, undefined);
   });
   it("should save whitelist past events on votes collection", async () => {
    const votes = await pastEvents.getVotes(collections.votesCollection);
    assert.equal(votes, true);
    const votesList = await collections.votesCollection.find({}).toArray();
    assert.notEqual(votesList, undefined);
  });
});