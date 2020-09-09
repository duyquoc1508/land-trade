import web3 from "../web3Provider";
import RealEstateContract from "../../contracts/RealEstate.json";
import RealEstateEvent from "./Event";
import * as helper from "./helper";
import { realEstateContractAddress } from "../../config/common-path";

const instanceContract = new web3.eth.Contract(
  RealEstateContract.abi,
  realEstateContractAddress
);

// listen all event emited from RealEstate contract
export function realEstateListener() {
  instanceContract.events
    .allEvents()
    .on("data", event => {
      console.log(`=========== Event: ${event.event} ===========`);
      return handleEvent(event);
    })
    .on("error", console.error);
}

async function handleEvent(event) {
  switch (event.event) {
    case RealEstateEvent.NEW_CERTIFICATE:
      helper.createNotification(event);
      helper.updateCertStatus(event);
      return;
    // Promise.all([p1, ...p2]);
    case RealEstateEvent.ACTIVATE:
      return helper.handleActivateCertificate(event);
    case RealEstateEvent.ACTIVATE_SALE:
      return;
    case RealEstateEvent.TRANSFER:
      return;
    default:
      throw new Error("Type event does not exist");
  }
}
