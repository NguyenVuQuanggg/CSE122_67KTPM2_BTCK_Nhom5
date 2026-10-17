var points = [
  {name: "Điểm A", addr: "12 Lê Lợi"},
  {name: "Điểm B", addr: "45 Trần Phú"}
];
function show() {
  var html = "";
  for (var i = 0; i < points.length; i++) {
    html += "<tr><td>" + points[i].name + "</td><td>" + points[i].addr + "</td>";
    html += "<td><button class='btn btn-sm btn-danger' onclick='removePoint(" + i + ")'>Xóa</button></td></tr>";
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
  points.push({name: name, addr: addr});
  document.getElementById("name").value = "";
  document.getElementById("addr").value = "";
  show();
}
function removePoint(i) {
  if (confirm("Xóa điểm này?")) {
    points.splice(i, 1);
    show();
  }
}
show();