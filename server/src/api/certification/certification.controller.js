import Certification from "./certification.model";
import User from "../user/user.model";
import { ErrorHandler } from "../../helper/error";
import { NEW_TRANSACTION } from "../../eventListener/transactionListener/SocketEvent";

const checkResourceOwner = (listOwner, currentUser) => {
  if (!listOwner.includes(currentUser.publicAddress))
    throw new ErrorHandler(
      403,
      "You are not permission access to this resource"
    );
};

// Get certificate with TxHash
export async function getCertificationWithTxHash(req, res, next) {
  try {
    const certification = await Certification.findOne({
      transactionHash: req.params.txHash
    })
      // .populate({ path: "owners", select: "fullName" })
      .populate({ path: "notary", select: ["fullName", "idNumber"] })
      .lean();
    if (!certification) {
      throw new ErrorHandler(404, "Certification not found");
    }
    return res.status(200).json({ statusCode: 200, data: certification });
  } catch (error) {
    next(error);
  }
}

// Get certificate with TxHash
export async function getCertificationWithIdInBlockchain(req, res, next) {
  try {
    const certification = await Certification.findOne({
      idInBlockchain: req.params.idInBlockchain
    }).lean();
    if (!certification) {
      throw new ErrorHandler(404, "Certification not found");
    }
    return res.status(200).json({ statusCode: 200, data: certification });
  } catch (error) {
    next(error);
  }
}

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
      images
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

export async function editCertification(req, res, next) {
  try {
    var certification = await Certification.findOne({
      transactionHash: req.params.txHash
    }).lean();
    console.log(req.params.txHash);
    const { publicAddress } = req.user;
    const { owners } = certification;
    // Check resource owner
    if (!owners.includes(publicAddress)) {
      throw new ErrorHandler(
        403,
        "You are not permission access to this resource"
      );
    }
    let {
      description,
      numOfBedrooms,
      numOfBathrooms,
      areaFloor,
      price,
      galleries,
      utilities,
      title
    } = req.body;
    let query = {
      moreInfo: {
        description,
        numOfBedrooms,
        numOfBathrooms,
        areaFloor,
        price,
        galleries,
        utilities,
        title
      }
    };
    const a = await Certification.updateOne(
      { transactionHash: req.params.txHash },
      query,
      { new: true }
    );
    console.log("editCertification -> a", a);
    return res.status(200).json({ statusCode: 200, data: certification });
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
    // // Check if not yet allow selling
    if (!ownersAllowedSale.includes(publicAddress)) {
      const query = { $push: { ownersAllowedSale: publicAddress } };
      if (owners.length - 1 === ownersAllowedSale.length) query["state"] = 2;
      var certification = await Certification.findByIdAndUpdate(
        req.params.idCertification,
        { state: 2 },
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

// Activate sales (Only owners)
export async function cancelSale(req, res, next) {
  try {
    var certification = await Certification.findById(req.params.idCertification)
      .select({ owners: 1, state: 1 })
      .lean();
    // Only allow selling when the cetificate is activated
    if (certification.state === 0) {
      throw new ErrorHandler(405, "Certification not activated");
    }
    const { publicAddress } = req.user;
    const { owners } = certification;
    // Check resource owner
    if (!owners.includes(publicAddress)) {
      throw new ErrorHandler(
        403,
        "You are not permission access to this resource"
      );
    }
    var certification = await Certification.findByIdAndUpdate(
      req.params.idCertification,
      { state: 1, ownersAllowedSale: [] },
      { new: true }
    )
      .select({ owners: 1, state: 1 })
      .lean();
    return res.status(200).json({ statusCode: 200, data: certification });
  } catch (error) {
    next(error);
  }
}

//Get all properties activated (include selling)
export async function getAllActivatedCertificates(_req, res, next) {
  try {
    const listActivatedCertificates = await Certification.find({
      state: { $gt: 0 }
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
export async function getAllPropertiesOnSale(req, res, next) {
  const pageSize = req.query.limit;
  const begin = (req.query.page - 1) * pageSize;
  try {
    const listPropertiesSelling = await Certification.find({ state: 2 })
      .lean()
      .sort({ updatedAt: -1 })
      .limit(pageSize)
      .skip(begin);
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
      owners: _req.user.publicAddress.toString()
    }).lean();
    console.log(listPropertiesUser);
    if (listPropertiesUser.length === 0)
      throw new ErrorHandler(404, "There are no properties of user");
    return res.status(200).json({ status: 200, data: listPropertiesUser });
  } catch (error) {
    next(error);
  }
}

// get owner info of certificate
export async function getOwnersInfoOfCertificate(req, res, next) {
  try {
    const transactionHash = req.params.txHash;
    const certificate = await Certification.findOne({ transactionHash })
      .select("owners -_id")
      .lean();
    let ownersInfo = [];
    if (certificate) {
      const p1 = certificate.owners.map(publicAddress =>
        User.findOne({ publicAddress })
      );
      ownersInfo = await Promise.all(p1);
    }
    return res.status(200).json({ statusCode: 200, data: ownersInfo });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
}

// get all certificate
export async function getAllCertificates(req, res, next) {
  try {
    const certificates = await Certification.find({})
      .sort({ updatedAt: -1 })
      .lean();
    if (!certificates) {
      return ErrorHandler(404, "Certificates not found!");
    }
    return res.status(200).json({ statusCode: 200, data: certificates });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
}
