function doRegister() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var pass2 = document.getElementById("pass2").value;
  var msg = document.getElementById("msg");
  if (name == "" || email == "") { msg.innerHTML = "Vui lòng nhập đủ thông tin!"; return; }
  if (pass.length < 6) { msg.innerHTML = "Mật khẩu tối thiểu 6 ký tự!"; return; }
  if (pass != pass2) { msg.innerHTML = "Mật khẩu nhập lại không khớp!"; return; }

  // Gọi Fake API lấy danh sách người dùng để kiểm tra trùng
  var users = api.get("users");
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email || users[i].name == name) {
      msg.innerHTML = "Email hoặc họ tên đã tồn tại!";
      return;
    }
  }

  // Gọi Fake API (POST) lưu tài khoản người dùng mới
  api.post("users", {
    name: name,
    email: email,
    password: pass,
    role: "Người dân",
    phone: "",
    address: "",
    active: true
  });

  alert("Đăng ký thành công!");
  location.href = "login.html";
}
