import Cetification from "./cetification.model";
import { ErrorHandler } from "./../../helper/error";

const checkResourceOwner = (idResourceOwner, idCurrentUser) => {
  if (idResourceOwner.toString() != idCurrentUser)
    throw new ErrorHandler(403, "You are not permission access to this resource");
};

// Get cetification
export async function getCetification(req, res, next) {
  try {
    const cetification = await Cetification.findById(req.params.idCetification);
    if (!cetification) {
      throw new ErrorHandler(404, "Cetification not found");
    }
    return res.status(200).json({ statusCode: 200, data: cetification });
  } catch (error) {
    next(error);
  }
}

// Create cetification
export async function createCetification(req, res, next) {
  try {
    // const landLot = {
    //   landLotNo: req.body.landLotNo,
    //   landMapSheetNo: req.body.landMapSheetNo,
    //   landAddress: req.body.landAddress,
    //   landArea: req.body.landArea,
    //   landFormOfUse: req.body.landFormOfUse,
    //   landPurposeOfUse: req.body.landPurposeOfUse,
    //   landTimeOfUse: req.body.landTimeOfUse,
    //   landOriginOfUse: req.body.landOriginOfUse
    // };
    // const house = {
    //   houseAddress: req.body.houseAddress,
    //   houseType: req.body.houseType,
    //   houseApartmentName: req.body.houseApartmentName,
    //   houseConstructionArea: req.body.houseConstructionArea,
    //   houseFloorArea: req.body.houseFloorArea,
    //   houseFormOfOwner: req.body.houseFormOfOwner,
    //   houseClass: req.body.houseClass,
    //   houseTimeOfUse: req.body.houseTimeOfUse
    // };
    const newCetification = {
      owner: req.user._id, // extract from token
      title: req.body.title,
      properties: req.body.properties
      // {
      //   landLot,
      //   house,
      //   otherConstruction: req.body.otherConstruction,
      //   prodForestIsArtificial: req.body.prodForestIsArtificial,
      //   perennialTree: req.body.perennialTree,
      //   notice: req.body.notice
      // }
    };
    const cetification = await Cetification.create(newCetification);
    return res.status(201).json({ statusCode: 201, data: cetification });
  } catch (error) {
    next(error);
  }
}

// Update cetification
export async function updateCetification(req, res, next) {
  try {
    const newCetification = req.body;
    const cetification = await Cetification.findById(req.params.idCetification);
    if (!cetification) {
      throw new ErrorHandler(404, "Cetification not found");
    }
    //check resource owner
    checkResourceOwner(cetification.owner, req.user._id);
    await Cetification.findByIdAndUpdate(req.params.idCetification, newCetification);
    return res.status(200).json({ statusCode: 200, message: "Update cetification successfully" });
  } catch (error) {
    next(error);
  }
}

// Delete cetification
export async function deleteCetification(req, res, next) {
  try {
    const cetification = await Cetification.findById(req.params.idCetification);
    if (!cetification) {
      throw new ErrorHandler(404, "Cetification not found");
    }
    //check resource owner
    checkResourceOwner(cetification.owner, req.user._id);
    await Cetification.findOneAndDelete(req.params.idCetification);
    // or status code 204 without data in the response
    return res.status(200).json({ statusCode: 200, message: "Delete cetification successfully" });
  } catch (error) {
    next(error);
  }
}
