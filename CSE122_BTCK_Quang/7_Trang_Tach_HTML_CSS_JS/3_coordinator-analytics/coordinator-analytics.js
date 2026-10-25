requireRole(["Điều phối viên"]);

// Gọi Fake API lấy dữ liệu thống kê
var requests = api.get("requests");
var types = api.get("types");

var total = requests.length;
var done = 0;
for (var d = 0; d < requests.length; d++) {
  if (requests[d].status == "Hoàn thành") done++;
}

var wastes = [];
for (var t = 0; t < types.length; t++) {
  var sum = 0;
  for (var q = 0; q < requests.length; q++) {
    if (requests[q].type == types[t].name) sum += Number(requests[q].kg);
  }
  wastes.push({name: types[t].name, kg: sum});
}

document.getElementById("total").innerHTML = total;
document.getElementById("done").innerHTML = done;
document.getElementById("rate").innerHTML = (total == 0 ? 0 : Math.round(done / total * 100)) + "%";

var max = 0;
for (var i = 0; i < wastes.length; i++) {
  if (wastes[i].kg > max) max = wastes[i].kg;
}
if (max == 0) max = 1;

var html = "";
for (var j = 0; j < wastes.length; j++) {
  var percent = wastes[j].kg / max * 100;
  html += "<p class='mb-1'>" + wastes[j].name + ": " + wastes[j].kg + " kg</p>";
  html += "<div class='progress mb-3'><div class='progress-bar bg-success' style='width:" + percent + "%'></div></div>";
}
document.getElementById("bars").innerHTML = html;
