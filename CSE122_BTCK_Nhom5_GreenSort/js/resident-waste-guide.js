requireRole(["Người dân"]);

// Gọi Fake API lấy danh mục phân loại rác
var types = api.get("types");

function show() {
  var key = document.getElementById("search").value.toLowerCase();
  var html = "";
  for (var i = 0; i < types.length; i++) {
    var t = types[i];
    if ((t.name + " " + t.desc).toLowerCase().indexOf(key) == -1) continue;
    html += "<div class='col-md-4 mb-3'><div class='card p-3'><h5>" + t.name + "</h5><p class='mb-0'>" + t.desc + "</p></div></div>";
  }
  if (html == "") html = "<p>Không tìm thấy.</p>";
  document.getElementById("list").innerHTML = html;
}

show();
