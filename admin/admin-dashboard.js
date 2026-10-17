var stats = [
  {label: "Người dùng", value: 120},
  {label: "Yêu cầu hôm nay", value: 24},
  {label: "Điểm thu gom", value: 15},
  {label: "Loại rác", value: 6}
];
var logs = ["Nguyễn Văn A tạo yêu cầu mới", "Admin thêm loại rác Pin", "Trần Thị B hoàn thành công việc"];
var html = "";
for (var i = 0; i < stats.length; i++) {
  html += "<div class='col-6 col-md-3 mb-3'><div class='card p-3'>" + stats[i].label;
  html += "<div class='num'>" + stats[i].value + "</div></div></div>";
}
document.getElementById("stats").innerHTML = html;
var li = "";
for (var j = 0; j < logs.length; j++) {
  li += "<li class='list-group-item'>" + logs[j] + "</li>";
}
document.getElementById("logs").innerHTML = li;