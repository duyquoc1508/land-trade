import User from "../../api/user/user.model";

const roleToString = { 0: "Super Admin", 1: "Notary" };

export async function addRole(event) {
  const query = { publicAddress: event.returnValues.account };
  const update = { role: roleToString[event.returnValues.role] };
  return User.updateOne(query, update);
}

export async function removeRole(event) {
  const query = { publicAddress: event.returnValues.account };
  const update = { role: "owner" };
  return User.updateOne(query, update);
}
