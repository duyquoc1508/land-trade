import mongoose from "mongoose";
const Schema = mongoose.Schema;

const certificationSchema = new Schema(
  {
    owners: [
      {
        type: String // multiple publicAddress of user
      }
    ],
    notary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    // II. Land lot, house and other properties attaching with land
    properties: {
      landLot: {
        landLotNo: Number,
        mapSheetNo: String,
        commonUseArea: Number,
        privateUseArea: Number,
        address: String,
        purposeOfUse: String,
        timeOfUse: String,
        originOfUse: String
      },
      house: {
        houseType: String,
        address: String, // Address or house number, name of building for apartment
        constructionArea: Number,
        floorArea: Number,
        level: String,
        numberOfFloor: String,
        formOfOwn: String,
        timeOfOwn: String
      },
      otherConstruction: String,
      //production forest is an artificial forest
      prodForestIsArtificial: String,
      perennialTree: String,
      notice: String
    },
    state: {
      type: Number,
      default: 0 //0: Not activated, 1: Activated, 2: Selling, 3: In transaction
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
    // updated when transaction is confirmed
    transactionHash: {
      type: String,
      index: { unique: true }
    },
    isConfirmed: {
      type: Boolean,
      default: false
    },
    idInBlockchain: {
      type: Number
    },
    moreInfo: {
      title: String,
      description: String,
      numOfBedrooms: Number,
      numOfBathrooms: Number,
      areaFloor: Number,
      price: Number,
      galleries: [{ type: String }],
      utilities: [{ type: String }]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
