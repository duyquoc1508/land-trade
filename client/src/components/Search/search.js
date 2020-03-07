import axios from "axios";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class Asynchronous extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      options: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    // setOpen(true);
    this.setState({ open: true });
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL_API}/users/search?q=${e.target.value}`
    );
    const owners = await response.data.data;
    this.setState({ options: owners.map(owner => owner.publicAddress) });
  }

  render() {
    return (
      <Autocomplete
        style={{ width: 600 }}
        open={this.state.open}
        onClose={() => {
          this.setState({ open: false });
        }}
        options={this.state.options}
        onInputChange={this.handleChange}
        renderInput={params => (
          <TextField {...params} label="Asynchronous" variant="outlined" />
          // <Field {...params} />
        )}
      />
    );
  }
}

export default Asynchronous;
