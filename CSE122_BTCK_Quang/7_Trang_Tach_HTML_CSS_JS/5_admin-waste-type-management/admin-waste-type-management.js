requireRole(["Quản trị viên"]);

function show() {
  // Gọi Fake API (GET) lấy danh sách loại rác
  var types = api.get("types");
  var html = "";
  for (var i = 0; i < types.length; i++) {
    html += "<tr><td>" + types[i].name + "</td><td>" + types[i].desc + "</td>";
    html += "<td><button class='btn btn-sm btn-danger' onclick='removeType(" + types[i].id + ")'>Xóa</button></td></tr>";
  }
  document.getElementById("list").innerHTML = html;
}

function addType() {
  var name = document.getElementById("name").value;
  var desc = document.getElementById("desc").value;
  if (name == "") {
    alert("Vui lòng nhập tên loại rác!");
    return;
  }

  // Gọi Fake API (POST) thêm loại rác mới
  api.post("types", { name: name, desc: desc });

  document.getElementById("name").value = "";
  document.getElementById("desc").value = "";
  show();
}

function removeType(id) {
  if (confirm("Xóa loại rác này?")) {
    // Gọi Fake API (DELETE) xóa loại rác theo id
    api.delete("types", id);
    show();
  }
}

show();
