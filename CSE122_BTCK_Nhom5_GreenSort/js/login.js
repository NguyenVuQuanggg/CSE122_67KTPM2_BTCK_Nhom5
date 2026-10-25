function doLogin() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var r = login(email, pass);
  if (r == "notfound") {
    document.getElementById("msg").innerHTML = "Sai email hoặc mật khẩu!";
  } else if (r == "locked") {
    document.getElementById("msg").innerHTML = "Tài khoản đã bị khóa!";
  } else {
    location.href = HOME[r.role];
  }
}
