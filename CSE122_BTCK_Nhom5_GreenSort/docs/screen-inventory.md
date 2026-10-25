# Bảng kiểm kê màn hình (screen-inventory)

Nhóm 5 - CSE122 - GreenSort. Cột Assignee/OBS là phân công mặc định, nhóm chỉnh lại nếu thay đổi. Cột Task ID, Branch và OBS phải khớp với Trello, GitHub và video thật của nhóm.

| Role | User Goal | User Task | Screen | File | CRUD | States | AI | Assignee | Task ID | Branch | OBS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chung | Biết hệ thống làm gì | Xem giới thiệu, vào đăng nhập/đăng ký | Trang chủ | index.html | R | Normal | - | Cảnh | TASK-01 | feature/index | SV2-01-index.mp4 |
| Chung | Vào hệ thống | Đăng nhập theo vai trò | Đăng nhập | login.html | R | Normal, Error (sai mật khẩu, tài khoản khóa) | - | Cảnh | TASK-02 | feature/login | SV2-02-login.mp4 |
| Chung | Có tài khoản mới | Đăng ký tài khoản Người dân | Đăng ký | register.html | C | Normal, Error (kiểm tra form) | - | Cảnh | TASK-03 | feature/register | SV2-03-register.mp4 |
| Chung | Lấy lại truy cập | Đặt lại mật khẩu (mô phỏng) | Quên mật khẩu | forgot-password.html | U | Normal, Error | - | Cảnh | TASK-04 | feature/forgot-password | SV2-04-forgot-password.mp4 |
| Chung | Quản lý thông tin cá nhân | Sửa số điện thoại, địa chỉ | Hồ sơ cá nhân | profile.html | R, U | Normal, Success (toast) | - | Duệ | TASK-05 | feature/profile | SV3-05-profile.mp4 |
| Chung | Tùy chỉnh trải nghiệm | Bật tắt chế độ tối, thông báo, đổi mật khẩu, khôi phục dữ liệu mẫu | Cài đặt | settings.html | R, U, D | Normal, Success, Error | - | Duệ | TASK-06 | feature/settings | SV3-06-settings.mp4 |
| Chung | Theo dõi tin báo | Xem, xóa thông báo của mình | Thông báo | notifications.html | R, D | Normal, Empty | - | Duệ | TASK-07 | feature/notifications | SV3-07-notifications.mp4 |
| Người dân | Biết phân loại rác đúng | Tra cứu loại rác | Hướng dẫn phân loại | pages/resident-waste-guide.html | R | Normal, Empty (không tìm thấy) | - | Cảnh | TASK-08 | feature/resident-waste-guide | SV2-08-resident-waste-guide.mp4 |
| Người dân | Tìm nơi bỏ rác | Lọc điểm theo loại rác | Tìm điểm thu gom | pages/resident-collection-points.html | R | Normal, Empty | - | Cảnh | TASK-09 | feature/resident-collection-points | SV2-09-resident-collection-points.mp4 |
| Người dân | Được thu gom rác | Gửi yêu cầu, theo dõi trạng thái | Gửi yêu cầu thu gom | pages/resident-pickup-request.html | C, R | Normal, Empty, Loading (AI), Error (AI không đủ dữ liệu) | AI-1 Phân loại rác | Cảnh | TASK-10 | feature/resident-pickup-request | SV2-10-resident-pickup-request.mp4 |
| Nhân viên thu gom | Biết việc được giao | Xem việc, bắt đầu thu gom | Danh sách công việc | pages/collector-task-list.html | R, U | Normal, Empty | - | Duệ | TASK-11 | feature/collector-task-list | SV3-11-collector-task-list.mp4 |
| Nhân viên thu gom | Đi đúng tuyến | Xem điểm trên tuyến, tiến độ | Tuyến thu gom | pages/collector-route-view.html | R | Normal, Empty | - | Duệ | TASK-12 | feature/collector-route-view | SV3-12-collector-route-view.mp4 |
| Nhân viên thu gom | Báo kết quả | Cập nhật trạng thái, ghi chú | Chi tiết yêu cầu | pages/collector-request-detail.html | R, U | Normal, Empty, Success | - | Duệ | TASK-13 | feature/collector-request-detail | SV3-13-collector-request-detail.mp4 |
| Điều phối viên | Giao việc hợp lý | Lọc, tìm yêu cầu, giao nhân viên | Bảng yêu cầu | pages/coordinator-request-board.html | R, U | Normal, Empty (CTA xóa bộ lọc), Loading/Error (AI) | AI-2 Gợi ý nhân viên và cảnh báo rác nguy hại | Quang | TASK-14 | feature/coordinator-request-board | SV1-14-coordinator-request-board.mp4 |
| Điều phối viên | Quản lý điểm thu gom | Thêm, xóa điểm | Quản lý điểm | pages/coordinator-point-management.html | C, R, D | Normal, Empty, Error (form) | - | Quang | TASK-15 | feature/coordinator-point-management | SV1-15-coordinator-point-management.mp4 |
| Điều phối viên | Nắm hiệu suất | Xem số liệu theo loại rác | Phân tích | pages/coordinator-analytics.html | R | Normal | - | Quang | TASK-16 | feature/coordinator-analytics | SV1-16-coordinator-analytics.mp4 |
| Quản trị viên | Nắm tổng quan hệ thống | Xem thẻ thống kê, nhờ AI tóm tắt | Dashboard | pages/admin-dashboard.html | R, C | Normal, Loading (AI), Error (AI không đủ dữ liệu) | AI-3 Trợ lý tóm tắt | Quang | TASK-17 | feature/admin-dashboard | SV1-17-admin-dashboard.mp4 |
| Quản trị viên | Quản lý danh mục | Thêm, xóa loại rác | Quản lý loại rác | pages/admin-waste-type-management.html | C, R, D | Normal, Empty, Error (form) | - | Quang | TASK-18 | feature/admin-waste-type-management | SV1-18-admin-waste-type-management.mp4 |
| Quản trị viên | Quản lý tài khoản | Tìm, đổi vai trò, khóa/mở khóa | Quản lý người dùng | pages/admin-user-management.html | R, U | Normal, Empty | - | Quang | TASK-19 | feature/admin-user-management | SV1-19-admin-user-management.mp4 |
| Chung | Biết mình bị chặn | Hiện khi sai vai trò | Lỗi 403 | 403.html | R | Error | - | Quang | TASK-20 | feature/403 | SV1-20-403.mp4 |
| Chung | Biết trang không có | Hiện khi sai đường dẫn | Lỗi 404 | 404.html | R | Error | - | Duệ | TASK-21 | feature/404 | SV3-21-404.mp4 |

Tổng: 21 màn hình. Quang: 7 (Điều phối viên 3, Quản trị viên 3, 403). Cảnh: 7 (Người dân 3, Trang chủ, Đăng nhập, Đăng ký, Quên mật khẩu). Duệ: 7 (Nhân viên thu gom 3, Hồ sơ, Cài đặt, Thông báo, 404).
