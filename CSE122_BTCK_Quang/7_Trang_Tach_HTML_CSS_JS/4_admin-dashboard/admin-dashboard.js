requireRole(["Quản trị viên"]);

function loadDashboard() {
  // 1. Lấy dữ liệu mới nhất từ Fake API
  var users = api.get("users");
  var requests = api.get("requests");
  var points = api.get("points");
  var types = api.get("types");
  var notifications = api.get("notifications");

  // 2. Tính toán các chỉ số thống kê theo tiến độ thu gom
  var pendingCount = 0;   // Chờ phân công
  var inProgressCount = 0; // Đang xử lý / thu gom
  var doneCount = 0;       // Đã hoàn thành thu gom
  var doneKg = 0;          // Tổng kg rác đã thu gom

  for (var i = 0; i < requests.length; i++) {
    var req = requests[i];
    if (req.status === "Chờ phân công") {
      pendingCount++;
    } else if (req.status === "Đã phân công" || req.status === "Đang thu gom") {
      inProgressCount++;
    } else if (req.status === "Hoàn thành") {
      doneCount++;
      doneKg += Number(req.kg) || 0;
    }
  }

  // Danh sách các thẻ thống kê trực quan
  var stats = [
    { label: "Tổng yêu cầu", value: requests.length, color: "text-dark" },
    { label: "Chờ điều phối", value: pendingCount, color: "text-warning" },
    { label: "Đang thu gom", value: inProgressCount, color: "text-primary" },
    { label: "Đã thu gom xong", value: doneCount, color: "text-success" },
    { label: "Rác đã thu gom", value: doneKg + " kg", color: "text-success" },
    { label: "Điểm thu gom", value: points.length, color: "text-info" },
    { label: "Người dùng", value: users.length, color: "text-secondary" },
    { label: "Loại rác", value: types.length, color: "text-secondary" }
  ];

  var htmlStats = "";
  for (var s = 0; s < stats.length; s++) {
    htmlStats += "<div class='col-6 col-md-3 mb-2'>";
    htmlStats += "<div class='card p-3 h-100 shadow-sm border-0'>";
    htmlStats += "<div class='text-muted small mb-1'>" + stats[s].label + "</div>";
    htmlStats += "<div class='num " + stats[s].color + "'>" + stats[s].value + "</div>";
    htmlStats += "</div></div>";
  }
  document.getElementById("stats").innerHTML = htmlStats;

  // 3. Hiển thị bảng theo dõi tiến độ các điểm thu gom
  document.getElementById("total-badge").innerText = requests.length + " yêu cầu";
  var htmlRequests = "";
  if (requests.length === 0) {
    htmlRequests = "<tr><td colspan='7' class='text-center text-muted py-3'>Chưa có yêu cầu thu gom nào.</td></tr>";
  } else {
    // Sắp xếp yêu cầu mới nhất lên trên
    for (var r = requests.length - 1; r >= 0; r--) {
      var item = requests[r];
      var badgeClass = "bg-secondary";
      if (item.status === "Chờ phân công") badgeClass = "bg-warning text-dark";
      else if (item.status === "Đã phân công") badgeClass = "bg-primary";
      else if (item.status === "Đang thu gom") badgeClass = "bg-info text-dark";
      else if (item.status === "Hoàn thành") badgeClass = "bg-success";

      var staffText = item.staff ? item.staff : "<span class='text-muted italic'>Chưa giao</span>";

      htmlRequests += "<tr>";
      htmlRequests += "<td><strong>#" + item.id + "</strong></td>";
      htmlRequests += "<td>" + item.resident + "</td>";
      htmlRequests += "<td>📍 " + item.address + "</td>";
      htmlRequests += "<td>" + item.type + "</td>";
      htmlRequests += "<td>" + item.kg + " kg</td>";
      htmlRequests += "<td>" + staffText + "</td>";
      htmlRequests += "<td><span class='badge " + badgeClass + "'>" + item.status + "</span></td>";
      htmlRequests += "</tr>";
    }
  }
  document.getElementById("request-list").innerHTML = htmlRequests;

  // 4. Hiển thị danh sách Hoạt động gần đây (lấy từ dữ liệu thật)
  var htmlLogs = "";
  // Lấy các thông báo mới nhất
  var recentLogs = [];

  // Lấy từ thông báo hệ thống
  if (notifications && notifications.length > 0) {
    for (var n = notifications.length - 1; n >= 0 && recentLogs.length < 6; n--) {
      recentLogs.push({
        text: notifications[n].text,
        time: notifications[n].time
      });
    }
  }

  // Nếu thông báo còn ít, bổ sung thêm log tự động từ các đơn thu gom
  if (recentLogs.length < 3) {
    for (var q = requests.length - 1; q >= 0 && recentLogs.length < 5; q--) {
      var reqLog = requests[q];
      recentLogs.push({
        text: reqLog.resident + " đã gửi yêu cầu thu gom " + reqLog.type + " (" + reqLog.kg + "kg) tại " + reqLog.address,
        time: reqLog.date || "Gần đây"
      });
    }
  }

  for (var j = 0; j < recentLogs.length; j++) {
    htmlLogs += "<li class='list-group-item d-flex justify-content-between align-items-center py-2'>";
    htmlLogs += "<span>📌 " + recentLogs[j].text + "</span>";
    htmlLogs += "<small class='text-muted'>" + recentLogs[j].time + "</small>";
    htmlLogs += "</li>";
  }

  if (htmlLogs === "") {
    htmlLogs = "<li class='list-group-item text-muted py-2'>Chưa có hoạt động mới nào.</li>";
  }
  document.getElementById("logs").innerHTML = htmlLogs;
}

// Tự động tải dữ liệu khi mở trang
loadDashboard();
