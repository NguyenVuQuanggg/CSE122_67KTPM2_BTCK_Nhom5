requireRole(["Nhân viên thu gom"]);
var user = getUser();

// Gọi Fake API lấy danh sách việc
var requests = api.get("requests");
var id = new URLSearchParams(location.search).get("id");
var opts = "";
for (var i = 0; i < requests.length; i++) {
  if (requests[i].staff == user.name) {
    opts += "<option value='" + requests[i].id + "'>#" + requests[i].id + " - " + requests[i].address + " (" + requests[i].status + ")</option>";
  }
}
document.getElementById("task").innerHTML = opts;
if (id) document.getElementById("task").value = id;

function find() {
  var cur = document.getElementById("task").value;
  return api.getById("requests", cur);
}

function showInfo() {
  var r = find();
  if (r == null) {
    document.getElementById("info").innerHTML = "Bạn chưa có việc nào.";
    return;
  }
  document.getElementById("info").innerHTML = "<b>#" + r.id + " " + r.type + " - " + r.kg + "kg</b><br>Người gửi: " + r.resident + "<br>Địa chỉ: 📍 " + r.address + "<br>Ngày: " + r.date;
  document.getElementById("status").value = r.status;
  document.getElementById("note").value = r.note || "";
}

function save() {
  var curId = document.getElementById("task").value;
  var newStatus = document.getElementById("status").value;
  var newNote = document.getElementById("note").value;

  // Gọi Fake API (PUT) cập nhật tiến độ công việc
  var updated = api.put("requests", curId, {
    status: newStatus,
    note: newNote
  });

  if (updated) {
    notify(updated.resident, "Yêu cầu #" + updated.id + " của bạn: " + updated.status);
    notify("Admin", "Nhân viên " + user.name + " đã cập nhật yêu cầu #" + updated.id + " (" + updated.address + "): " + updated.status);
    document.getElementById("msg").innerHTML = "Đã cập nhật thành công!";
  }
}

showInfo();
