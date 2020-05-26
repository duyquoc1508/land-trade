import React, { Component } from "react";
import { connect } from "react-redux";
import "./overview.css";

export class Overview extends Component {
  render() {
    let { owners, properties, images } = this.props.overview;
    return (
      <div className="row">
        <div className="col-sm-6">
          {images.map((img, index) => (
            <img
              src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${img}`}
              style={{ maxHeight: "100%" }}
              key={index}
            />
          ))}
        </div>
        <div className="col-sm-6">
          <ol>
            <li className="ow-li-lv1">
              1. Chủ sở hữu:
              <ol type="a">
                {owners.map((user, index) => (
                  <li className="ow-li-lv2" key={index}>
                    <span> {user} </span>
                  </li>
                ))}
              </ol>
            </li>

            <li className="ow-li-lv1">
              2. Thửa đất:
              <ol type="a">
                <li className="ow-li-lv2">
                  <span>a) Thửa đất số:</span> {properties.landLot.landLotNo}
                  <span>Tờ bản đồ số:</span> {properties.landLot.mapSheetNo}
                </li>
                <li className="ow-li-lv2">
                  <span>b) Địa chỉ:</span> {properties.landLot.address}
                </li>
                <li className="ow-li-lv2">
                  <span>c) Diện tích chung:</span>{" "}
                  {properties.landLot.commonUseArea} m<sup>2</sup>
                  <span>Diện tích riêng:</span>{" "}
                  {properties.landLot.privateUseArea} m<sup>2</sup>
                </li>
                <li className="ow-li-lv2">
                  <span>d) Mục đích sử dụng:</span>{" "}
                  {properties.landLot.purposeOfUse}
                </li>
                <li className="ow-li-lv2">
                  <span>e) Thời hạn sử dụng:</span>{" "}
                  {properties.landLot.timeOfUse}
                </li>
                <li className="ow-li-lv2">
                  <span>f) Nguồn gốc sử dụng:</span>{" "}
                  {properties.landLot.originOfUse}
                </li>
              </ol>
            </li>
            <li className="ow-li-lv1">
              3. Nhà ở:
              {!properties.house ? (
                " -/-"
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
              {!properties.otherConstruction
                ? " -/-"
                : properties.otherConstruction}
            </li>
            <li className="ow-li-lv1">
              5. Rừng sản xuất là rừng trồng:{" "}
              {!properties.prodForestIsArtificial
                ? " -/-"
                : properties.prodForestIsArtificial}
            </li>
            <li className="ow-li-lv1">
              6. Cây lâu năm:{" "}
              {!properties.perennialTree ? " -/-" : properties.perennialTree}
            </li>
            <li className="ow-li-lv1">
              7. Ghi chú: {!properties.notice ? " -/-" : properties.notice}
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
