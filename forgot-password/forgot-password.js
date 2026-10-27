function reset() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  if (pass.length < 6) { document.getElementById("msg").innerHTML = "Mật khẩu tối thiểu 6 ký tự!"; return; }
  var users = DB.get("users");
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      users[i].password = pass;
      DB.set("users", users);
      alert("Đã đổi mật khẩu!");
      location.href = "login.html";
      return;
    }
  }
  document.getElementById("msg").innerHTML = "Không tìm thấy email này!";
}
