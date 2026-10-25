// ============================================================
// GreenSort - Common JS (Nhóm 5 - CSE122)
// Quản lý trạng thái, xác thực, phân quyền và kết nối Fake API
// ============================================================

var BASE = location.pathname.indexOf("/pages/") > -1 ? "../" : "";

// Dữ liệu mẫu khởi tạo (SEED)
var SEED = {
  users: [
    {id: 1, name: "Người Dân A", email: "dan@gs.com", password: "123456", role: "Người dân", phone: "0901234567", address: "12 Lê Lợi", active: true},
    {id: 2, name: "Nhân viên A", email: "nv@gs.com", password: "123456", role: "Nhân viên thu gom", phone: "0912345678", address: "34 Nguyễn Huệ", active: true},
    {id: 3, name: "Điều phối B", email: "dp@gs.com", password: "123456", role: "Điều phối viên", phone: "0923456789", address: "56 Pasteur", active: true},
    {id: 4, name: "Quản trị C", email: "ad@gs.com", password: "123456", role: "Quản trị viên", phone: "0934567890", address: "78 Hai Bà Trưng", active: true}
  ],
  requests: [
    {id: 1, resident: "Người Dân A", address: "12 Lê Lợi", type: "Tái chế", kg: 5, date: "2025-01-10", status: "Chờ phân công", staff: "", note: ""},
    {id: 2, resident: "Người Dân A", address: "45 Trần Phú", type: "Hữu cơ", kg: 8, date: "2025-01-11", status: "Đã phân công", staff: "Nhân viên A", note: ""}
  ],
  points: [
    {id: 1, name: "Điểm A", addr: "12 Lê Lợi", types: "Tái chế, Nguy hại"},
    {id: 2, name: "Điểm B", addr: "45 Trần Phú", types: "Hữu cơ, Tái chế"}
  ],
  types: [
    {id: 1, name: "Hữu cơ", desc: "Thức ăn thừa, vỏ rau củ - bỏ thùng xanh lá"},
    {id: 2, name: "Tái chế", desc: "Giấy, nhựa, kim loại sạch - bỏ thùng xanh dương"},
    {id: 3, name: "Nguy hại", desc: "Pin, bóng đèn, hóa chất - mang đến điểm riêng"}
  ],
  notifications: []
};

// Đảm bảo đối tượng api luôn sẵn sàng (nếu chưa nhúng api.js)
if (typeof api === "undefined") {
  var api = {
    get: function(resource) {
      var raw = localStorage.getItem("gs_" + resource);
      return raw ? JSON.parse(raw) : (SEED[resource] ? SEED[resource] : []);
    },
    getById: function(resource, id) {
      var list = this.get(resource);
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) return list[i];
      }
      return null;
    },
    post: function(resource, item) {
      var list = this.get(resource);
      if (item.id === undefined) item.id = list.length + 1;
      list.push(item);
      localStorage.setItem("gs_" + resource, JSON.stringify(list));
      return item;
    },
    put: function(resource, id, data) {
      var list = this.get(resource);
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          for (var k in data) list[i][k] = data[k];
          localStorage.setItem("gs_" + resource, JSON.stringify(list));
          return list[i];
        }
      }
      return null;
    },
    delete: function(resource, id) {
      var list = this.get(resource);
      var filtered = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].id != id) filtered.push(list[i]);
      }
      localStorage.setItem("gs_" + resource, JSON.stringify(filtered));
      return true;
    },
    saveAll: function(resource, list) {
      localStorage.setItem("gs_" + resource, JSON.stringify(list));
      return list;
    }
  };
  var fakeApi = api;
}

// Lớp DB tương thích ngược gọi qua Fake API
var DB = {
  get: function (key) {
    return api.get(key);
  },
  set: function (key, value) {
    return api.saveAll(key, value);
  }
};

var HOME = {
  "Người dân": "pages/resident-waste-guide.html",
  "Nhân viên thu gom": "pages/collector-task-list.html",
  "Điều phối viên": "pages/coordinator-request-board.html",
  "Quản trị viên": "pages/admin-dashboard.html"
};

var MENU = {
  "Người dân": [
    ["Hướng dẫn", "pages/resident-waste-guide.html"],
    ["Điểm thu gom", "pages/resident-collection-points.html"],
    ["Gửi yêu cầu", "pages/resident-pickup-request.html"]
  ],
  "Nhân viên thu gom": [
    ["Công việc", "pages/collector-task-list.html"],
    ["Tuyến thu gom", "pages/collector-route-view.html"],
    ["Chi tiết", "pages/collector-request-detail.html"]
  ],
  "Điều phối viên": [
    ["Bảng yêu cầu", "pages/coordinator-request-board.html"],
    ["Quản lý điểm", "pages/coordinator-point-management.html"],
    ["Phân tích", "pages/coordinator-analytics.html"]
  ],
  "Quản trị viên": [
    ["Dashboard", "pages/admin-dashboard.html"],
    ["Điểm thu gom", "pages/coordinator-point-management.html"],
    ["Loại rác", "pages/admin-waste-type-management.html"],
    ["Người dùng", "pages/admin-user-management.html"]
  ]
};

// Lấy thông tin tài khoản hiện tại qua Fake API
function getUser() {
  var email = localStorage.getItem("gs_current");
  if (!email) return null;
  var users = api.get("users");
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email) return users[i];
  }
  return null;
}

// Xử lý đăng nhập kiểm tra qua Fake API
function login(email, password) {
  var users = api.get("users");
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      if (!users[i].active) return "locked";
      localStorage.setItem("gs_current", email);
      return users[i];
    }
  }
  return "notfound";
}

function logout() {
  localStorage.removeItem("gs_current");
  location.href = BASE + "login.html";
}

function requireLogin() {
  if (getUser() == null) location.href = BASE + "login.html";
}

function requireRole(roles) {
  var u = getUser();
  if (u == null) {
    location.href = BASE + "login.html";
  } else if (roles.indexOf(u.role) == -1) {
    location.href = BASE + "403.html";
  }
}

// Lấy danh sách tên theo vai trò từ Fake API
function getNames(role) {
  var users = api.get("users");
  var names = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].role == role && users[i].active) names.push(users[i].name);
  }
  return names;
}

// Gửi thông báo mới qua Fake API POST
function notify(to, text) {
  var newNotif = {
    to: to,
    text: text,
    time: new Date().toLocaleString("vi-VN"),
    read: false
  };
  api.post("notifications", newNotif);
}

function applyTheme() {
  var u = getUser();
  var s = u ? DB.get("set_" + u.email) : null;
  document.documentElement.setAttribute("data-bs-theme", (s && s.dark) ? "dark" : "light");
}

function renderNav() {
  var u = getUser();
  var html = "<nav class='navbar navbar-expand navbar-dark bg-success px-3'>";
  html += "<a class='navbar-brand' href='" + BASE + "index.html'>♻ GreenSort</a><div class='navbar-nav me-auto'>";
  if (u) {
    var m = MENU[u.role];
    for (var i = 0; i < m.length; i++) {
      html += "<a class='nav-link' href='" + BASE + m[i][1] + "'>" + m[i][0] + "</a>";
    }
  }
  html += "</div><div class='navbar-nav align-items-center'>";
  if (u) {
    var list = api.get("notifications");
    var count = 0;
    for (var j = 0; j < list.length; j++) {
      if (!list[j].read && (list[j].to == u.name || list[j].to == u.role)) count++;
    }
    var st = DB.get("set_" + u.email);
    var badge = (st && st.notif === false) ? "" : " <span class='badge bg-danger'>" + count + "</span>";
    html += "<a class='nav-link' href='" + BASE + "notifications.html'>🔔" + badge + "</a>";
    html += "<a class='nav-link' href='" + BASE + "profile.html'>" + u.name + "</a>";
    html += "<a class='nav-link' href='" + BASE + "settings.html'>Cài đặt</a>";
    html += "<button class='btn btn-sm btn-light ms-2' onclick='logout()'>Đăng xuất</button>";
  } else {
    html += "<a class='nav-link' href='" + BASE + "login.html'>Đăng nhập</a><a class='nav-link' href='" + BASE + "register.html'>Đăng ký</a>";
  }
  html += "</div></nav>";
  document.getElementById("nav").innerHTML = html;
}

applyTheme();
if (document.getElementById("nav")) renderNav();
