import React from "react";

function DownPaymentContract() {
  return (
    <div className="page-wrapper">
      <table
        border={0}
        cellSpacing="true"
        cellPadding="true"
        width={800}
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
                    <td className="text-center">---------------------------</td>
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
                cellSpacing="true"
                cellPadding="true"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <h3 className="text-center mb-0 mt-10">
                        HỢP ĐỒNG ĐẶT CỌC
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="font-italic text-center mb-10">
                        (V/v Mua bán nhà, đất)
                      </p>
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
                        Hôm nay, ngày <input type="text" /> tháng
                        <input type="text" /> năm <input type="text" />. Tại
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
                        I. Bên đặt cọc(Sau đây gọi là bên A):
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>Ông bà:</td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                          <tr>
                            <td>Sinh ngày:</td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                          <tr>
                            <td>Chứng minh nhân dân số</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                            <td>Cấp ngày</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                            <td>Nơi cấp</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                          </tr>
                          <tr>
                            <td>Hộ Khẩu thường trú</td>
                            <td>
                              <input type="text" className="" />
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
                        II. Bên nhận đặt cọc(Sau đây gọi là bên B):
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>Ông bà:</td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                          <tr>
                            <td>Sinh ngày:</td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                          <tr>
                            <td>Chứng minh nhân dân số</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                            <td>Cấp ngày</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                            <td>Nơi cấp</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                          </tr>
                          <tr>
                            <td>Hộ Khẩu thường trú</td>
                            <td>
                              <input type="text" className="" />
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
                            <td>Ông bà:</td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                          <tr>
                            <td>Sinh ngày:</td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                          <tr>
                            <td>Chứng minh nhân dân số</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                            <td>Cấp ngày</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                            <td>Nơi cấp</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                          </tr>
                          <tr>
                            <td>Hộ Khẩu thường trú</td>
                            <td>
                              <input type="text" className="" />
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
                            <td>Ông bà:</td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                          <tr>
                            <td>Sinh ngày:</td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                          <tr>
                            <td>Chứng minh nhân dân số</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                            <td>Cấp ngày</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                            <td>Nơi cấp</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                          </tr>
                          <tr>
                            <td>Hộ Khẩu thường trú</td>
                            <td>
                              <input type="text" className="" />
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
                      <div className="font-weight-bold mb-20 mt-20">
                        IV. Hai bên đồng ý thực hiện ký kết Hợp đồng đặt cọc với
                        các thỏa thuận sau đây:
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
                                ĐIỀU 1:TÀI SẢN ĐẶT CỌC
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Bên A đặt cọc cho bên B bằng tiền mặt với số tiền
                              là
                            </td>
                            <td>
                              <input type="text" className="" />
                            </td>
                          </tr>
                          <tr>
                            <td>Bằng chữ</td>
                            <td>
                              <input type="text" className="" />
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
                                ĐIỀU 2: THỜI HẠN ĐẶT CỌC
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Thời hạn đặt cọc là</td>
                            <td>
                              <input type="text" className="" />
                            </td>
                          </tr>
                          <tr>
                            <td>Tính từ ngày</td>
                            <td>
                              <input type="time" className="" />
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
                                ĐIỀU 3: MỤC ĐÍCH ĐẶT CỌC
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              1. Bằng việc đặt cọc này Bên A cam kết mua đất của
                              bên B tại <input type="text" className="" /> Bên B
                              nhận tiền đặt cọc và cam kết sẽ bán đất thuộc sở
                              hữu hợp pháp và không có bất kỳ tranh chấp nào
                              liên quan đến mảnh đất mà bên B giao bán cho bên A
                              tại :<input type="text" className="" />. với diện
                              tích là
                              <input type="text" className="" /> .m2 giá bán là
                              <input type="text" className="" />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              2. Trong thời gian đặt cọc, bên B cam kết sẽ làm
                              các thủ tục pháp lý để chuyển nhượng quyền sử dụng
                              đất cho bên A, bên A cam kết sẽ trả
                              <input type="text" className="" />
                              khi hai bên ký hợp đồng mua bán đất tại phòng công
                              chứng Nhà Nước, ……………………. ….
                              <input type="text" className="" />. sẽ được bên A
                              thanh toán nốt khi bên B giao giấy chứng nhận
                              quyền sử dụng đất. Bên B cam kết sẽ giao giấy
                              chứng nhận quyền sử dụng đất trong vòng 7 ngày kể
                              từ ngày bên A và bên B ký hợp đồng mua bán tại
                              phòng công chứng Nhà Nước. Bên B có nghĩa vụ nộp
                              các khoản thuế phát sinh trong quá trình giao dịch
                              theo đúng quy định của pháp luật (đối với thuế
                              đất, thuế chuyển nhượng bên B sẽ là người thanh
                              toán mà bên A không phải trả bất cứ khoản phí nào)
                              .
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
                                ĐIỀU 4: NGHĨA VỤ VÀ QUYỀN CỦA BÊN A
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1. Bên A có các nghĩa vụ sau đây:</td>
                          </tr>
                          <tr>
                            <td>
                              a) Giao số tiền đặt cọc cho Bên B theo đúng thỏa
                              thuận ngay khi ký hợp đồng đặt cọc;
                            </td>
                          </tr>
                          <tr>
                            <td>
                              b) Giao kết hoặc thực hiện nghĩa vụ dân sự đã thỏa
                              thuận tại Điều 3 nêu trên. Nếu Bên A từ chối giao
                              kết hoặc thực hiện nghĩa vụ dân sự (mục đích đặt
                              cọc không đạt được) thì Bên A bị mất số tiền đặt
                              cọc;
                            </td>
                          </tr>
                          <tr>
                            <td>2. Bên A có các quyền sau đây:</td>
                          </tr>
                          <tr>
                            <td>
                              a) Nhận lại số tiền đặt cọc từ Bên B hoặc được trừ
                              khi thực hiện nghĩa vụ trả tiền cho Bên B trong
                              trường hợp 2 Bên giao kết hoặc thực hiện nghĩa vụ
                              dân sự đã thỏa thuận tại điều 3(mục đích đặt cọc
                              đạt được);
                            </td>
                          </tr>
                          <tr>
                            <td>
                              b) Nhận lại số tiền đặt cọc và một khoản tiền bằng
                              số tiền đặt cọc trong trường hợp Bên B từ chối
                              việc giao kết hoặc thực hiện nghĩa vụ dân sự đã
                              thỏa thuận tại điều 3(mục đích đặt cọc không đạt
                              được);
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
                                ĐIỀU 5: NGHĨA VỤ VÀ QUYỀN CỦA BÊN B
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>1. Bên B có các nghĩa vụ sau đây:</td>
                          </tr>
                          <tr>
                            <td>
                              a) Trả lại số tiền đặt cọc cho Bên A hoặc trừ để
                              thực hiện nghĩa vụ trả tiền trong trường hợp 2 Bên
                              giao kết hoặc thực hiện nghĩa vụ dân sự đã thỏa
                              thuận tại điều 3 (mục đích đặt cọc đạt được);
                            </td>
                          </tr>
                          <tr>
                            <td>
                              b) Trả lại số tiền đặt cọc và một khoản tiền bằng
                              số tiền đặt cọc cho Bên A trong trường hợp Bên B
                              từ chối việc giao kết hoặc thực hiện nghĩa vụ dân
                              sự đã thỏa thuận tại điều 3(mục đích đặt cọc không
                              đạt được);
                            </td>
                          </tr>
                          <tr>
                            <td>
                              c) Bên B có nghĩa vụ dọn dẹp sạch sẽ mặt bằng khi
                              giao đất để trả lại mặt bằng đất thổ cư cho bên A.
                            </td>
                          </tr>
                          <tr>
                            <td>2. Bên B có các quyền sau đây:</td>
                          </tr>
                          <tr>
                            <td>
                              Sở hữu số tiền đặt cọc nếu Bên A từ chối giao kết
                              hoặc thực hiện nghĩa vụ dân sự đã thỏa thuận tại
                              điều 3(mục đích đặt cọc không đạt được).
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
                                ĐIỀU 6: PHƯƠNG THỨC GIẢI QUYẾT TRANH CHẤP
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Trong quá trình thực hiện Hợp đồng mà phát sinh
                              tranh chấp, các bên cùng nhau thương lượng giải
                              quyết trên nguyên tắc tôn trọng quyền lợi của
                              nhau; nếu mảnh đất trên thuộc diện quy hoạch không
                              giao dịch được thì bên B phải hoàn trả lại 100% số
                              tiền mà bên A đã giao cho bên B . Trong trường hợp
                              không giải quyết được, thì một trong hai bên có
                              quyền khởi kiện để yêu cầu toà án có thẩm quyền
                              giải quyết theo quy định của pháp luật. Mọi tranh
                              chấp sẽ được phán xử theo quy định của luật pháp
                              của Việt Nam.
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
                                ĐIỀU 7: CAM ĐOAN CỦA CÁC BÊN
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Bên A và bên B chịu trách nhiệm trước pháp luật về
                              những lời cam đoan sau đây:
                            </td>
                          </tr>
                          <tr>
                            <td>
                              1. Việc giao kết Hợp đồng này hoàn toàn tự nguyện,
                              không bị lừa dối hoặc ép buộc.
                            </td>
                          </tr>
                          <tr>
                            <td>
                              2. Thực hiện đúng và đầy đủ tất cả các thoả thuận
                              đã ghi trong Hợp đồng này.
                            </td>
                          </tr>
                          <tr>
                            <td>
                              3. Bên B đã nhận đủ số tiền đặt cọc nêu trong điều
                              1 từ bên A
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  {/* điều 8 */}
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div className="font-weight-bold mb-20 mt-20">
                                ĐIỀU 8: ĐIỀU KHOẢN CUỐI CÙNG
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              1. Hai bên công nhận đã hiểu rõ quyền, nghĩa vụ và
                              lợi ích hợp pháp của mình, ý nghĩa và hậu quả pháp
                              lý của việc giao kết Hợp đồng này.
                            </td>
                          </tr>
                          <tr>
                            <td>
                              2. Hai bên đã tự đọc Hợp đồng, đã hiểu và đồng ý
                              tất cả các điều khoản ghi trong Hợp đồng và ký vào
                              Hợp đồng này trước sự có mặt của người làm chứng.
                            </td>
                          </tr>
                          <tr>
                            <td>
                              3. Hợp đồng có hiệu lực từ
                              <input type="time" className="" />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Hợp đồng Đặt Cọc bao gồm 03 trang được chia làm
                              bốn bản có giá trị pháp lý như nhau, mỗi bên giữ
                              hai bản.
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
          {/* ngày */}
          <tr>
            <td>
              <table
                width="100%"
                cellSpacing="true"
                cellPadding="true"
                className="mt-20 mb-20"
              >
                <tbody>
                  <tr>
                    <td style={{ width: "50%", textAlign: "center" }}></td>
                    <td style={{ width: "50%", textAlign: "center" }}>
                      <input type="text" className="" />, ngày
                      <input type="time" className="" />
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
                            <td className="text-center">Bên A</td>
                          </tr>
                          <tr>
                            <td className="text-center">(Ký, ghi rõ họ tên)</td>
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
                            <td className="text-center">Bên B</td>
                          </tr>
                          <tr>
                            <td className="text-center">(Ký, ghi rõ họ tên)</td>
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
          <tr>
            <td>
              <table border={0} width="100%">
                <tbody>
                  <tr>
                    <td style={{ width: "50%", textAlign: "center" }}>
                      <table border={0} width="100%">
                        <tbody>
                          <tr>
                            <td className="text-center">Người làm chứng</td>
                          </tr>
                          <tr>
                            <td className="text-center">(Ký, ghi rõ họ tên)</td>
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
                            <td className="text-center">Người làm chứng</td>
                          </tr>
                          <tr>
                            <td className="text-center">(Ký, ghi rõ họ tên)</td>
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
  );
}

export default DownPaymentContract;
