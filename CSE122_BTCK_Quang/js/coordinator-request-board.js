requireRole(["Điều phối viên"]);

var staffs = getNames("Nhân viên thu gom");

function show() {
  // Gọi Fake API lấy danh sách yêu cầu mới nhất
  var requests = api.get("requests");
  var f = document.getElementById("filter").value;
  var opts = "";
  for (var k = 0; k < staffs.length; k++) {
    opts += "<option>" + staffs[k] + "</option>";
  }
  var html = "";
  for (var i = 0; i < requests.length; i++) {
    var r = requests[i];
    if (f != "Tất cả" && r.status != f) continue;
    html += "<tr><td>#" + r.id + "</td><td>📍 " + r.address + " (" + r.type + " - " + r.kg + "kg)</td><td><span class='badge bg-secondary'>" + r.status + "</span></td><td>";
    if (r.staff == "") {
      html += "<select id='s" + r.id + "' class='form-select form-select-sm d-inline-block w-auto me-1'>" + opts + "</select> ";
      html += "<button class='btn btn-sm btn-warning' onclick='assign(" + r.id + ")'>Giao việc</button>";
    } else {
      html += "👷 " + r.staff;
    }
    html += "</td></tr>";
  }
  document.getElementById("list").innerHTML = html;
}

function assign(id) {
  var staff = document.getElementById("s" + id).value;
  // Gọi Fake API (PUT) để phân công nhân viên thu gom
  var updated = api.put("requests", id, {
    staff: staff,
    status: "Đã phân công"
  });

  if (updated) {
    notify(updated.staff, "Bạn được giao yêu cầu #" + updated.id + " tại " + updated.address);
    notify(updated.resident, "Yêu cầu #" + updated.id + " đã được giao cho " + updated.staff);
    notify("Admin", "Điều phối viên đã giao yêu cầu #" + updated.id + " (" + updated.address + ") cho " + updated.staff);
  }
  show();
}

show();
