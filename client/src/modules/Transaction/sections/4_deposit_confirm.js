import React, { Component } from "react";
import "./contract.css";

class DepositConfirm extends Component {
  render() {
    return (
      <div>
        <div className="page-wrapper">
          <table
            border={0}
            cellSpacing={0}
            cellPadding={0}
            width="100%"
            style={{ margin: "75px auto" }}
          >
            {/* Quốc hiệu */}
            <tbody>
              <tr>
                <td>
                  <table border={0} width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <h6 className="text-center mb-0">
                            CỘNG HÒA XÃ HỘI CHỦ NGHĨ VIỆT NAM
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="text-center">
                            <b>Độc lập - Tự do - Hạnh Phúc</b>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          ---------------------------
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* Tên hợp đồng */}
              <tr>
                <td>
                  <table
                    border={0}
                    cellSpacing={0}
                    cellPadding={0}
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <h4 className="text-center mb-0 mt-10">
                            HỢP ĐỒNG CHUYỂN NHƯỢNG QUYỀN SỬ DỤNG ĐẤT QUYỀN SỞ
                            HỮU NHÀ Ở
                          </h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* thông tin thời gian */}
              <tr>
                <td>
                  <table border={0} width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <div className="mb-20">
                            Hôm nay, ngày{" "}
                            <input
                              type="date"
                              name="currentDate"
                              min="2017-06-01"
                            />{" "}
                            . Tại
                            <input type="text" />, Chúng tôi gồm có:
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* bên A */}
              <tr>
                <td>
                  <table border={0} width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <div className="font-weight-bold mb-20">
                            I. Bên chuyển nhượng(Sau đây gọi là bên A):
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  Ông bà:{" "}
                                  <input
                                    type="text"
                                    name="seller[0].fullname"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Sinh ngày:{" "}
                                  <input
                                    type="date"
                                    name="seller[0].birthday"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Chứng minh nhân dân số:{" "}
                                  <input
                                    type="text"
                                    name="seller[0].idNumber"
                                  />
                                </td>

                                <td>
                                  Cấp ngày:{" "}
                                  <input
                                    type="date"
                                    name="seller[0].dateIdNumber"
                                  />
                                </td>

                                <td>
                                  Nơi cấp:{" "}
                                  <input
                                    type="text"
                                    name="seller[0].placeIdNumber"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Hộ Khẩu thường trú:{" "}
                                  <input type="text" name="seller[0].address" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="font-weight-bold mb-20 mt-20">
                            Các thành viên của hộ gia đình bên A:
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  Ông bà:{" "}
                                  <input
                                    type="text"
                                    name="seller[1].fullname"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Sinh ngày:{" "}
                                  <input
                                    type="date"
                                    name="seller[1].birthday"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Chứng minh nhân dân số:{" "}
                                  <input
                                    type="text"
                                    name="seller[1].idNumber"
                                  />
                                </td>

                                <td>
                                  Cấp ngày:{" "}
                                  <input
                                    type="date"
                                    name="seller[1].dateIdNumber"
                                  />
                                </td>

                                <td>
                                  Nơi cấp:{" "}
                                  <input
                                    type="text"
                                    name="seller[1].placeIdNumber"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Hộ Khẩu thường trú:{" "}
                                  <input type="text" name="seller[1].address" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* bên B */}
              <tr>
                <td>
                  <table border={0} width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <div className="font-weight-bold mb-20 mt-20">
                            II. Bên nhận chuyển nhượng(Sau đây gọi là bên B):
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  Ông bà:{" "}
                                  <input type="text" name="buyer[0].fullname" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Sinh ngày:{" "}
                                  <input type="date" name="buyer[0].birthday" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Chứng minh nhân dân số:{" "}
                                  <input type="text" name="buyer[0].idNumber" />
                                </td>

                                <td>
                                  Cấp ngày:{" "}
                                  <input
                                    type="date"
                                    name="buyer[0].dateIdNumber"
                                  />
                                </td>

                                <td>
                                  Nơi cấp:{" "}
                                  <input
                                    type="text"
                                    name="buyer[0].placeIdNumber"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Hộ Khẩu thường trú:{" "}
                                  <input type="text" name="buyer[0].address" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="font-weight-bold mb-20 mt-20">
                            Các thành viên của hộ gia đình bên B:
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  Ông bà:
                                  <input type="text" name="buyer[1].fullname" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Sinh ngày:{" "}
                                  <input type="date" name="buyer[1].birthday" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Chứng minh nhân dân số:{" "}
                                  <input type="text" name="buyer[1].idNumber" />
                                </td>

                                <td>
                                  Cấp ngày:{" "}
                                  <input
                                    type="date"
                                    name="buyer[1].dateIdNumber"
                                  />
                                </td>

                                <td>
                                  Nơi cấp:{" "}
                                  <input
                                    type="text"
                                    name="buyer[1].placeIdNumber"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Hộ Khẩu thường trú:{" "}
                                  <input type="text" name="buyer[1].address" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* Người làm chứng */}
              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div className="font-weight-bold mb-20 mt-20">
                            III. Cùng làm chứng:
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  Ông bà:{" "}
                                  <input type="text" name="notary.fullname" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Sinh ngày:{" "}
                                  <input type="date" name="notary.birthday" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Chứng minh nhân dân số:{" "}
                                  <input type="text" name="notary.idNumber" />
                                </td>

                                <td>
                                  Cấp ngày:{" "}
                                  <input
                                    type="date"
                                    name="notary.dateIdNumber"
                                  />
                                </td>

                                <td>
                                  Nơi cấp:{" "}
                                  <input
                                    type="text"
                                    name="notary.placeIdNumber"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Hộ Khẩu thường trú:{" "}
                                  <input type="text" name="notary.address" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* điều khoản */}
              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div className="font-italic mb-20 mt-20 text-center">
                            Hai Bên tự nguyện cùng nhau lập và ký Hợp đồng này
                            để thực hiện việc chuyển nhượng quyền sử dụng đất,
                            quyền sở hữu nhà ở theo các thoả thuận sau đây:
                          </div>
                        </td>
                      </tr>
                      {/* điều 1: tài sản đặt cọc */}
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="font-weight-bold mb-20">
                                    ĐIỀU 1:QUYỀN SỬ DỤNG ĐẤT, QUYỀN SỞ HỮU NHÀ Ở
                                    CHUYỂN NHƯỢNG
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  1. Hiện Bên A đang có quyền sử dụng đất, quyền
                                  sở hữu nhà ở tại địa chỉ:{" "}
                                  <input type="text" name="property.address" />{" "}
                                  theo số
                                  <input
                                    type="text"
                                    name="property.certification.xxx"
                                  />{" "}
                                  cấp ngày{" "}
                                  <input
                                    type="date"
                                    name="property.certification.xxx"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="font-italic">
                                  Thông tin cụ thể như sau:
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>Thửa đât</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Thửa đất số{" "}
                                          <input
                                            type="text"
                                            name="property.landLot.landLotNo"
                                          />
                                        </td>
                                        <td>
                                          Tờ bản đồ số{" "}
                                          <input
                                            type="text"
                                            name="property.landLot.mapSheetNo"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Địa chỉ{" "}
                                          <input
                                            type="text"
                                            name="property.landLot.address"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Diện tích{" "}
                                          <input
                                            type="text"
                                            name="property.landLot.area"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Mục đích sử dụng{" "}
                                          <input
                                            type="text"
                                            name="property.landLot.purposeOfUse"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Thời hạn sử dụng{" "}
                                          <input
                                            type="text"
                                            name="property.landLot.timeOfUse"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Nguồn gốc sử dụng{" "}
                                          <input
                                            type="text"
                                            name="property.landLot.purposeOfUse"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>Nhà ở</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Địa chỉ{" "}
                                          <input
                                            type="text"
                                            name="property.house.address"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Diện tích sàn{" "}
                                          <input
                                            type="text"
                                            name="property.house.floorArea"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Cấp hạng nhà ở{" "}
                                          <input
                                            type="text"
                                            name="property.house.level"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Số tầng{" "}
                                          <input
                                            type="text"
                                            name="property.house.numberOfFloor"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          Ghi chú{" "}
                                          <input
                                            type="text"
                                            name="property.notice"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  2. Bằng Hợp đồng này Bên A đồng ý chuyển
                                  nhượng toàn bộ quyền sử dụng đất, quyền sở hữu
                                  nhà ở nói trên cho Bên B và Bên B đồng ý nhận
                                  chuyển nhượng toàn bộ quyền sử dụng đất, quyền
                                  sở hữu nhà ở nói trên như hiện trạng.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      {/* điều 2 */}
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="font-weight-bold mb-20 mt-20">
                                    ĐIỀU 2: GIÁ CHUYỂN NHƯỢNG VÀ PHƯƠNG THỨC
                                    THANH TOÁN
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  1. Giá chuyển nhượng quyền sử dụng đất, quyền
                                  sở hữu nhà ở nêu tại Điều 1 của Hợp đồng này
                                  là:{" "}
                                  <input type="text" name="property.price" />{" "}
                                  VNĐ (Bằng chữ:{" "}
                                  <input type="text" className="" />
                                  ).
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  2. Phương thức thanh toán: (2){" "}
                                  <input type="text" className="" />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Việc thanh toán số tiền nêu tại khoản 1 Điều
                                  này do hai bên tự thực hiện và tự chịu trách
                                  nhiệm trước pháp luật.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      {/* điều 3 */}
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="font-weight-bold mb-20 mt-20">
                                    ĐIỀU 3: VIỆC GIAO VÀ ĐĂNG KÝ QUYỀN SỬ DỤNG
                                    ĐẤT QUYỀN SỞ HỮU NHÀ Ở
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  1. Bên A có nghĩa vụ giao quyền sử dụng đất,
                                  quyền sở hữu nhà ở nêu tại Điều 1 của Hợp đồng
                                  này cùng các giấy tờ về quyền sử dụng đất,
                                  quyền sở hữu nhà ở cho bên B trước khi ký Hợp
                                  đồng.
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  2. Bên B có nghĩa vụ thực hiện đăng ký quyền
                                  sử dụng đất, quyền sở hữu nhà ở tại cơ quan có
                                  thẩm quyền theo quy định của pháp luật.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      {/* điều 4 */}
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="font-weight-bold mb-20 mt-20">
                                    ĐIỀU 4: TRÁCH NHIỆM NỘP THUẾ, LỆ PHÍ
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Thuế, lệ phí liên quan đến việc chuyển nhượng
                                  quyền sử dụng đất, quyền sở hữu nhà ở theo Hợp
                                  đồng này do
                                  <input type="text" name="priceTax" /> chịu
                                  trách nhiệm đóng.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      {/* điều 5 */}
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="font-weight-bold mb-20 mt-20">
                                    ĐIỀU 5: PHƯƠNG THỨC GIẢI QUYẾT TRANH CHẤP
                                    HỢP ĐỒNG
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Trong quá trình thực hiện Hợp đồng này, nếu
                                  phát sinh tranh chấp, các bên cùng nhau thương
                                  lượng giải quyết trên nguyên tắc tôn trọng
                                  quyền lợi của nhau; Trong trường hợp không
                                  giải quyết được thì một trong hai bên có quyền
                                  khởi kiện để yêu cầu toà án có thẩm quyền giải
                                  quyết theo quy định của pháp luật.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      {/* điều 6 */}
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="font-weight-bold mb-20 mt-20">
                                    ĐIỀU 6: CAM ĐOAN CỦA CÁC BÊN
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Hai bên chịu trách nhiệm trước pháp luật về
                                  những lời cam đoan sau đây:
                                </td>
                              </tr>
                              <tr>
                                <td>1. Bên A cam đoan:</td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Những thông tin về nhân thân, về quan hệ
                                      hôn nhân và về quyền sử dụng đất, quyền sở
                                      hữu nhà ở đã nêu trong hợp đồng này là
                                      đúng sự thật;
                                    </li>
                                    <li>
                                      Quyền sử dụng đất, quyền sở hữu nhà ở nói
                                      trên chưa tham gia bất cứ một giao dịch
                                      nào: Không tặng cho, hứa bán, cho thuê,
                                      cho mượn, cầm cố, đặt cọc, thế chấp, góp
                                      vốn;
                                    </li>
                                    <li>
                                      Quyền sử dụng đất, quyền sở hữu nhà ở
                                      không có tranh chấp, được phép chuyển
                                      nhượng theo quy định của pháp luật;
                                    </li>
                                    <li>
                                      Quyền sử dụng đất, quyền sở hữu nhà ở
                                      không bị kê biên để bảo đảm thi hành án;
                                    </li>
                                    <li>
                                      Quyền sử dụng đất, quyền sở hữu nhà ở
                                      không bị quy hoạch hoặc thuộc trường hợp
                                      bị giải phóng mặt bằng.
                                    </li>
                                    <li>
                                      Có trách nhiệm tạo mọi điều kiện cho Bên B
                                      hoàn tất các thủ tục có liên quan đến việc
                                      đăng ký sang tên quyền sử dụng đất, quyền
                                      sở hữu nhà ở tại cơ quan Nhà nước có thẩm
                                      quyền.
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>2. Bên B cam đoan:</td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Những thông tin về nhân thân, về quan hệ
                                      hôn nhân mà Bên B cung cấp ghi trong hợp
                                      đồng là đúng sự thật;
                                    </li>
                                    <li>
                                      Bên B tự chịu trách nhiệm về việc tìm hiểu
                                      thông tin, đồng thời đã xem xét rất kỹ,
                                      biết rõ về thửa đất và nhà ở nêu tại Điều
                                      1 của Hợp đồng này cùng các giấy tờ về
                                      quyền sử dụng đất và quyền sở hữu nhà ở
                                      nêu trên;
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td>3. Hai bên cam đoan:</td>
                              </tr>
                              <tr>
                                <td>
                                  <ul>
                                    <li>
                                      Đảm bảo tính chính xác, trung thực và hoàn
                                      toàn chịu trách nhiệm trước pháp luật nếu
                                      có sự giả mạo về hồ sơ, giấy tờ cung cấp
                                      cũng như các hành vi gian lận hay vi phạm
                                      pháp luật khác liên quan tới việc ký kết
                                      hợp đồng này;
                                    </li>
                                    <li>
                                      Việc giao kết Hợp đồng này hoàn toàn tự
                                      nguyện, không bị lừa dối, không bị ép
                                      buộc;
                                    </li>
                                    <li>
                                      Thực hiện đúng và đầy đủ các thoả thuận đã
                                      ghi trong Hợp đồng này;
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      {/* điều 7 */}
                      <tr>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="font-weight-bold mb-20 mt-20">
                                    ĐIỀU 7: ĐIỀU KHOẢN CUỐI CÙNG
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Bản Hợp đồng này có hiệu lực ngay sau khi hai
                                  Bên ký kết. Việc sửa đổi, bổ sung hoặc huỷ bỏ
                                  Hợp đồng này chỉ có giá trị khi được hai Bên
                                  lập thành văn bản và chỉ được thực hiện khi
                                  Bên B chưa đăng ký sang tên quyền sử dụng đất
                                  và quyền sở hữu nhà ở theo Hợp đồng này.
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Hai bên đã tự đọc nguyên văn, đầy đủ các trang
                                  của bản Hợp đồng này và không yêu cầu chỉnh
                                  sửa, thêm, bớt bất cứ thông tin gì trong bản
                                  hợp đồng này. Đồng thời hiểu rõ quyền, nghĩa
                                  vụ, lợi ích hợp pháp của mình và hậu quả pháp
                                  lý của việc giao kết Hợp đồng này.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* chữ ký */}
              <tr>
                <td>
                  <table border={0} width="100%">
                    <tbody>
                      <tr>
                        <td style={{ width: "50%", textAlign: "center" }}>
                          <table border={0} width="100%">
                            <tbody>
                              <tr>
                                <td className="text-center">
                                  Bên chuyển nhượng (Bên A)
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  (Ký, ghi rõ họ tên)
                                </td>
                              </tr>
                              <tr>
                                <td height={90} />
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td style={{ width: "50%", textAlign: "center" }}>
                          <table border={0} width="100%">
                            <tbody>
                              <tr>
                                <td className="text-center">
                                  {" "}
                                  Bên nhận chuyển nhượng (Bên B)
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  (Ký, ghi rõ họ tên)
                                </td>
                              </tr>
                              <tr>
                                <td height={90} />
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DepositConfirm;
