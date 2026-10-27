requireRole(["Người dân"]);
var user = getUser();
var types = DB.get("types");
var requests = DB.get("requests");
var opts = "";
for (var k = 0; k < types.length; k++) {
  opts += "<option>" + types[k].name + "</option>";
}
document.getElementById("type").innerHTML = opts;
document.getElementById("addr").value = user.address;
function show() {
  var html = "";
  for (var i = requests.length - 1; i >= 0; i--) {
    var r = requests[i];
    if (r.resident != user.name) continue;
    html += "<li class='list-group-item d-flex justify-content-between'><span>#" + r.id + " " + r.type + " - " + r.kg + "kg<br><small>" + r.address + " · " + r.date + "</small></span>";
    html += "<span class='badge bg-info align-self-center'>" + r.status + "</span></li>";
  }
  if (html == "") html = "<li class='list-group-item'>Bạn chưa có yêu cầu nào.</li>";
  document.getElementById("list").innerHTML = html;
}
function send() {
  var kg = document.getElementById("kg").value;
  var addr = document.getElementById("addr").value;
  var date = document.getElementById("date").value;
  if (kg == "" || addr == "" || date == "") { alert("Vui lòng nhập đủ thông tin!"); return; }
  var id = requests.length + 1;
  requests.push({id: id, resident: user.name, address: addr, type: document.getElementById("type").value, kg: kg, date: date, status: "Chờ phân công", staff: "", note: ""});
  DB.set("requests", requests);
  notify("Điều phối viên", "Yêu cầu mới #" + id + " từ " + user.name);
  document.getElementById("kg").value = "";
  show();
}
show();