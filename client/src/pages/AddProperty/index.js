import React, { Component } from "react";

class AddProperty extends Component {
  render() {
    return (
      <div className="">
        <div className="breadcrumb-section bg-h">
          <div className="overlay op-5"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2 text-center">
                <div className="breadcrumb-menu">
                  <h2>Add Property</h2>
                  <span>
                    <a href="home-v1.html">Home</a>
                  </span>
                  <span>Add Property</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="list-details-section section-padding add_list pt-100">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <ul className="nav nav-tabs list-details-tab">
                  <li className="nav-item active">
                    <a data-toggle="tab" href="#general_info">
                      General Information
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a data-toggle="tab" href="#gallery">
                      Gallery
                    </a>
                  </li>
                  <li className="nav-item">
                    <a data-toggle="tab" href="#pp_details">
                      Property Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a data-toggle="tab" href="#f_plan">
                      Floor Plans
                    </a>
                  </li>
                  <li className="nav-item">
                    <a data-toggle="tab" href="#social_network">
                      Social Networks <span className="text-grey"></span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content my-30 add_list_content">
                  <div className="tab-pane fade show active" id="general_info">
                    <h4>
                      {" "}
                      <i className="lnr lnr-question-circle"></i> General
                      Information :
                    </h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Property Title</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="Sea View Apartment"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="Address of your property"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Neighborhood </label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="Andersonville"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label>Select Country</label>
                        <select className="listing-input hero__form-input  custom-select">
                          <option>USA</option>
                          <option>UK</option>
                          <option>Australia</option>
                          <option>Sweden</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label>Select State/County</label>
                        <select className="listing-input hero__form-input  custom-select">
                          <option>New York</option>
                          <option>Florida</option>
                          <option>Las Vegas</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label>Select City</label>
                        <select className="listing-input hero__form-input  custom-select">
                          <option>New York</option>
                          <option>Florida</option>
                          <option>Las Vegas</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Zip/Postal Code</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="4000"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label>Select Property Type</label>
                        <select className="listing-input hero__form-input  custom-select">
                          <option>Commercial</option>
                          <option>Residential</option>
                          <option>Condominium</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label>Select Property Status</label>
                        <select className="listing-input hero__form-input  custom-select">
                          <option>For Sale</option>
                          <option>For Rent</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Property Price</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="$1500"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <form>
                          <div className="form-group">
                            <label for="list_info">Description</label>
                            <textarea
                              className="form-control"
                              id="list_info"
                              rows="4"
                              placeholder="Enter your text here"
                            ></textarea>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="gallery">
                    <h4>
                      <i className="lnr lnr-picture"></i> Gallery :
                    </h4>
                    <div className="row">
                      <div className="col-md-12 mb-5">
                        <div className="form-group">
                          <form className="photo-upload">
                            <div className="form-group">
                              <div className="add-listing__input-file-box">
                                <input
                                  className="add-listing__input-file"
                                  type="file"
                                  name="file"
                                />
                                <div className="add-listing__input-file-wrap">
                                  <i className="lnr lnr-cloud-upload"></i>
                                  <p>Click here to upload your images</p>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="add-btn">
                          <a href="#" className="btn v3">
                            Add Images
                          </a>
                        </div>
                      </div>
                      <div className="col-md-12 mt-30">
                        <label>Property Video Link</label>
                        <input
                          type="text"
                          className="form-control filter-input"
                          placeholder="https://www.youtube.com/watch?v=dqD0SqMNtks"
                        />
                        <div className="add-btn">
                          <a href="#" className="btn v3 mt-30">
                            Add Video
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="f_plan">
                    <h4>
                      <i className="lnr lnr-map"></i>Floor Plans :
                    </h4>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Select Floor</label>
                        <select className="listing-input hero__form-input  custom-select">
                          <option>First Floor</option>
                          <option>Second Floor</option>
                          <option>Third Floor</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Total Size in Sq Ft</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="1240"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Size of Rooms in Sq Ft</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="144"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Size of Bath in Sq Ft</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="48"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Price</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="$1240"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <form className="photo-upload">
                            <div className="form-group">
                              <div className="add-listing__input-file-box">
                                <input
                                  className="add-listing__input-file"
                                  type="file"
                                  name="file"
                                  id="img_file"
                                />
                                <div className="add-listing__input-file-wrap">
                                  <i className="lnr lnr-cloud-upload"></i>
                                  <p>Click here to upload your images</p>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="pp_details">
                    <h4>
                      <i className="lnr lnr-home"></i>Property Details :
                    </h4>
                    <div className="row mb-30">
                      <div className="col-md-4">
                        <label>Property ID</label>
                        <input
                          type="text"
                          className="form-control filter-input"
                          placeholder="ZOAC25"
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Number of Bedrooms</label>
                          <div
                            className="nice-select filter-input"
                            tabindex="0"
                          >
                            <span className="current">7</span>
                            <ul className="list">
                              <li className="option selected focus">7</li>
                              <li className="option">7</li>
                              <li className="option">6</li>
                              <li className="option">5</li>
                              <li className="option">4</li>
                              <li className="option">3</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Number of Rooms</label>
                          <div
                            className="nice-select filter-input"
                            tabindex="0"
                          >
                            <span className="current">7</span>
                            <ul className="list">
                              <li className="option selected focus">7</li>
                              <li className="option">7</li>
                              <li className="option">6</li>
                              <li className="option">5</li>
                              <li className="option">4</li>
                              <li className="option">3</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Number of Bath</label>
                          <div
                            className="nice-select filter-input"
                            tabindex="0"
                          >
                            <span className="current">7</span>
                            <ul className="list">
                              <li className="option selected focus">7</li>
                              <li className="option">7</li>
                              <li className="option">6</li>
                              <li className="option">5</li>
                              <li className="option">4</li>
                              <li className="option">3</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Number of Garages</label>
                          <div
                            className="nice-select filter-input"
                            tabindex="0"
                          >
                            <span className="current">7</span>
                            <ul className="list">
                              <li className="option selected focus">7</li>
                              <li className="option">7</li>
                              <li className="option">6</li>
                              <li className="option">5</li>
                              <li className="option">4</li>
                              <li className="option">3</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label>22-08-2019</label>
                        <div
                          id="datepicker-from"
                          className="input-group date"
                          data-date-format="dd-mm-yyyy"
                        >
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Check In"
                          />
                          <span className="input-group-addon">
                            <i className="lnr lnr-calendar-full"></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Amenities</label>
                          <div className="filter-checkbox">
                            <input id="check-a" type="checkbox" name="check" />
                            <label for="check-a">Basketball court</label>
                            <input id="check-b" type="checkbox" name="check" />
                            <label for="check-b">Gym</label>
                            <input id="check-c" type="checkbox" name="check" />
                            <label for="check-c">washer and dryer </label>
                            <input id="check-d" type="checkbox" name="check" />
                            <label for="check-d">Wheelchair Friendly</label>
                            <input id="check-f" type="checkbox" name="check" />
                            <label for="check-f">Laundry</label>
                            <input id="check-e" type="checkbox" name="check" />
                            <label for="check-e">Air Conditioned</label>
                            <input id="check-z" type="checkbox" name="check" />
                            <label for="check-z">Swimming Pool</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <form className="photo-upload">
                            <div className="form-group">
                              <label>Property Documents</label>
                              <div className="add-listing__input-file-box">
                                <input
                                  className="add-listing__input-file"
                                  type="file"
                                  name="file"
                                  id="file"
                                />
                                <div className="add-listing__input-file-wrap">
                                  <i className="lnr lnr-cloud-upload"></i>
                                  <p>Click here to upload Property Documents</p>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="add-btn">
                          <a href="#" className="btn v3">
                            Upload Document
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="social_network">
                    <h4>
                      <i className="fas fa-share-alt-square"></i>Social
                      Networks:
                    </h4>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Facebook link (Optional)</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="Facebook url"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Pinterest (Optional)</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="Pinterest url"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Twitter link (Optional)</label>
                          <input
                            type="text"
                            className="form-control filter-input"
                            placeholder="Twitter url"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 text-left">
                        <div className="res-box mt-10">
                          <input
                            type="checkbox"
                            tabindex="3"
                            className=""
                            name="remember"
                            id="remember"
                          />
                          <label for="remember">
                            I've read and accept{" "}
                            <a href="terms.html">terms &amp; conditions</a>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 text-right sm-left">
                        <button className="btn v3" type="submit">
                          Preview
                        </button>
                        <button className="btn v3" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProperty;
