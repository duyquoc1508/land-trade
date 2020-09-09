import React, { Component } from "react";
import { connect } from "react-redux";
import "./overview.css";
import axios from "axios";

export class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [], // map public address to profile
    };
  }

  componentDidMount() {
    (async () => {
      const p1 = this.props.overview.owners.map((publicAddress) =>
        axios.get(
          `${process.env.REACT_APP_BASE_URL_API}/users/${publicAddress}`
        )
      );
      const ps1 = await Promise.all(p1);
      const ownersInfo = ps1.map((item) => item.data.data);
      this.setState({ owners: ownersInfo }); // map publicAddress to user profile
    })();
  }

  render() {
    console.log(this.state.owners);
    const { properties, images } = this.props.overview;
    return (
      <div className="row mt-20">
        <div className="col-sm-6">
          <h5>Sơ đồ thửa đất</h5>
          <div className="card">
            <div className="card-body">
              {images.map((img, index) => (
                <img
                  alt=""
                  src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${img}`}
                  style={{ maxHeight: "100%" }}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <h5>Thông tin tài sản</h5>
          <ol>
            <li className="ow-li-lv1">
              1. Chủ sở hữu:
              <ol type="a">
                {this.state.owners.map((user, index) => (
                  <li className="ow-li-lv2" key={index}>
                    <span>Ông (Bà):</span>&nbsp;
                    <span className="ml-0"> {user.fullName} </span>
                    <span>Số CMND:</span> {user.idNumber}
                  </li>
                ))}
              </ol>
            </li>

            <li className="ow-li-lv1">
              2. Thửa đất:
              <ol type="a">
                <li className="ow-li-lv2">
                  <span>a) Thửa đất số:</span>{" "}
                  {properties.landLot.landLotNo || "-/-"}
                  <span>Tờ bản đồ số:</span>{" "}
                  {properties.landLot.mapSheetNo || "-/-"}
                </li>
                <li className="ow-li-lv2">
                  <span>b) Địa chỉ:</span> {properties.landLot.address}
                </li>
                <li className="ow-li-lv2">
                  <span>c) Diện tích chung:</span>{" "}
                  {properties.landLot.commonUseArea || 0} m<sup>2</sup>
                  <span>Diện tích riêng:</span>{" "}
                  {properties.landLot.privateUseArea || 0} m<sup>2</sup>
                </li>
                <li className="ow-li-lv2">
                  <span>d) Mục đích sử dụng:</span>{" "}
                  {properties.landLot.purposeOfUse || "-/-"}
                </li>
                <li className="ow-li-lv2">
                  <span>e) Thời hạn sử dụng:</span>{" "}
                  {properties.landLot.timeOfUse || "-/-"}
                </li>
                <li className="ow-li-lv2">
                  <span>f) Nguồn gốc sử dụng:</span>{" "}
                  {properties.landLot.originOfUse || "-/-"}
                </li>
              </ol>
            </li>
            <li className="ow-li-lv1">
              3. Nhà ở:
              {!properties.house ? (
                <p>-/-</p>
              ) : (
                <ol type="a">
                  <li className="ow-li-lv2">
                    <span>a) Loại nhà ở:</span> {properties.house.houseType}
                  </li>
                  <li className="ow-li-lv2">
                    <span>b) Địa chỉ:</span> {properties.house.address}
                  </li>
                  <li className="ow-li-lv2">
                    <span>c) Diện tích xây dựng:</span>{" "}
                    {properties.house.constructionArea}
                  </li>
                  <li className="ow-li-lv2">
                    <span>d) Diện tích sàn:</span> {properties.house.floorArea}
                  </li>
                  <li className="ow-li-lv2">
                    <span>e) Cấp (Hạng):</span> {properties.house.level}
                  </li>
                  <li className="ow-li-lv2">
                    <span>f) Hình thức sở hữu:</span>{" "}
                    {properties.house.formOfOwn}
                  </li>
                  <li className="ow-li-lv2">
                    <span>g) Thời gian sử dụng:</span>{" "}
                    {properties.house.timeOfOwn}
                  </li>
                </ol>
              )}
            </li>
            <li className="ow-li-lv1">
              4. Công trình xây dựng khác:{" "}
              <p>
                {" "}
                {!properties.otherConstruction
                  ? " -/-"
                  : properties.otherConstruction}
              </p>
            </li>
            <li className="ow-li-lv1">
              5. Rừng sản xuất là rừng trồng:{" "}
              <p>
                {!properties.prodForestIsArtificial
                  ? " -/-"
                  : properties.prodForestIsArtificial}
              </p>
            </li>
            <li className="ow-li-lv1">
              6. Cây lâu năm:{" "}
              <p>
                {!properties.perennialTree ? " -/-" : properties.perennialTree}
              </p>
            </li>
            <li className="ow-li-lv1">
              7. Ghi chú:{" "}
              <p>{!properties.notice ? " -/-" : properties.notice}</p>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  overview: state.addProperty.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
