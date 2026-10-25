requireLogin();
var user = getUser();

function show() {
  // Gọi Fake API lấy danh sách thông báo
  var list = api.get("notifications");
  var html = "";
  for (var i = list.length - 1; i >= 0; i--) {
    var n = list[i];
    if (n.to != user.name && n.to != user.role) continue;
    html += "<li class='list-group-item'>" + (n.read ? "" : "<span class='badge bg-danger me-2'>Mới</span>") + n.text;
    html += "<br><small class='text-muted'>" + n.time + "</small></li>";
    n.read = true;
  }
  if (html == "") html = "<li class='list-group-item'>Chưa có thông báo.</li>";
  document.getElementById("list").innerHTML = html;
  api.saveAll("notifications", list);
  renderNav();
}

function clearMine() {
  var list = api.get("notifications");
  var rest = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].to != user.name && list[i].to != user.role) rest.push(list[i]);
  }
  api.saveAll("notifications", rest);
  show();
}

show();
