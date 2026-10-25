# Báo cáo sử dụng AI (ai-usage-report)

> Tài liệu này phải trung thực. Các mục ghi "NHÓM ĐIỀN" là phần bắt buộc nhóm tự viết theo thực tế của từng thành viên.

## 1. Công cụ AI đã dùng
- Claude (Anthropic): sinh mã nguồn ban đầu (HTML, CSS, JavaScript), sinh bản trình chiếu và nháp tài liệu trong thư mục docs/.

## 2. Phần do AI sinh ra
- Mã của cả 21 giao diện và js/api.js (đăng nhập, phân quyền, kho dữ liệu localStorage, menu, thông báo).
- Ba tính năng AI trong js/ai.js. Lưu ý: đây là AI mô phỏng bằng luật từ khóa và phép đếm, không gọi mô hình ngôn ngữ thật.
- Nháp screen-inventory.md, project-proposal.md, README.md.

## 3. Prompt chính (tóm tắt)
- Yêu cầu tạo các trang HTML/CSS/JS theo danh sách giao diện trong file Excel của nhóm, mức kỹ năng sinh viên năm 2, dùng Bootstrap.
- Yêu cầu gộp, tách file, bỏ chú thích; yêu cầu sửa theo barem (chống XSS, HTML ngữ nghĩa, A11y, responsive, AI UX).
- NHÓM ĐIỀN: prompt cụ thể mỗi thành viên đã dùng cho phần của mình.

## 4. Lỗi của AI đã phát hiện và cách sửa
- Nút Đăng nhập, Đăng ký ở trang chủ của bản gộp 1 file trỏ sai (lỗi Cannot GET login.html) do AI chỉ sửa link viết bằng nháy kép, bỏ sót link nằm trong chuỗi JS. Đã sửa bằng cách đổi sang dạng #login.html.
- Bản đầu gán dữ liệu người dùng nhập thẳng vào innerHTML (nguy cơ XSS). Đã thêm hàm esc() trong js/api.js và bọc mọi dữ liệu người dùng.
- Form thêm điểm thu gom ban đầu thiếu ô "loại rác nhận". Đã bổ sung.
- NHÓM ĐIỀN: các lỗi khác mà từng thành viên tự phát hiện khi chạy thử.

## 5. Phần sinh viên tự kiểm chứng và chỉnh sửa
- NHÓM ĐIỀN: mỗi thành viên mô tả cụ thể đã đọc, chạy thử và sửa những dòng nào trong phần của mình (ví dụ: đổi điều kiện lọc, thêm ô nhập, chạy thử bằng DevTools).

## 6. Cam kết
Nhóm khai báo đúng thực tế sử dụng AI. Mỗi thành viên giải thích được mã nguồn của phần mình.
