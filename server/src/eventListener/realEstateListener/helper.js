import Certificate from "../../api/certification/certification.model";

export async function handleNewCertEvent(event) {
  const update = {
    isComfirmed: true,
  };
  const query = {
    transactionHash: event.transactionHash,
  };
  return Certificate.findOneAndUpdate(query, update).then();
}
