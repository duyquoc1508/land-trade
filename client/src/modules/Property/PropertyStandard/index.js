import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./index.css";
import { fetchSinglePropertyRequest } from "./actions";
import NotFound from "../../NotFound";
import axios from "axios";

function PropertyStandard({ match, history, data, fetchSingleProperty }) {
  console.log("PropertyStandard -> history", history);
  const idProperty = match.params.hash;
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/certification/owners/${idProperty}`
      );
      console.log(response.data.data);
      setOwners(response.data.data);
    })();
    fetchSingleProperty(idProperty);
  }, []);

  if (!data) {
    return "";
  } else {
    const { properties, images } = data;
    return (
      <div className="mt-85 container">
        <div className="row">
          <div className="col-sm-6">
            <h5>Thông tin tài sản</h5>
            <ol>
              <li className="ow-li-lv1">
                1. Chủ sở hữu:
                <ol type="a">
                  {owners.map((owner, index) => (
                    <li className="ow-li-lv2" key={index}>
                      <span>Ông (Bà): </span>
                      <span className="ml-0"> {owner.fullName} </span>
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
                      {properties.house.constructionArea} m<sup>2</sup>
                    </li>
                    <li className="ow-li-lv2">
                      <span>d) Diện tích sàn:</span>{" "}
                      {properties.house.floorArea} m<sup>2</sup>
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
                  {!properties.perennialTree
                    ? " -/-"
                    : properties.perennialTree}
                </p>
              </li>
              <li className="ow-li-lv1">
                7. Ghi chú:{" "}
                <p>{!properties.notice ? " -/-" : properties.notice}</p>
              </li>
            </ol>
          </div>
          <div className="col-sm-6">
            <h5>Sơ đồ tài sản</h5>
            {images.map((img, index) => (
              <img
                src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${img}`}
                style={{ maxHeight: "100%" }}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.propertyStandard.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProperty: (txHash) => {
      dispatch(fetchSinglePropertyRequest(txHash));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyStandard);
