import Certificate from "../../api/certification/certification.model";
import Notification from "../../api/notification/notification.model";
import { socketService } from "../../index";

// Listen to the newly created certificate event then update in mongodb database
export async function updateCertStatus(event) {
  const update = {
    isConfirmed: true,
    idInBlockchain: event.returnValues.idCertificate
  };
  const query = {
    transactionHash: event.transactionHash
  };
  return Certificate.updateOne(query, update, { upsert: true }); // create if not exits
}

// create notification for all owners of certificate
export async function createNotification(event) {
  const owners = event.returnValues.owners;
  const data = {
    url: `/my-properties`,
    message: "Bạn có 1 tài sản mới đang chờ xác nhận."
  };
  const promises = owners.map(owner => {
    data.userAddress = owner;
    return Notification.create(data);
  });
  // emit event new certificate for owners
  owners.forEach(owner =>
    socketService.emitEventToIndividualClient("new_certification", owner, data)
  );
  return promises;
}

// handle event activate certificate on blockchain and update database mongodb
export async function handleActivateCertificate(event) {
  const query = { idInBlockchain: event.returnValues.idCertificate };
  const update = {
    state: event.returnValues.state,
    $push: { ownersActivated: event.returnValues.owner }
  };
  return Certificate.updateOne(query, update).then();
}
