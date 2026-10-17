var types = [
  {name: "Hữu cơ", desc: "Thức ăn thừa, vỏ rau củ"},
  {name: "Tái chế", desc: "Giấy, nhựa, kim loại"},
  {name: "Nguy hại", desc: "Pin, hóa chất"}
];
function show() {
  var html = "";
  for (var i = 0; i < types.length; i++) {
    html += "<tr><td>" + types[i].name + "</td><td>" + types[i].desc + "</td>";
    html += "<td><button class='btn btn-sm btn-danger' onclick='removeType(" + i + ")'>Xóa</button></td></tr>";
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
  types.push({name: name, desc: desc});
  document.getElementById("name").value = "";
  document.getElementById("desc").value = "";
  show();
}
function removeType(i) {
  if (confirm("Xóa loại rác này?")) {
    types.splice(i, 1);
    show();
  }
}
show();