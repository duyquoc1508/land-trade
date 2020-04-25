import mongoose from "mongoose";
const Schema = mongoose.Schema;

const certificationSchema = new Schema(
  {
    // for mapping idCertificate in blockchain and mongoDB
    idCert: {
      type: String
    },
    owners: [
      {
        type: String // multiple publicAddress of user
      }
    ],
    title: {
      type: String
    },
    notary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    // II. Land lot, house and other properties attaching with land
    properties: {
      landLot: {
        landLotNo: Number,
        mapSheetNo: Number,
        commonUseArea: Number,
        privateUseArea: Number,
        address: String,
        purposeOfUse: String,
        timeOfUse: String,
        originOfUse: String
      },
      house: {
        houseType: String,
        numberOfHouse: String, // mã số phòng sở hữu, tầng ở. địa chỉ toaf nhà là đia chỉ của khu đất
        constructionArea: Number,
        floorArea: Number,
        level: String,
        numberOfFloor: String,
        formOfOwn: String,
        timeOfUse: String
      },
      otherConstruction: String,
      //production forest is an artificial forest
      prodForestIsArtificial: String,
      perennialTree: String,
      notice: String
    },
    state: {
      type: Number,
      default: 0 //0: Not activated, 1: Activated, 2: Selling
    },
    ownersActivated: [
      {
        type: String
      }
    ],
    ownersAllowedSale: [
      {
        type: String
      }
    ],
    images: [
      {
        type: String
      }
    ],
    // updated when transaction is comfirmed
    transactionId: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
