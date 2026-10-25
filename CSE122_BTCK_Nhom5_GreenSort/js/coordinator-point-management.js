requireRole(["Điều phối viên", "Quản trị viên"]);

function show() {
  // Gọi Fake API (GET) lấy danh sách điểm thu gom
  var points = api.get("points");
  var html = "";
  for (var i = 0; i < points.length; i++) {
    html += "<tr><td>" + points[i].name + "</td><td>" + points[i].addr + "</td><td>" + (points[i].types || "Tất cả loại") + "</td>";
    html += "<td><button class='btn btn-sm btn-danger' onclick='removePoint(" + points[i].id + ")'>Xóa</button></td></tr>";
  }
  document.getElementById("list").innerHTML = html;
}

function addPoint() {
  var name = document.getElementById("name").value;
  var addr = document.getElementById("addr").value;
  if (name == "" || addr == "") {
    alert("Vui lòng nhập đủ thông tin!");
    return;
  }

  // Gọi Fake API (POST) thêm điểm thu gom mới
  var newPoint = {
    name: name,
    addr: addr,
    types: document.getElementById("types").value || "Tất cả loại"
  };
  api.post("points", newPoint);

  notify("Admin", "Đã thêm điểm thu gom mới: " + name + " (" + addr + ")");

  document.getElementById("name").value = "";
  document.getElementById("addr").value = "";
  document.getElementById("types").value = "";
  show();
}

function removePoint(id) {
  if (confirm("Xóa điểm này?")) {
    // Gọi Fake API (DELETE) xóa điểm thu gom
    api.delete("points", id);
    notify("Admin", "Đã xóa điểm thu gom #" + id + " khỏi hệ thống");
    show();
  }
}

show();
