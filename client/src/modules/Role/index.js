import React, { Component } from "react";
import MaterialTable from "material-table";
import getWeb3 from "../../helper/getWeb3";
import RoleBasedAclContract from "../../contracts/RoleBasedAcl.json";
import { addRoleRequest, removeRoleRequest, roleChanged } from "./action";
import { connect } from "react-redux";

class Role extends Component {
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
          title: "Quyền",
          field: "role",
          lookup: { 0: "Quản trị viên", 1: "Công chứng viên" },
        },
      ],
      data: [],
      web3: null,
      accounts: null,
      contract: null,
      _isLoading: false,
    };
    this.role = ["Super Admin", "Notary"];
  }
  componentDidMount = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "Super Admin") {
      window.location.href = process.env.REACT_APP_BASE_URL;
    }
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      // const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RoleBasedAclContract.networks[networkId];
      if (!deployedNetwork) {
        alert(
          `Sai mạng blockchain.\nVui lòng chuyển sang mạng ${process.env.REACT_APP_WEB3_PROVIDER}`
        );
        throw new Error(
          `Switch blockchain network to ${process.env.REACT_APP_WEB3_PROVIDER}`
        );
      }
      const instance = new web3.eth.Contract(
        RoleBasedAclContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      // listen event direct from blockchain
      // instance.events
      //   .RoleAdded()
      //   .on("data", (event) => {
      //     const result = event.returnValues;
      //     console.log("index -> componentDidMount -> result", result);
      //     this.fetchData();
      //   })
      //   .on("error", console.error);
      // instance.events
      //   .RoleRemoved()
      //   .on("data", (event) => {
      //     const result = event.returnValues;
      //     console.log("index -> componentDidMount -> result", result);
      //     this.fetchData();
      //   })
      //   .on("error", console.error);
      // handle change account in metamask
      window.ethereum.on("accountsChanged", (accounts) => {
        this.setState({ accounts });
      });
      // Set web3, accounts, and contract to the state, and then proceed with an
      this.setState(
        {
          web3,
          // accounts,
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

  componentDidUpdate(preProps, preState) {
    if (this.props.socket && this.props.socket !== preProps.socket) {
      this.props.socket.on("role_changed", (data) => {
        this.props.roleChangedSuccess();
        //setTimeout for dev
        setTimeout(() => {
          this.fetchData();
        }, 500);
      });
    }
    if (this.props.loading != preState._isLoading) {
      this.setState({ _isLoading: this.props.loading });
    }
  }

  fetchData = async () => {
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
        _isLoading: false,
        data: listAddressAndRole,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // addRole = async (newData) => {
  //   const { publicAddress, role } = newData;
  //   const { contract, accounts } = this.state;
  //   try {
  //     this.setState({ _isLoading: true });
  //     // add role for address
  //     contract.methods
  //       .addRole(publicAddress, role)
  //       .send({ from: accounts[0] }, (error, _transactionHash) => {
  //         if (error) {
  //           this.setState({ _isLoading: false });
  //         }
  //       });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // removeRole = async (oldData) => {
  //   const { publicAddress, role } = oldData;
  //   const { contract, accounts } = this.state;
  //   try {
  //     this.setState({ _isLoading: true });
  //     contract.methods
  //       .removeRole(publicAddress, role)
  //       .send({ from: accounts[0] }, (error, _transactionHash) => {
  //         if (error) {
  //           this.setState({ _isLoading: false }); // Remove this line if not use loading effect
  //         }
  //       });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  render() {
    if (!this.state.web3) {
      return (
        <div className="mt-75  text-center">
          <p>Sai mạng blockchain</p> Vui lòng chuyển sang mạng{" "}
          {process.env.REACT_APP_WEB3_PROVIDER}
        </div>
      );
    }
    return (
      <div className="mt-100 container ">
        <MaterialTable
          isLoading={this.state._isLoading}
          title="Phân quyền người dùng"
          columns={this.state.columns}
          options={{
            actionsColumnIndex: -1,
          }}
          data={this.state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                // setTimeout(() => {
                this.props.addRoleRequest(newData);
                resolve();
                // }, 0);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                // setTimeout(() => {
                this.props.removeRoleRequest(oldData);
                resolve();
                // }, 0);
              }),
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.role.loading,
  socket: state.header.socket,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addRoleRequest: (data) => {
      dispatch(addRoleRequest(data));
    },
    removeRoleRequest: (data) => {
      dispatch(removeRoleRequest(data));
    },
    roleChangedSuccess: () => {
      dispatch(roleChanged());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
