import Certification from "./certification.model";
import User from "../user/user.model";
import { ErrorHandler } from "../../helper/error";

const checkResourceOwner = (listOwner, currentUser) => {
  if (!listOwner.includes(currentUser.publicAddress))
    throw new ErrorHandler(
      403,
      "You are not permission access to this resource"
    );
};

// Get Certification
export async function getCertification(req, res, next) {
  try {
    const certification = await Certification.findById(
      req.params.idCertification
    ).lean();
    if (!certification) {
      throw new ErrorHandler(404, "Certification not found");
    }
    return res.status(200).json({ statusCode: 200, data: certification });
  } catch (error) {
    next(error);
  }
}

// Create Certification
export async function createCertification(req, res, next) {
  try {
    const { transactionHash, owners, title, properties, images } = req.body;
    // người chứng nhận
    const notary = req.user._id;
    const newCertification = {
      transactionHash,
      owners,
      notary,
      title,
      properties,
      images,
    };
    const certification = await Certification.create(newCertification);
    // add idCertification for owners
    await User.updateMany(
      { publicAddress: { $in: owners } },
      { $push: { properties: certification._id } }
    ).lean();
    return res.status(201).json({ statusCode: 201, data: certification });
  } catch (error) {
    next(error);
  }
}

// Update Certification
export async function updateCertification(req, res, next) {
  try {
    const newCertification = req.body;
    const certification = await Certification.findById(
      req.params.idCertification
    );
    if (!certification) {
      throw new ErrorHandler(404, "Certification not found");
    }
    //check resource owner
    // checkResourceOwner(Certification.attestor, req.user._id);
    await Certification.findByIdAndUpdate(
      req.params.idCertification,
      newCertification,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ statusCode: 200, message: "Update certification successfully" });
  } catch (error) {
    next(error);
  }
}

// Delete Certification
export async function deleteCertification(req, res, next) {
  try {
    const certification = await Certification.findById(
      req.params.idCertification
    );
    if (!certification) {
      throw new ErrorHandler(404, "Certification not found");
    }
    //check resource owner
    checkResourceOwner(certification.attestor, req.user._id);
    await Certification.findOneAndDelete(req.params.idCertification);
    // or status code 204 without data in the response
    return res
      .status(200)
      .json({ statusCode: 200, message: "Delete certification successfully" });
  } catch (error) {
    next(error);
  }
}

// Activate Certification (Only owners)
export async function activateCertification(req, res, next) {
  try {
    var certification = await Certification.findById(req.params.idCertification)
      .select({ owners: 1, ownersActivated: 1, state: 1 })
      .lean();
    const { publicAddress } = req.user;
    const { owners, ownersActivated } = certification;
    // Check resource owner
    if (!owners.includes(publicAddress)) {
      throw new ErrorHandler(
        403,
        "You are not permission access to this resource"
      );
    }
    // Check if not yet activated
    if (!ownersActivated.includes(publicAddress)) {
      let query = { $push: { ownersActivated: publicAddress } };
      // Check if lastest owner => change state to 1 (Activated)
      if (owners.length - 1 === ownersActivated.length) query["state"] = 1;
      var certification = await Certification.findByIdAndUpdate(
        req.params.idCertification,
        query,
        { new: true }
      )
        .select({ owners: 1, ownersActivated: 1, state: 1 })
        .lean();
    }
    return res.status(200).json({ statusCode: 200, data: certification });
  } catch (error) {
    next(error);
  }
}

// Activate sales (Only owners)
export async function activateSales(req, res, next) {
  try {
    var certification = await Certification.findById(req.params.idCertification)
      .select({ owners: 1, ownersAllowedSale: 1, state: 1 })
      .lean();
    // Only allow selling when the cetificate is activated
    if (certification.state === 0) {
      throw new ErrorHandler(405, "Certification not activated");
    }
    const { publicAddress } = req.user;
    const { owners, ownersAllowedSale } = certification;
    // Check resource owner
    if (!owners.includes(publicAddress)) {
      throw new ErrorHandler(
        403,
        "You are not permission access to this resource"
      );
    }
    // Check if not yet allow selling
    if (!ownersAllowedSale.includes(publicAddress)) {
      const query = { $push: { ownersAllowedSale: publicAddress } };
      if (owners.length - 1 === ownersAllowedSale.length) query["state"] = 2;
      var certification = await Certification.findByIdAndUpdate(
        req.params.idCertification,
        query,
        { new: true }
      )
        .select({ owners: 1, ownersAllowedSale: 1, state: 1 })
        .lean();
    }
    return res.status(200).json({ statusCode: 200, data: certification });
  } catch (error) {
    next(error);
  }
}

//Get all properties activated (include selling)
export async function getAllActivatedCertificates(_req, res, next) {
  try {
    const listActivatedCertificates = await Certification.find({
      state: { $gt: 0 },
    }).lean();
    if (listActivatedCertificates.length === 0)
      throw new ErrorHandler(404, "There are not properties activated");
    return res
      .status(200)
      .json({ status: 200, data: listActivatedCertificates });
  } catch (error) {
    next(error);
  }
}

// Get all properties currently on sale
export async function getAllPropertiesOnSale(_req, res, next) {
  try {
    const listPropertiesSelling = await Certification.find({ state: 2 }).lean();
    if (listPropertiesSelling.length === 0)
      throw new ErrorHandler(404, "There are no properties on sale");
    return res.status(200).json({ status: 200, data: listPropertiesSelling });
  } catch (error) {
    next(error);
  }
}

// Get all properties currently of user
export async function getAllPropertiesOfUser(_req, res, next) {
  try {
    // console.log(_req.user.publicAddress);
    const listPropertiesUser = await Certification.find({
      // owners: "0x300a85b19541Eb9C5c31CA5d203143a742267582"
      owners: _req.user.publicAddress.toString(),
    }).lean();
    console.log(listPropertiesUser);
    if (listPropertiesUser.length === 0)
      throw new ErrorHandler(404, "There are no properties of user");
    return res.status(200).json({ status: 200, data: listPropertiesUser });
  } catch (error) {
    next(error);
  }
}
