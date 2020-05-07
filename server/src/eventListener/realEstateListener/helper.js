import Certificate from "../../api/certification/certification.model";
import Notification from "../../api/notification/notification.model";

// Listen to the newly created certificate event then update in mongodb database
export async function updateCertStatus(event) {
  const update = {
    isComfirmed: true,
    idInBlockchain: event.returnValues.idCertificate,
  };
  const query = {
    transactionHash: event.transactionHash,
  };
  return Certificate.findOneAndUpdate(query, update).then();
}

// create notification for all owners of certificate
export async function createNotification(event) {
  const owners = event.returnValues.owners;
  const data = {
    url: "/user/my-properties",
    message: "Bạn có 1 tài sản mới đang chờ xác nhận",
  };
  const promises = owners.map((owner) => {
    data.userAddress = owner;
    return Notification.create(data);
  });
  return promises;
}

// handle event activate certificate on blockchain and update database mongodb
export async function handleActivateCertificate(event) {
  const query = { idInBlockchain: event.returnValues.idCertificate };
  const update = {
    state: event.returnValues.state,
    $push: { ownersActivated: event.returnValues.owner },
  };
  return Certificate.updateOne(query, update).then();
}
