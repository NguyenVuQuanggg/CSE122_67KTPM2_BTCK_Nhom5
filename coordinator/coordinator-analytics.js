var total = 40;
var done = 31;
var wastes = [
  {name: "Hữu cơ", kg: 120},
  {name: "Tái chế", kg: 80},
  {name: "Nguy hại", kg: 15}
];
document.getElementById("total").innerHTML = total;
document.getElementById("done").innerHTML = done;
document.getElementById("rate").innerHTML = Math.round(done / total * 100) + "%";
var max = 0;
for (var i = 0; i < wastes.length; i++) {
  if (wastes[i].kg > max) max = wastes[i].kg;
}
var html = "";
for (var j = 0; j < wastes.length; j++) {
  var percent = wastes[j].kg / max * 100;
  html += "<p class='mb-1'>" + wastes[j].name + ": " + wastes[j].kg + "</p>";
  html += "<div class='progress mb-3'><div class='progress-bar bg-success' style='width:" + percent + "%'></div></div>";
}
document.getElementById("bars").innerHTML = html;