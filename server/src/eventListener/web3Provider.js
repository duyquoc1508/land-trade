import Web3 from "web3";
// using websocket provider if want to listen event from blockchain
const providers = new Web3.providers.WebsocketProvider(
  process.env.WEBSOCKET_PROVIDER
);

const web3 = new Web3(providers);
// check connection to blockchain
web3.eth.net
  .isListening()
  .then(() =>
    console.log(`--
Connected to provider`)
  )
  .catch(e =>
    console.log(`--
Can't connect to provider: ${process.env.WEBSOCKET_PROVIDER}`)
  );

export default web3;
