# GreenSort - Hệ thống phân loại và thu gom rác thải (Nhóm 5 - CSE122)

Website sử dụng HTML + CSS + JavaScript thuần + Bootstrap 5.3.
Dự án đã được tích hợp **Fake API (RESTful API Client)** và file cơ sở dữ liệu mẫu **`db.json`** theo đúng chuẩn bài tập lớn sinh viên năm 2.

## Cấu trúc thư mục
```
GreenSort/
├── db.json                         (Database mẫu dạng JSON: users, requests, points, types...)
├── index.html, login.html, register.html, forgot-password.html
├── profile.html, settings.html, notifications.html, 403.html, 404.html
├── pages/                          (12 trang nghiệp vụ)
│   ├── resident-*                  (Giao diện Người dân)
│   ├── collector-*                 (Giao diện Nhân viên thu gom)
│   ├── coordinator-*               (Giao diện Điều phối viên)
│   └── admin-*                     (Giao diện Quản trị viên)
├── css/                            (21 file style giao diện)
└── js/
    ├── api.js                      ★ Fake REST API Service (GET, POST, PUT, DELETE, fetch db.json)
    ├── common.js                   (Đăng nhập, phân quyền, menu, thông báo, kết nối api)
    └── [tên_trang].js              (21 file script xử lý nghiệp vụ từng trang qua api)
```

## Kiến trúc Fake API (Mức độ sinh viên năm 2)
1. **File `db.json`**: Lưu trữ các bảng dữ liệu gốc theo định dạng chuẩn JSON (`users`, `requests`, `points`, `types`, `notifications`).
2. **File `js/api.js`**:
   - `api.get(resource)`: Lấy toàn bộ danh sách (mô phỏng `GET /api/:resource`).
   - `api.getById(resource, id)`: Lấy chi tiết 1 bản ghi theo ID (mô phỏng `GET /api/:resource/:id`).
   - `api.post(resource, data)`: Thêm mới bản ghi (mô phỏng `POST /api/:resource`).
   - `api.put(resource, id, data)`: Cập nhật bản ghi (mô phỏng `PUT /api/:resource/:id`).
   - `api.delete(resource, id)`: Xóa bản ghi (mô phỏng `DELETE /api/:resource/:id`).
   - `api.loadFromDbJson()`: Sử dụng `fetch('db.json')` để nạp dữ liệu ban đầu.
3. **Hiển thị trực quan trên Console**:
   - Mở **F12 -> Console** trên trình duyệt để thấy các request Fake API được log chi tiết kèm mã trạng thái (`200 OK`, `201 Created`).

## Cách chạy ứng dụng
- **Cách 1 (Đơn giản nhất - Khuyên dùng)**: Mở thư mục dự án bằng Visual Studio Code, click chuột phải vào `index.html` và chọn **Open with Live Server**.
- **Cách 2 (Mở trực tiếp)**: Nhấp đúp chuột vào file `index.html` để mở trên trình duyệt (hệ thống tự động dùng SEED dự phòng nếu trình duyệt chặn fetch cục bộ).
- **Cách 3 (Nếu muốn dùng json-server)**: Chạy lệnh `npx json-server db.json --port 3000` trong terminal.

## Tài khoản thử nghiệm (Mật khẩu chung: 123456)
- **Người dân**: `dan@gs.com`
- **Nhân viên thu gom**: `nv@gs.com`
- **Điều phối viên**: `dp@gs.com`
- **Quản trị viên**: `ad@gs.com`
