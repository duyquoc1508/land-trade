import { Router } from "express";
import request from "request";
const router = Router();

/**
 * Get ethereum exchange rate ETH => VND
 */

router.get("/", (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH&convert=VND&aux=cmc_rank&&CMC_PRO_API_KEY=${process.env.COIN_MARKET_API_KEY}`,
      // header: {
      //   "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_API_KEY,
      // },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const responseData = JSON.parse(body);
        return res
          .status(200)
          .json({ statusCode: 200, data: responseData.data });
      } else {
        const responseData = JSON.parse(body);
        return res
          .status(500)
          .json({ statusCode: 500, error: responseData.status.error_message });
      }
    }
  );
});

export default router;
