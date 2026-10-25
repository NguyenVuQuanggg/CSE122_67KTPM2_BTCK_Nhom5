# Đề xuất dự án GreenSort

## 1. Ngữ cảnh
Ở khu dân cư đô thị, người dân thường không biết phân loại rác đúng và không có kênh rõ ràng để yêu cầu thu gom rác đặc biệt (rác nguy hại, đồ cồng kềnh, đồ điện tử). Đơn vị thu gom thì thiếu công cụ điều phối và theo dõi tiến độ.

## 2. Phát biểu vấn đề
- P1 (Người dân): không biết đồ vật này thuộc loại rác nào và bỏ ở đâu.
- P2 (Người dân): gửi yêu cầu thu gom nhưng không biết ai xử lý và đến đâu.
- P3 (Điều phối viên): giao việc thủ công, khó biết nhân viên nào đang rảnh, dễ bỏ sót rác nguy hại.
- P4 (Quản trị viên): thiếu cái nhìn tổng quan và khó quản lý danh mục, tài khoản.

## 3. Mục tiêu
- O1 Hướng dẫn phân loại rác. O2 Tìm điểm thu gom theo loại rác. O3 Gửi và theo dõi yêu cầu thu gom.
- O4 Giao việc cho nhân viên. O5 Nhân viên cập nhật tiến độ. O6 Thông báo đúng người ở mỗi bước. O7 Quản trị danh mục, tài khoản và xem số liệu.

## 4. Vai trò
Người dân, Nhân viên thu gom, Điều phối viên, Quản trị viên (4 role) cùng các trang dùng chung.

## 5. Thực thể dữ liệu
User (name, email, role, active), Request (id, resident, address, type, kg, date, status, staff, note), Point (name, addr, types), WasteType (name, desc), Notification (to, text, time, read).

## 6. Vòng đời trạng thái của Request
Chờ phân công -> Đã phân công -> Đang thu gom -> Hoàn thành. Nhân viên có thể đặt "Không thể thu gom".

## 7. Tính năng AI (mô phỏng bằng luật, không dùng API ngoài)
- AI-1 Phân loại rác từ mô tả (người dân). AI-2 Gợi ý nhân viên và cảnh báo rác nguy hại (điều phối viên). AI-3 Tóm tắt tình hình (quản trị viên).
