var roles = ["Người dân", "Nhân viên thu gom", "Điều phối viên", "Quản trị viên"];
var users = [
  {name: "Nguyễn Văn A", role: "Người dân", active: true},
  {name: "Trần Thị B", role: "Nhân viên thu gom", active: true},
  {name: "Lê Văn C", role: "Điều phối viên", active: false}
];
function show() {
  var key = document.getElementById("search").value.toLowerCase();
  var html = "";
  for (var i = 0; i < users.length; i++) {
    var u = users[i];
    if (u.name.toLowerCase().indexOf(key) == -1) continue;
    html += "<tr><td>" + u.name + "</td><td><select class='form-select form-select-sm' onchange='changeRole(" + i + ", this.value)'>";
    for (var k = 0; k < roles.length; k++) {
      var sel = (roles[k] == u.role) ? "selected" : "";
      html += "<option " + sel + ">" + roles[k] + "</option>";
    }
    html += "</select></td>";
    html += "<td>" + (u.active ? "Hoạt động" : "Đã khóa") + "</td>";
    html += "<td><button class='btn btn-sm btn-secondary' onclick='toggle(" + i + ")'>" + (u.active ? "Khóa" : "Mở khóa") + "</button></td></tr>";
  }
  document.getElementById("list").innerHTML = html;
}
function changeRole(i, role) {
  users[i].role = role;
}
function toggle(i) {
  users[i].active = !users[i].active;
  show();
}
show();