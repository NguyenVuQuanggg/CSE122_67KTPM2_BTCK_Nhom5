requireLogin();
var user = getUser();

document.getElementById("name").value = user.name;
document.getElementById("email").value = user.email;
document.getElementById("role").value = user.role;
document.getElementById("phone").value = user.phone || "";
document.getElementById("address").value = user.address || "";

function save() {
  var phone = document.getElementById("phone").value;
  var address = document.getElementById("address").value;

  // Gọi Fake API (PUT) cập nhật thông tin người dùng theo ID
  var updated = api.put("users", user.id, {
    phone: phone,
    address: address
  });

  if (updated) {
    document.getElementById("msg").innerHTML = "Đã lưu thành công!";
  }
}
