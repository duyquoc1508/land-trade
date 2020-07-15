import web3 from "../web3Provider";
import RoleBasedAclContract from "../../contracts/RoleBasedAcl.json";
import RoleBasedAclEvent from "./Event";
import * as helper from "./helper";
import { roleContractAddress } from "../../config/common-path";

const instanceContract = new web3.eth.Contract(
  RoleBasedAclContract.abi,
  roleContractAddress
);

// listen all event emited from RealEstate contract
export function roleBasedListener() {
  instanceContract.events
    .allEvents()
    .on("data", event => {
      console.log(`=========== Event: ${event.event} ===========`);
      return handleEvent(event);
    })
    .on("error", console.error);
}

async function handleEvent(event) {
  console.log(event);
  switch (event.event) {
    case RoleBasedAclEvent.ROLE_ADDED:
      return helper.addRole(event);
    case RoleBasedAclEvent.ROLE_REMOVED:
      return helper.removeRole(event);
    default:
      throw new Error("Type event does not exist");
  }
}
