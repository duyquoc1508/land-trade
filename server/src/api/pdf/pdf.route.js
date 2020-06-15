import { Router } from "express";
import path from "path";
let ejs = require("ejs");
let pdf = require("html-pdf");

const routes = Router();

routes.post("/down-payment", (req, res) => {
  let data = req.body;
  ejs.renderFile(
    path.join(__dirname, "/template/down-payment-pdf.ejs"),
    data,
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          height: "10in",
          width: "8.5in",
          header: {
            height: "20mm",
          },
          footer: {
            height: "20mm",
          },
        };
        let fileName = `down-payment-${Date.now()}.pdf`;
        pdf
          .create(data, options)
          .toFile(`./src/public/pdf/${fileName}`, function (err, data) {
            if (err) {
              res.send(err);
            } else {
              res.json({
                message: "File created successfully",
                url: `/static/pdf/${fileName}`,
              });
            }
          });
      }
    }
  );
});

routes.post('/trade-contract', (req, res)=>{
  let data = req.body;
  ejs.renderFile(
    path.join(__dirname, "/template/trade-contract-pdf.ejs"),
    data,
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          height: "10in",
          width: "8.5in",
          header: {
            height: "20mm",
          },
          footer: {
            height: "20mm",
          },
        };
        let fileName = `trade-contract-${Date.now()}.pdf`;
        pdf
          .create(data, options)
          .toFile(`./src/public/pdf/${fileName}`, function (err, data) {
            if (err) {
              res.send(err);
            } else {
              res.json({
                message: "File created successfully",
                url: `/static/pdf/${fileName}`,
              });
            }
          });
      }
    }
  );
})

export default routes;
