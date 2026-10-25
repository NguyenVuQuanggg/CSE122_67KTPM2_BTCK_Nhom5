requireRole(["Nhân viên thu gom"]);
var user = getUser();

// Gọi Fake API lấy danh sách việc cần làm trên tuyến
var requests = api.get("requests");
var total = 0;
var done = 0;
var html = "";

for (var i = 0; i < requests.length; i++) {
  var r = requests[i];
  if (r.staff != user.name) continue;
  total++;
  if (r.status == "Hoàn thành") done++;
  html += "<li class='list-group-item d-flex justify-content-between'><span>" + r.address + " (" + r.type + ")</span><span class='badge bg-secondary'>" + r.status + "</span></li>";
}

if (html == "") html = "<li class='list-group-item'>Chưa có điểm nào trên tuyến.</li>";
document.getElementById("list").innerHTML = html;

var percent = total == 0 ? 0 : Math.round(done / total * 100);
document.getElementById("bar").style.width = percent + "%";
document.getElementById("bar").innerHTML = percent + "%";
