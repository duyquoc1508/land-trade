// sharp modules was removed

// import sharp from "sharp";
// import uuidv4 from "uuid/v4";
// import path from "path";

// export class Resize {
//   constructor(folder) {
//     this.folder = folder;
//   }

//   async save(buffer) {
//     const filename = Resize.filename();
//     const filepath = this.filepath(filename);
//     await sharp(buffer)
//       .resize(750, null, {
//         fit: sharp.fit.inside,
//         withoutEnlargement: true
//       })
//       .toFile(filepath);
//     return filename;
//   }

//   static filename() {
//     //generate filename with uuid
//     return `${uuidv4().replace(/-/g, "_")}.png`;
//   }

//   filepath(filename) {
//     return path.resolve(`${this.folder}/${filename}`);
//   }
// }
