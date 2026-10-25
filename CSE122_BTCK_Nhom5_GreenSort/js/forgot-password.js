function reset() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  if (pass.length < 6) {
    document.getElementById("msg").innerHTML = "Mật khẩu tối thiểu 6 ký tự!";
    return;
  }

  // Gọi Fake API tìm người dùng theo email
  var users = api.get("users");
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      // Gọi Fake API (PUT) cập nhật mật khẩu mới
      api.put("users", users[i].id, { password: pass });
      alert("Đã đặt lại mật khẩu thành công!");
      location.href = "login.html";
      return;
    }
  }
  document.getElementById("msg").innerHTML = "Không tìm thấy email này!";
}
