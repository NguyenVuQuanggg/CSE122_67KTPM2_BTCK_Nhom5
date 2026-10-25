// ============================================================
// GreenSort - Fake API Service (Nhóm 5 - CSE122)
// Mô phỏng RESTful API: GET, POST, PUT, DELETE
// Dữ liệu mô phỏng backend lưu trong LocalStorage, khởi tạo từ db.json
// ============================================================

// Xác định đường dẫn gốc tùy thuộc trang hiện tại đang ở thư mục ngoài hay trong /pages/
var API_BASE = location.pathname.indexOf("/pages/") > -1 ? "../" : "";

var api = {
  // 1. GET: Lấy toàn bộ danh sách tài nguyên (GET /api/:resource)
  get: function(resource) {
    var raw = localStorage.getItem("gs_" + resource);
    var data = raw ? JSON.parse(raw) : (typeof SEED !== "undefined" && SEED[resource] ? SEED[resource] : []);
    console.log("%c[Fake API] GET /api/" + resource + " -> 200 OK (" + data.length + " bản ghi)", "color: #28a745; font-weight: bold;");
    return data;
  },

  // 2. GET BY ID: Lấy 1 bản ghi theo ID (GET /api/:resource/:id)
  getById: function(resource, id) {
    var list = this.get(resource);
    var item = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        item = list[i];
        break;
      }
    }
    if (item) {
      console.log("%c[Fake API] GET /api/" + resource + "/" + id + " -> 200 OK", "color: #28a745; font-weight: bold;", item);
    } else {
      console.warn("[Fake API] GET /api/" + resource + "/" + id + " -> 404 Not Found");
    }
    return item;
  },

  // 3. POST: Thêm mới 1 bản ghi (POST /api/:resource)
  post: function(resource, newItem) {
    var list = this.get(resource);
    // Tự động cấp ID tăng dần nếu bản ghi chưa có ID
    if (newItem.id === undefined || newItem.id === null) {
      var maxId = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id && Number(list[i].id) > maxId) {
          maxId = Number(list[i].id);
        }
      }
      newItem.id = maxId + 1;
    }
    list.push(newItem);
    localStorage.setItem("gs_" + resource, JSON.stringify(list));
    console.log("%c[Fake API] POST /api/" + resource + " -> 201 Created", "color: #0d6efd; font-weight: bold;", newItem);
    return newItem;
  },

  // 4. PUT: Cập nhật bản ghi theo ID (PUT /api/:resource/:id)
  put: function(resource, id, updateData) {
    var list = this.get(resource);
    var updatedItem = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        for (var prop in updateData) {
          list[i][prop] = updateData[prop];
        }
        updatedItem = list[i];
        break;
      }
    }
    if (updatedItem) {
      localStorage.setItem("gs_" + resource, JSON.stringify(list));
      console.log("%c[Fake API] PUT /api/" + resource + "/" + id + " -> 200 OK", "color: #fd7e14; font-weight: bold;", updatedItem);
      return updatedItem;
    }
    console.warn("[Fake API] PUT /api/" + resource + "/" + id + " -> 404 Not Found");
    return null;
  },

  // 5. DELETE: Xóa bản ghi theo ID (DELETE /api/:resource/:id)
  delete: function(resource, id) {
    var list = this.get(resource);
    var oldLength = list.length;
    var newList = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id != id) {
        newList.push(list[i]);
      }
    }
    localStorage.setItem("gs_" + resource, JSON.stringify(newList));
    if (newList.length < oldLength) {
      console.log("%c[Fake API] DELETE /api/" + resource + "/" + id + " -> 200 OK", "color: #dc3545; font-weight: bold;");
      return true;
    } else {
      console.warn("[Fake API] DELETE /api/" + resource + "/" + id + " -> 404 Not Found");
      return false;
    }
  },

  // 6. SAVE ALL: Lưu toàn bộ mảng dữ liệu (hỗ trợ tương thích ngược)
  saveAll: function(resource, list) {
    localStorage.setItem("gs_" + resource, JSON.stringify(list));
    console.log("%c[Fake API] SYNC /api/" + resource + " -> 200 OK", "color: #6c757d; font-weight: bold;");
    return list;
  },

  // 7. Khởi tạo dữ liệu từ file db.json bằng Fetch API (đúng chuẩn yêu cầu đề bài)
  loadFromDbJson: function() {
    var url = API_BASE + "db.json";
    fetch(url)
      .then(function(res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function(data) {
        console.log("%c[Fake API] Đã nạp thành công dữ liệu từ " + url + " qua fetch()", "color: #20c997; font-weight: bold;");
        // Nạp vào localStorage nếu chưa có dữ liệu
        for (var key in data) {
          if (!localStorage.getItem("gs_" + key)) {
            localStorage.setItem("gs_" + key, JSON.stringify(data[key]));
          }
        }
      })
      .catch(function(err) {
        console.log("[Fake API] Mở trực tiếp hoặc không có server, dùng SEED dự phòng: " + err.message);
      });
  }
};

// Bí danh ngắn gọn cho fakeApi
var fakeApi = api;

// Tự động gọi fetch db.json khi script được tải
api.loadFromDbJson();
