requireRole(["Nhân viên thu gom"]);
var user = getUser();

function show() {
  // Gọi Fake API lấy danh sách yêu cầu thu gom
  var requests = api.get("requests");
  var html = "";
  for (var i = 0; i < requests.length; i++) {
    var r = requests[i];
    if (r.staff != user.name) continue;
    html += "<div class='col-md-4 mb-3'><div class='card p-3 shadow-sm'><b>#" + r.id + " " + r.type + " - " + r.kg + "kg</b><small class='text-muted'>📍 " + r.address + "</small>";
    html += "<span class='badge bg-secondary my-2'>" + r.status + "</span>";
    if (r.status == "Đã phân công") {
      html += "<button class='btn btn-sm btn-primary mb-1' onclick='start(" + r.id + ")'>Bắt đầu thu gom</button>";
    }
    html += "<a class='btn btn-sm btn-outline-success' href='collector-request-detail.html?id=" + r.id + "'>Xử lý</a></div></div>";
  }
  if (html == "") html = "<p class='text-muted'>Bạn chưa được giao việc nào.</p>";
  document.getElementById("list").innerHTML = html;
}

function start(id) {
  // Gọi Fake API (PUT) cập nhật trạng thái yêu cầu
  var updated = api.put("requests", id, { status: "Đang thu gom" });
  if (updated) {
    notify(updated.resident, "Yêu cầu #" + updated.id + " đang được thu gom");
    notify("Admin", "Nhân viên " + user.name + " đã bắt đầu thu gom yêu cầu #" + updated.id + " tại " + updated.address);
  }
  show();
}

show();
