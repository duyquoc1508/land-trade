import React, { Component } from "react";

export default class NotFound extends Component {
  render() {
    return (
      <div className="container mt-75">
        <div className="row">
          <div className="col-md-6 offset-md-3  error-text text-center">
            <div className="error-content">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/images/others/404.png`}
                alt="404 not found"
              />
              <h4>Ohh! Page Not Found</h4>
              <p>
                Perhaps searching can help or go back to{" "}
                <a href={`${process.env.REACT_APP_BASE_URL}`}>Homepage</a>{" "}
              </p>
            </div>
            <div className="error-search-container">
              <form>
                <input type="text" placeholder="Search.." name="search" />
                <button type="submit">
                  <i className="lnr lnr-magnifier"></i>
                </button>
              </form>
            </div>
            <br />
            <small>
              <a
                className="text-grey"
                href="https://www.freepik.com/free-photos-vectors/business"
              >
                * Business vector created by pikisuperstar - www.freepik.com
              </a>
            </small>
          </div>
        </div>
      </div>
    );
  }
}
