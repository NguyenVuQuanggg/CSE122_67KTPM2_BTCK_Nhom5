requireRole(["Người dân"]);
var points = DB.get("points");
var types = DB.get("types");
var opts = "<option>Tất cả</option>";
for (var k = 0; k < types.length; k++) {
  opts += "<option>" + types[k].name + "</option>";
}
document.getElementById("filter").innerHTML = opts;
function show() {
  var f = document.getElementById("filter").value;
  var html = "";
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    var t = p.types || "Chưa cập nhật";
    if (f != "Tất cả" && t.indexOf(f) == -1) continue;
    html += "<tr><td>" + p.name + "</td><td>" + p.addr + "</td><td>" + t + "</td></tr>";
  }
  document.getElementById("list").innerHTML = html;
}
show();
