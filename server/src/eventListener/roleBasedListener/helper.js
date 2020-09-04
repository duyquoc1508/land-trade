import User from "../../api/user/user.model";
import { socketService } from "../../index";

const roleToString = { 0: "Super Admin", 1: "Notary" };

export async function addRole(event) {
  const query = { publicAddress: event.returnValues.account };
  const update = { role: roleToString[event.returnValues.role] };
  socketService.emiter("role_changed", "Add Role");
  return User.updateOne(query, update);
}

export async function removeRole(event) {
  const query = { publicAddress: event.returnValues.account };
  const update = { role: "owner" };
  socketService.emiter("role_changed", "Remove Role");
  return User.updateOne(query, update);
}
