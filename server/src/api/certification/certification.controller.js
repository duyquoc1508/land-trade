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
    const { owners, title, properties } = req.body;
    // người chứng nhận
    const attestor = req.user._id;
    const newCertification = {
      owners,
      attestor,
      title,
      properties
    };
    const certification = await Certification.create(newCertification);
    // console.log("TCL: createCertification -> Certification", Certification);
    // const user = await User.update(
    //   { publicAddress:{ $in: owners }},
    //   { $push: { properties: Certification._id } }
    // );
    // console.log("TCL: createCertification -> user", user);
    // const [Certification, user] = Promise.all([Certification.create(newCertification), User.fi])
    // Update properties for user
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
        new: true
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
