import React, { Component } from "react";
import MaterialTable from "material-table";
import getWeb3 from "../../helper/getWeb3";
import RoleBasedAclContract from "../../contracts/RoleBasedAcl.json";

export default class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        // { title: "No", field: "tableData.id" },
        {
          title: "Public Address",
          field: "publicAddress",
        },
        {
          title: "Role",
          field: "role",
          lookup: { 0: "Super Admin", 1: "Notary" },
        },
      ],
      data: [],
      web3: null,
      accounts: null,
      contract: null,
    };
    this.role = ["Super Admin", "Notary"];
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RoleBasedAclContract.networks[networkId];
      if (!deployedNetwork) {
        throw new Error("Switch Ether network to http://127.0.0.1:7545");
      }
      const instance = new web3.eth.Contract(
        RoleBasedAclContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      // init event
      instance.events
        .RoleAdded()
        .on("data", (event) => {
          const result = event.returnValues;
          console.log("index -> componentDidMount -> result", result);
          // Use 'setTimeout' to simulate the actual environment (for dev) (3s: transition comfirmed)
          setTimeout(this.fetchData, 5000);
          this.fetchData();
        })
        .on("error", console.error);
      instance.events
        .RoleRemoved()
        .on("data", (event) => {
          const result = event.returnValues;
          console.log("index -> componentDidMount -> result", result);
          // Use 'setTimeout' to simulate the actual environment (for dev) (3s: transition comfirmed)
          setTimeout(this.fetchData, 3000);
          // this.fetchData()
        })
        .on("error", console.error);
      // handle change account in metamask
      window.ethereum.on("accountsChanged", (accounts) => {
        this.setState({ accounts });
      });
      // Set web3, accounts, and contract to the state, and then proceed with an
      this.setState(
        {
          web3,
          accounts,
          contract: instance,
        },
        this.fetchData
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      // alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.log(error);
      console.error(error);
    }
  };

  fetchData = async () => {
    console.log("index -> fetchData -> fetchData");
    const { contract } = this.state;
    try {
      const response = await contract.methods.getAllAddressAndRole().call();
      const listAddressAndRole = response[0].map((item, index) => {
        return {
          // no: index,
          publicAddress: item,
          role: response[1][index],
        };
      });

      this.setState({
        isLoading: false,
        data: listAddressAndRole,
      });
    } catch (error) {
      console.log(error);
    }
  };

  addRole = async (newData) => {
    const { publicAddress, role } = newData;
    const { contract, accounts } = this.state;
    try {
      // add role for address
      const result = contract.methods
        .addRole(publicAddress, role)
        .send({ from: accounts[0] }, (_err, _result) => {
          this.setState({ isLoading: true }); // Use loading effect. Waiting event 'RoleAdded' from the blockchain are emited
        });
      console.log("added");
    } catch (error) {
      alert(error.message);
    }
  };

  removeRole = async (oldData) => {
    const { publicAddress, role } = oldData;
    const { contract, accounts } = this.state;
    try {
      contract.methods
        .removeRole(publicAddress, role)
        .send({ from: accounts[0] }, (_error, _result) => {
          this.setState({ isLoading: true }); // Remove this line if not use loading effect
        });
      console.log("removed");
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="mt-100 container">
        <MaterialTable
          title="Role Based RealEstate"
          columns={this.state.columns}
          options={{
            actionsColumnIndex: -1,
          }}
          data={this.state.data}
          isLoading={this.state.isLoading}
          editable={{
            onRowAdd: (newData) => this.addRole(newData),
            onRowDelete: (oldData) => this.removeRole(oldData),
          }}
        />
      </div>
    );
  }
}
