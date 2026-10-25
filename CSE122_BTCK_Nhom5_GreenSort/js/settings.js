requireLogin();
var user = getUser();
var key = "set_" + user.email;
var s = DB.get(key) || {dark: false, notif: true};
document.getElementById("dark").checked = s.dark;
document.getElementById("notif").checked = s.notif;

function saveSettings() {
  s.dark = document.getElementById("dark").checked;
  s.notif = document.getElementById("notif").checked;
  DB.set(key, s);
  applyTheme();
  renderNav();
  alert("Đã lưu cài đặt!");
}

function changePass() {
  var oldP = document.getElementById("old").value;
  var newP = document.getElementById("new").value;
  if (newP.length < 6) {
    alert("Mật khẩu mới tối thiểu 6 ký tự!");
    return;
  }
  // Lấy người dùng hiện tại qua Fake API để kiểm tra mật khẩu cũ
  var curUser = api.getById("users", user.id);
  if (!curUser || curUser.password != oldP) {
    alert("Mật khẩu cũ không đúng!");
    return;
  }

  // Gọi Fake API (PUT) cập nhật mật khẩu mới
  api.put("users", user.id, { password: newP });
  alert("Đã đổi mật khẩu thành công!");
  document.getElementById("old").value = "";
  document.getElementById("new").value = "";
}
