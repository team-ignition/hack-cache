import {} from "mocha";
const assert = require("assert");

import dbService from "../src/services/dbService";
import config from "../config";

let db;
let collections;

describe("should able to interact with the db", () => {
  it("should connect to the right db", async () => {
    db = await dbService.initializeDb();
    assert.ok(db);
    assert.equal(db.databaseName, config.db.name);
  });
  it("should create collections against the db", async () => {
    collections = await dbService.createCollections(db);
    assert.ok(collections);
  });
  it("should remove collections when calling remove collections", async () => {
    collections = await dbService.createCollections(db);
    assert.ok(collections);
  });
});