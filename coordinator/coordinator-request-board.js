var requests = [
  {id: 1, address: "12 Lê Lợi", status: "Chờ phân công", staff: ""},
  {id: 2, address: "45 Trần Phú", status: "Đã phân công", staff: "Nhân viên A"},
  {id: 3, address: "8 Nguyễn Huệ", status: "Chờ phân công", staff: ""}
];
var staffs = ["Nhân viên A", "Nhân viên B", "Nhân viên C"];
function show() {
  var f = document.getElementById("filter").value;
  var opts = "";
  for (var k = 0; k < staffs.length; k++) {
    opts += "<option>" + staffs[k] + "</option>";
  }
  var html = "";
  for (var i = 0; i < requests.length; i++) {
    var r = requests[i];
    if (f != "Tất cả" && r.status != f) continue;
    html += "<tr><td>" + r.id + "</td><td>" + r.address + "</td><td>" + r.status + "</td><td>";
    if (r.staff == "") {
      html += "<select id='s" + i + "'>" + opts + "</select> ";
      html += "<button class='btn btn-sm btn-warning' onclick='assign(" + i + ")'>Giao</button>";
    } else {
      html += r.staff;
    }
    html += "</td></tr>";
  }
  document.getElementById("list").innerHTML = html;
}
function assign(i) {
  requests[i].staff = document.getElementById("s" + i).value;
  requests[i].status = "Đã phân công";
  show();
}
show();