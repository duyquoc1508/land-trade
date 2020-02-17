# owner:
1. Đăng ký tài khoản, đăng nhập
2. Xem trạng thái, chi tiết các bds của mình
3. Active tài sản đăng ký từ chính phủ chuyển giấy sở hữu qua
4. Giao dịch bds
5. Tra cứu thông tin 
# Government
1. Số hóa giấy chứng nhận lên mạng blockchain
2. Chuyển token quyền sở hữu cho người dùng qua publicAddress đã cung cấp
3. include owner
# Notary
1. Tham gia vào giao dich giữa 2 bên người dùng

# Quy trình giao dich
1. Người bán và đồng sỡ hữu cài đặt số tiền đặt cọc, số tiền chuyển nhượng, tài khoản ngân hàng. Public ra trang bán
2. Người mua tiến hành mời người bán, công chứng viên vào giao dich
3. Người mua, công chưng đồng ý tham gia vào giao dich.
4. 3 bên tiến hành ký số các hợp đồng, xác nhận mỗi chữ ký qua otp // coi lại
5. Người mua chuyển tiền đặt cọc và upload hóa đơn, người bán xác nhận nhận được tiền, Công chưngs viên xác nhận đôi bên hoan tất.
6. Người mua or người bán đóng thuế cho nhà nước, upload biên lai lên cho 2 bên conf lại xác nhận
7. Giai đoạn thanh toán, tương tự đặt cọc.
8. Chuyển nhượng token, đưa lên blockchain. Xuất link check trên exprore block.


# Schema Transaction 
buyer: [user]
seller: [user]
Notary: user
invite {
  accept: [user]
  status: boolean
}
contract : strings
deposits: {
  status: boolean,
  amount: number,
  invoice: string
}
pay_taxes: {
  status: boolean,
  amount: number,
  invoice: string
}
payment: {
  status: boolean,
  amount: number,
  invoice: string
}
link check contract: string
status: boolean
