import Joi from "@hapi/joi";

export const userSchema = {
  create: Joi.object().keys({
    publicAddress: Joi.string()
      .required()
      .pattern(new RegExp("^(0x){1}[0-9a-fA-F]{40}$")),
  }),

  update: Joi.object().keys({
    fullName: Joi.string(),
    email: Joi.string().email(),
    idNumber: Joi.string().alphanum(),
    phoneNumber: Joi.string(),
    avatar: Joi.string(),
    homeLand: Joi.string(),
    birthday: Joi.string(),
    permanentResidence: Joi.string(),
    ethnic: Joi.string(),
    religion: Joi.string(),
    deformity: Joi.string(),
    dateIdNumber: Joi.string(),
    placeIdNumber: Joi.string(),
    imageIdNumber: Joi.array().items(Joi.string())
  }),
};

// /**
//  * Checks if the given string is an address
//  *
//  * @method isAddress
//  * @param {String} address the given HEX adress
//  * @return {Boolean}
//  */
// var isAddress = function(address) {
//   if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
//     // check if it has the basic requirements of an address
//     return false;
//   } else if (
//     /^(0x)?[0-9a-f]{40}$/.test(address) ||
//     /^(0x)?[0-9A-F]{40}$/.test(address)
//   ) {
//     // If it's all small caps or all all caps, return true
//     return true;
//   } else {
//     // Otherwise check each case
//     return isChecksumAddress(address);
//   }
// };

// /**
//  * Checks if the given string is a checksummed address
//  *
//  * @method isChecksumAddress
//  * @param {String} address the given HEX adress
//  * @return {Boolean}
//  */
// var isChecksumAddress = function(address) {
//   // Check each case
//   address = address.replace("0x", "");
//   var addressHash = sha3(address.toLowerCase());
//   for (var i = 0; i < 40; i++) {
//     // the nth letter should be uppercase if the nth digit of casemap is 1
//     if (
//       (parseInt(addressHash[i], 16) > 7 &&
//         address[i].toUpperCase() !== address[i]) ||
//       (parseInt(addressHash[i], 16) <= 7 &&
//         address[i].toLowerCase() !== address[i])
//     ) {
//       return false;
//     }
//   }
//   return true;
// };
