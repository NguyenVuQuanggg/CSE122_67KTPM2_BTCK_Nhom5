requireRole(["Quản trị viên"]);
var roles = ["Người dân", "Nhân viên thu gom", "Điều phối viên", "Quản trị viên"];

function show() {
  // Gọi Fake API (GET) lấy danh sách người dùng
  var users = api.get("users");
  var key = document.getElementById("search").value.toLowerCase();
  var html = "";
  for (var i = 0; i < users.length; i++) {
    var u = users[i];
    if (u.name.toLowerCase().indexOf(key) == -1) continue;
    html += "<tr><td>" + u.name + "</td><td><select class='form-select form-select-sm' onchange='changeRole(" + u.id + ", this.value)'>";
    for (var k = 0; k < roles.length; k++) {
      var sel = (roles[k] == u.role) ? "selected" : "";
      html += "<option " + sel + ">" + roles[k] + "</option>";
    }
    html += "</select></td>";
    html += "<td>" + (u.active ? "Hoạt động" : "Đã khóa") + "</td>";
    html += "<td><button class='btn btn-sm btn-secondary' onclick='toggle(" + u.id + ")'>" + (u.active ? "Khóa" : "Mở khóa") + "</button></td></tr>";
  }
  document.getElementById("list").innerHTML = html;
}

function changeRole(id, role) {
  // Gọi Fake API (PUT) đổi vai trò người dùng
  api.put("users", id, { role: role });
}

function toggle(id) {
  var u = api.getById("users", id);
  if (u) {
    // Gọi Fake API (PUT) khóa hoặc mở khóa tài khoản
    api.put("users", id, { active: !u.active });
    show();
  }
}

show();
