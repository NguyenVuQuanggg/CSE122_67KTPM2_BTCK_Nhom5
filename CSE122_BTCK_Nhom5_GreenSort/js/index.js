var u = getUser();
var html = "";
if (u) {
  html = "<a class='btn btn-success btn-lg' href='" + BASE + HOME[u.role] + "'>Vào hệ thống</a>";
} else {
  html = "<a class='btn btn-success btn-lg me-2' href='login.html'>Đăng nhập</a>";
  html += "<a class='btn btn-outline-success btn-lg' href='register.html'>Đăng ký</a>";
}
document.getElementById("actions").innerHTML = html;
