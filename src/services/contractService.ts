import pino from "pino";
import Frontier from "@frontier-token-research/frontier-js";
import config from "../../config";

const Web3 = require("web3");

const web3 = new Web3(config.node_uri);

const frontier = new Frontier({ web3Provider: web3 });

const Erc20Contract: any = frontier.contracts.Erc20.erc20Contract;
const TokenRankedListContract: any =
  frontier.contracts.TokenRankedList.tokenRankedListContract;
const CandidatesRegistryContract: any =
  frontier.contracts.OwnedRegistry.Candidate.ownedRegistryContract;
const VotersRegistryContract: any =
  frontier.contracts.OwnedRegistry.Voter.ownedRegistryContract;

export {
  TokenRankedListContract,
  Erc20Contract,
  VotersRegistryContract,
  CandidatesRegistryContract
};
