var areas = ["Hall", "Dining", "Bedroom", "Kitchen", "Balcony", "Bathroom", "Wash Area", "Elevation"];
var map = { "Hall": ["Flooring", "Wall"], "Dining": ["Flooring", "Wall"], "Bedroom": ["Flooring", "Wall"], "Kitchen": ["Wall", "Platform", "Flooring"], "Balcony": ["Flooring", "Wall"], "Bathroom": ["Wall", "Flooring"], "Wash Area": ["Flooring", "Wall"], "Elevation": ["Wall"] };
var selA = "Bathroom", selW = "Wall", selM = "Tile", selP = 10;
var rows = [["Bathroom", "Wall", 14, 7, 2, 10, "Tile"], ["Bathroom", "Flooring", 5, 4, 2, 10, "Tile"], ["Balcony", "Flooring", 14, 6, 1, 10, "Tile"], ["Balcony", "Flooring", 9, 3, 1, 10, "Tile"], ["Kitchen", "Platform", 10, 2.5, 1, 10, "Tile"], ["Kitchen", "Wall", 20, 4, 1, 10, "Tile"], ["Hall", "Flooring", 525, 1, 1, 10, "Tile"]];
var unitRates = Object.create(null);
var iconShapes = { tape: "<rect x='3' y='6' width='18' height='13' rx='2'/><path d='M7 6v5m4-5v3m4-3v5m4-5v3M3 16h6'/>", sofa: "<path d='M5 12V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3'/><path d='M5 11a2 2 0 0 0-2 2v5h18v-5a2 2 0 0 0-2-2'/><path d='M5 18v2m14-2v2M7 13h10v5H7z'/>", bed: "<path d='M3 5v16M3 13h18v8M3 9h6a3 3 0 0 1 3 3v1M12 10h5a4 4 0 0 1 4 4v-1'/>", kitchen: "<path d='M4 3v7m4-7v7M6 3v18M16 3v18m0-18c3 2 4 5 0 8'/>", dining: "<path d='M3 10h18M5 10v10m14-10v10M8 6v4m8-4v4M10 10V6h4v4M3 20h18'/>", balcony: "<path d='M3 8h18M5 8v13m14-13v13M3 14h18M3 21h18M9 8V5a3 3 0 0 1 6 0v3'/>", shower: "<path d='M4 10V6a3 3 0 0 1 6 0v1M2 10h14a4 4 0 0 1 4 4v1M6 17v.01M10 19v.01M14 17v.01M18 18v.01'/>", washer: "<rect x='4' y='3' width='16' height='18' rx='2'/><path d='M4 8h16M8 5h.01M11 5h.01'/><circle cx='12' cy='14' r='4'/>", building: "<path d='M4 21V4h16v17M8 8h2m4 0h2M8 12h2m4 0h2M10 21v-4h4v4'/>", floor: "<path d='M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18'/>", wall: "<path d='M3 4h18v16H3zM3 9h18M3 15h18M8 4v5m8 0v6M8 15v5'/>", platform: "<path d='M3 9h18M5 9v12h14V9M5 14h14M8 11v2m4-2v2m4-2v2'/>", tile: "<path d='M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'/>", granite: "<path d='m3 16 3-8 5-4 7 2 4 7-5 7H7zM6 8l5 4 7-2M11 4l1 8 5 8'/>", info: "<circle cx='12' cy='12' r='9'/><path d='M12 11v5m0-8h.01'/>", calendar: "<rect x='3' y='5' width='18' height='16' rx='2'/><path d='M16 3v4M8 3v4M3 10h18'/>", person: "<circle cx='12' cy='8' r='4'/><path d='M4 21a8 8 0 0 1 16 0'/>", pin: "<path d='M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z'/><circle cx='12' cy='10' r='2.5'/>", ruler: "<path d='M3 7h18v10H3zM7 7v4m4-4v2m4-2v4m4-4v2'/>", dimension: "<path d='M4 12h16M4 12l4-4m-4 4 4 4m12-4-4-4m4 4-4 4'/>", quantity: "<path d='M4 5h4v4H4zM11 7h9M4 15h4v4H4zM11 17h9'/>", plus: "<path d='M12 5v14M5 12h14'/>", trash: "<path d='M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3'/>", eye: "<path d='M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z'/><circle cx='12' cy='12' r='3'/>", printer: "<path d='M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6zM18 12h.01'/>", back: "<path d='m10 5-7 7 7 7M3 12h18'/>", sun: "<circle cx='12' cy='12' r='4'/><path d='M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42'/>", moon: "<path d='M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z'/>" };
iconShapes.money = "<circle cx='12' cy='12' r='9'/><path d='M15 8.5c-.6-.8-1.5-1.2-2.7-1.2-1.4 0-2.3.7-2.3 1.7 0 2.7 5 1.2 5 4.2 0 1.1-1 2-2.6 2-1.2 0-2.2-.4-2.9-1.2M12.5 5.5v13'/>";
function createIcon(name, className) { var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("fill", "none"); svg.setAttribute("stroke", "currentColor"); svg.setAttribute("stroke-width", "1.8"); svg.setAttribute("stroke-linecap", "round"); svg.setAttribute("stroke-linejoin", "round"); svg.setAttribute("aria-hidden", "true"); if (className) svg.setAttribute("class", className); svg.innerHTML = iconShapes[name]; return svg }
function hydrateIcons() { document.querySelectorAll("[data-icon]").forEach(function (el) { el.replaceChildren(createIcon(el.getAttribute("data-icon"))) }) }
var choiceIcons = { areaBtns: { "Hall": "sofa", "Dining": "dining", "Bedroom": "bed", "Kitchen": "kitchen", "Balcony": "balcony", "Bathroom": "shower", "Wash Area": "washer", "Elevation": "building" }, workBtns: { "Flooring": "floor", "Wall": "wall", "Platform": "platform" }, materialBtns: { "Tile": "tile", "Granite": "granite" } };
function draw(el, list, sel, cb) { var d = document.getElementById(el); d.innerHTML = ""; list.forEach(function (x) { var b = document.createElement("button"); b.className = "choice"; b.type = "button"; if (choiceIcons[el] && choiceIcons[el][x]) b.appendChild(createIcon(choiceIcons[el][x], "choice-icon")); var label = document.createElement("span"); label.textContent = typeof x === "number" ? x + "%" : x; b.appendChild(label); b.setAttribute("aria-pressed", String(x === sel)); b.onclick = function () { cb(x) }; d.appendChild(b) }) }
function refresh() { draw("areaBtns", areas, selA, function (x) { selA = x; selW = map[x][0]; refresh() }); draw("workBtns", map[selA], selW, function (x) { selW = x; refresh() }); draw("materialBtns", ["Tile", "Granite"], selM, function (x) { selM = x; refresh() }); draw("wastBtns", [0, 5, 10, 15, 20], selP, function (x) { selP = x; refresh() }); document.getElementById("workLabel").textContent = "2 · Select Work Type — " + selA; updatePreview(); render() }
function updatePreview() { var l = parseFloat(document.getElementById("len").value) || 0; var w = parseFloat(document.getElementById("wid").value) || 0; var q = parseFloat(document.getElementById("qty").value) || 0; var sq = l * w * q; document.getElementById("previewText").textContent = "Preview: " + sq.toFixed(1) + " sq ft + " + selP + "% wastage ="; document.getElementById("previewTotal").textContent = (sq + sq * selP / 100).toFixed(1) + " final sq ft" }
function render() { var tb = document.getElementById("tb"); tb.innerHTML = ""; var a = 0, b = 0, c = 0; rows.forEach(function (r, i) { var sq = r[2] * r[3] * r[4]; var waste = sq * r[5] / 100; var final = sq + waste; a += sq; b += waste; c += final; tb.innerHTML += "<tr><td data-label='Area'>" + r[0] + "</td><td data-label='Work'>" + r[1] + "</td><td data-label='Material'>" + r[6] + "</td><td data-label='Length'>" + r[2] + "</td><td data-label='Width'>" + r[3] + "</td><td data-label='Quantity'>" + r[4] + "</td><td data-label='Sq Ft'>" + sq.toFixed(1) + "</td><td data-label='Wastage'>" + r[5] + "%</td><td data-label='Wastage Sq Ft'>" + waste.toFixed(1) + "</td><td data-label='Final Sq Ft'><b>" + final.toFixed(1) + "</b></td><td data-label='Action'><button class='del' type='button' data-row-index='" + i + "' aria-label='Remove " + r[0] + " " + r[1] + "'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>" + iconShapes.trash + "</svg> Remove</button></td></tr>" }); if (!rows.length) tb.innerHTML = "<tr><td class='empty' colspan='11'>No measurements yet. Add one above to get started.</td></tr>"; document.getElementById("t1").textContent = a.toFixed(1); document.getElementById("t2").textContent = b.toFixed(1); document.getElementById("t3").textContent = c.toFixed(1); document.getElementById("statArea").textContent = a.toFixed(1); document.getElementById("statWaste").textContent = b.toFixed(1); document.getElementById("statFinal").textContent = c.toFixed(1); document.getElementById("clearBtn").disabled = !rows.length }
function addRow() { var l = parseFloat(document.getElementById("len").value) || 0; var w = parseFloat(document.getElementById("wid").value) || 0; var q = parseFloat(document.getElementById("qty").value) || 1; rows.push([selA, selW, l, w, q, selP, selM]); render() }
function delRow(i) { rows.splice(i, 1); render() }
function clearAll() { rows = []; render() }
function setActiveNavigation(view) {
  document.querySelectorAll(".bottom-nav [data-view]").forEach(function (button) {
    if (button.getAttribute("data-view") === view) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
}
function showCalculator() {
  document.getElementById("priceWrap").hidden = true;
  document.getElementById("summaryWrap").hidden = true;
  document.getElementById("calculatorView").hidden = false;
  setActiveNavigation("measure");
  window.scrollTo(0, 0);
}
function showSummary() { document.getElementById("sCust").textContent = document.getElementById("cust").value; document.getElementById("sSite").textContent = document.getElementById("site").value; document.getElementById("sDate").textContent = document.getElementById("date").value; var st = document.getElementById("sTb"); st.innerHTML = ""; var total = 0; rows.forEach(function (r) { var sq = r[2] * r[3] * r[4]; var final = sq + sq * r[5] / 100; total += final; st.innerHTML += "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td><td>" + r[6] + "</td><td>" + r[4] + "</td><td><b>" + final.toFixed(1) + "</b></td></tr>" }); if (!rows.length) st.innerHTML = "<tr><td colspan='5'>No measurements added.</td></tr>"; document.getElementById("sTot").textContent = total.toFixed(1); document.getElementById("priceWrap").hidden = true; document.getElementById("calculatorView").hidden = true; document.getElementById("summaryWrap").hidden = false; setActiveNavigation("summary"); window.scrollTo(0, 0) }
function hideSummary() { showCalculator() }
function rateKey(work, material) { return JSON.stringify([work, material]) }
function getRateTypes() {
  var types = [], seen = Object.create(null);
  rows.forEach(function (r) {
    var key = rateKey(r[1], r[6]);
    if (!seen[key]) { seen[key] = true; types.push({ key: key, work: r[1], material: r[6] }) }
  });
  return types;
}
function formatRupees(value) { return "₹ " + value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function updatePriceDetails() {
  var body = document.getElementById("priceTb"), totalSqFt = 0, totalAmount = 0, hasMissingRate = false;
  body.replaceChildren();
  rows.forEach(function (r) {
    var tr = document.createElement("tr"), finalSqFt = r[2] * r[3] * r[4] * (1 + r[5] / 100), key = rateKey(r[1], r[6]);
    var rate = unitRates[key], hasRate = typeof rate === "number" && Number.isFinite(rate) && rate >= 0;
    var amount = hasRate ? finalSqFt * rate : null;
    totalSqFt += finalSqFt;
    if (hasRate) totalAmount += amount; else hasMissingRate = true;
    [r[0], r[1], r[6], finalSqFt.toFixed(1), hasRate ? formatRupees(rate) : "—", hasRate ? formatRupees(amount) : "—"].forEach(function (value) {
      var cell = document.createElement("td");
      cell.textContent = value;
      tr.appendChild(cell);
    });
    body.appendChild(tr);
  });
  if (!rows.length) {
    var empty = document.createElement("tr"), cell = document.createElement("td");
    cell.colSpan = 6; cell.className = "empty"; cell.textContent = "No measurements added.";
    empty.appendChild(cell); body.appendChild(empty);
  }
  document.getElementById("priceSqFt").textContent = totalSqFt.toFixed(1);
  document.getElementById("priceTotal").textContent = hasMissingRate ? "Enter all rates" : formatRupees(totalAmount);
  document.getElementById("priceStatus").textContent = !rows.length ? "Add measurements before setting prices." : hasMissingRate ? "Enter a rate for every work and material combination to calculate the total." : "All rates are entered.";
  document.getElementById("generatePricePdfButton").disabled = !rows.length || hasMissingRate;
  document.getElementById("sharePricePdfButton").disabled = !rows.length || hasMissingRate;
}
function showPriceSummary() {
  document.getElementById("pCust").textContent = document.getElementById("cust").value;
  document.getElementById("pSite").textContent = document.getElementById("site").value;
  document.getElementById("pDate").textContent = document.getElementById("date").value;
  var rateBody = document.getElementById("rateTb");
  rateBody.replaceChildren();
  var types = getRateTypes();
  if (!types.length) {
    var empty = document.createElement("tr"), cell = document.createElement("td");
    cell.colSpan = 3; cell.className = "empty"; cell.textContent = "No work and material combinations to price.";
    empty.appendChild(cell); rateBody.appendChild(empty);
  }
  types.forEach(function (type, index) {
    var tr = document.createElement("tr"), workCell = document.createElement("td"), materialCell = document.createElement("td"), rateCell = document.createElement("td");
    var input = document.createElement("input"), rate = unitRates[type.key];
    workCell.textContent = type.work; materialCell.textContent = type.material;
    input.type = "number"; input.min = "0"; input.step = "any"; input.id = "unitRate" + index; input.inputMode = "decimal";
    input.setAttribute("aria-label", type.work + " " + type.material + " rate per square foot");
    input.value = typeof rate === "number" ? String(rate) : "";
    input.addEventListener("input", function () {
      if (input.value === "" || !Number.isFinite(Number(input.value)) || Number(input.value) < 0) delete unitRates[type.key];
      else unitRates[type.key] = Number(input.value);
      updatePriceDetails();
    });
    rateCell.appendChild(input); tr.appendChild(workCell); tr.appendChild(materialCell); tr.appendChild(rateCell); rateBody.appendChild(tr);
  });
  updatePriceDetails();
  document.getElementById("calculatorView").hidden = true;
  document.getElementById("summaryWrap").hidden = true;
  document.getElementById("priceWrap").hidden = false;
  setActiveNavigation("price");
  window.scrollTo(0, 0);
}
function hidePriceSummary() {
  document.getElementById("priceWrap").hidden = true;
  document.getElementById("summaryWrap").hidden = false;
  setActiveNavigation("summary");
  window.scrollTo(0, 0);
}
function createSummaryPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) throw new Error("The PDF generator could not be loaded. Check your internet connection and try again.");
  var doc = new window.jspdf.jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  var pageWidth = doc.internal.pageSize.getWidth(), pageHeight = doc.internal.pageSize.getHeight(), margin = 12;
  var columns = [58, 48, 45, 44, 78], headers = ["Area Name", "Work Type", "Material", "Quantity", "Final Sq Ft"], xPositions = [margin], y = 14;
  columns.forEach(function (width, i) { if (i < columns.length - 1) xPositions.push(xPositions[i] + width) });
  var title = document.getElementById("summaryTitle").textContent.replace(/[–—]/g, "-").trim();
  doc.setFont("helvetica", "bold"); doc.setFontSize(24); doc.text(title, pageWidth / 2, y, { align: "center" }); y += 12;
  doc.setFontSize(13); doc.setFont("helvetica", "normal");
  var customer = document.getElementById("cust").value || "-", site = document.getElementById("site").value || "-", date = document.getElementById("date").value || "-";
  ["Customer: " + customer, "Site: " + site, "Date: " + date].forEach(function (detail) {
    var lines = doc.splitTextToSize(detail, pageWidth - margin * 2);
    doc.text(lines, margin, y); y += Math.max(7, lines.length * 6 + 1);
  });
  y += 3;
  function drawHeader() {
    doc.setFillColor(240, 238, 232); doc.rect(margin, y, pageWidth - margin * 2, 12, "F"); doc.setFont("helvetica", "bold"); doc.setFontSize(12);
    headers.forEach(function (header, i) { doc.text(header, xPositions[i] + 2, y + 8) }); y += 12; doc.setFont("helvetica", "normal");
  }
  drawHeader(); doc.setFontSize(12);
  var total = 0;
  if (!rows.length) { doc.text("No measurements added.", margin + 2, y + 8); y += 12 }
  else rows.forEach(function (r) {
    var final = r[2] * r[3] * r[4] * (1 + r[5] / 100); total += final;
    var values = [r[0], r[1], r[6], String(r[4]), final.toFixed(1)];
    var cellLines = values.map(function (value, i) { return doc.splitTextToSize(value, columns[i] - 4) });
    var lineCount = Math.max.apply(null, cellLines.map(function (lines) { return lines.length })), rowHeight = Math.max(13, lineCount * 6 + 5);
    if (y + rowHeight > pageHeight - 18) { doc.addPage(); y = 14; drawHeader() }
    cellLines.forEach(function (lines, i) { doc.text(lines, xPositions[i] + 2, y + 8) });
    doc.setDrawColor(215, 212, 206); doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight); y += rowHeight;
  });
  if (y + 13 > pageHeight - 12) { doc.addPage(); y = 14 }
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setFillColor(255, 226, 122); doc.rect(margin, y, pageWidth - margin * 2, 12, "F");
  doc.text("TOTAL", margin + 2, y + 8); doc.text(total.toFixed(1), pageWidth - margin - 2, y + 8, { align: "right" }); y += 17;
  var signature = document.querySelector("#summaryWrap .signature");
  if (signature) {
    if (y + 10 > pageHeight - 12) { doc.addPage(); y = 14 }
    doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.text(signature.textContent, margin, y);
  }
  var pageCount = doc.internal.getNumberOfPages();
  for (var page = 1; page <= pageCount; page++) { doc.setPage(page); doc.setFontSize(10); doc.text("Page " + page + " of " + pageCount, pageWidth - margin, pageHeight - 6, { align: "right" }) }
  var fileDate = date === "-" ? new Date().toISOString().slice(0, 10) : date;
  var safeCustomer = customer.trim().replace(/[<>:"/\\|?*\x00-\x1f]/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").replace(/\.+$/g, "").slice(0, 60) || "customer";
  return { blob: doc.output("blob"), name: safeCustomer + "-" + fileDate + ".pdf" };
}
function createPricePdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) throw new Error("The PDF generator could not be loaded. Check your internet connection and try again.");
  if (!rows.length) throw new Error("Add measurements before generating the price summary.");
  var types = getRateTypes();
  if (types.some(function (type) { return typeof unitRates[type.key] !== "number" || !Number.isFinite(unitRates[type.key]) || unitRates[type.key] < 0 })) {
    throw new Error("Enter a rate for every work and material combination before generating the price summary.");
  }
  var doc = new window.jspdf.jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  var pageWidth = doc.internal.pageSize.getWidth(), pageHeight = doc.internal.pageSize.getHeight(), margin = 12;
  var columns = [48, 42, 40, 44, 44, 55], headers = ["Area", "Work", "Material", "Final Sq Ft", "Rate / Sq Ft", "Amount"], xPositions = [margin], y = 14;
  columns.forEach(function (width, i) { if (i < columns.length - 1) xPositions.push(xPositions[i] + width) });
  doc.setFont("helvetica", "bold"); doc.setFontSize(24); doc.text("Final Measurements & Price Summary", pageWidth / 2, y, { align: "center" }); y += 12;
  doc.setFont("helvetica", "normal"); doc.setFontSize(13);
  var customer = document.getElementById("cust").value || "-", site = document.getElementById("site").value || "-", date = document.getElementById("date").value || "-";
  ["Customer: " + customer, "Site: " + site, "Date: " + date].forEach(function (detail) {
    var lines = doc.splitTextToSize(detail, pageWidth - margin * 2);
    doc.text(lines, margin, y); y += Math.max(7, lines.length * 6 + 1);
  });
  y += 3;
  function drawHeader() {
    doc.setFillColor(240, 238, 232); doc.rect(margin, y, pageWidth - margin * 2, 12, "F"); doc.setFont("helvetica", "bold"); doc.setFontSize(12);
    headers.forEach(function (header, i) { doc.text(header, xPositions[i] + 2, y + 8) }); y += 12; doc.setFont("helvetica", "normal");
  }
  drawHeader(); doc.setFontSize(12);
  var totalSqFt = 0, totalAmount = 0;
  rows.forEach(function (r) {
    var finalSqFt = r[2] * r[3] * r[4] * (1 + r[5] / 100), rate = unitRates[rateKey(r[1], r[6])], amount = finalSqFt * rate;
    totalSqFt += finalSqFt; totalAmount += amount;
    var values = [r[0], r[1], r[6], finalSqFt.toFixed(1), "INR " + rate.toFixed(2), "INR " + amount.toFixed(2)];
    var cellLines = values.map(function (value, i) { return doc.splitTextToSize(value, columns[i] - 4) });
    var lineCount = Math.max.apply(null, cellLines.map(function (lines) { return lines.length })), rowHeight = Math.max(13, lineCount * 6 + 5);
    if (y + rowHeight > pageHeight - 18) { doc.addPage(); y = 14; drawHeader() }
    cellLines.forEach(function (lines, i) { doc.text(lines, xPositions[i] + 2, y + 8) });
    doc.setDrawColor(215, 212, 206); doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight); y += rowHeight;
  });
  if (y + 13 > pageHeight - 12) { doc.addPage(); y = 14 }
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setFillColor(255, 226, 122); doc.rect(margin, y, pageWidth - margin * 2, 12, "F");
  doc.text("TOTAL", margin + 2, y + 8); doc.text(totalSqFt.toFixed(1), xPositions[3] + 2, y + 8); doc.text("INR " + totalAmount.toFixed(2), pageWidth - margin - 2, y + 8, { align: "right" });
  var pageCount = doc.internal.getNumberOfPages();
  for (var page = 1; page <= pageCount; page++) { doc.setPage(page); doc.setFontSize(10); doc.text("Page " + page + " of " + pageCount, pageWidth - margin, pageHeight - 6, { align: "right" }) }
  var fileDate = date === "-" ? new Date().toISOString().slice(0, 10) : date;
  var safeCustomer = customer.trim().replace(/[<>:"/\\|?*\x00-\x1f]/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").replace(/\.+$/g, "").slice(0, 60) || "customer";
  return { blob: doc.output("blob"), name: safeCustomer + "-" + fileDate + ".pdf" };
}
function downloadPdf(file) {
  var url = URL.createObjectURL(file.blob), link = document.createElement("a");
  link.href = url; link.download = file.name; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(function () { URL.revokeObjectURL(url) }, 1000);
}
function generatePdf() { try { downloadPdf(createSummaryPdf()) } catch (error) { alert(error.message) } }
function generatePricePdf() { try { downloadPdf(createPricePdf()) } catch (error) { alert(error.message) } }
async function sharePdfOnWhatsApp() {
  var file;
  try { file = createSummaryPdf() } catch (error) { alert(error.message); return }
  var pdfFile = new File([file.blob], file.name, { type: "application/pdf" });
  if (navigator.canShare && navigator.share && navigator.canShare({ files: [pdfFile] })) {
    try { await navigator.share({ files: [pdfFile], title: "Anwar Tape - Summary", text: "Measurement summary PDF" }) }
    catch (error) { if (error.name !== "AbortError") alert("Could not share the PDF: " + error.message) }
    return;
  }
  downloadPdf(file);
  var customer = document.getElementById("cust").value.trim();
  var message = "Measurement summary" + (customer ? " for " + customer : "") + " - please see the attached PDF.";
  window.open("https://wa.me/?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  alert("The PDF has been downloaded. Attach it to your WhatsApp message to share it.");
}
async function sharePricePdfOnWhatsApp() {
  var file;
  try { file = createPricePdf() } catch (error) { alert(error.message); return }
  var pdfFile = new File([file.blob], file.name, { type: "application/pdf" });
  if (navigator.canShare && navigator.share && navigator.canShare({ files: [pdfFile] })) {
    try { await navigator.share({ files: [pdfFile], title: "Final Measurements & Price Summary", text: "Measurement and price summary PDF" }) }
    catch (error) { if (error.name !== "AbortError") alert("Could not share the PDF: " + error.message) }
    return;
  }
  downloadPdf(file);
  var customer = document.getElementById("cust").value.trim();
  var message = "Measurement and price summary" + (customer ? " for " + customer : "") + " - please see the attached PDF.";
  window.open("https://wa.me/?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  alert("The PDF has been downloaded. Attach it to your WhatsApp message to share it.");
}
function setTheme(theme) { document.documentElement.dataset.theme = theme; var light = theme === "light"; document.getElementById("themeIcon").replaceChildren(createIcon(light ? "moon" : "sun")); document.getElementById("themeLabel").textContent = light ? "Dark mode" : "Light mode"; document.getElementById("themeToggle").setAttribute("aria-label", "Switch to " + (light ? "dark" : "light") + " theme"); document.querySelector('meta[name="theme-color"]').content = light ? "#f4f3ef" : "#171612" }
function toggleTheme() { setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light") }
["len", "wid", "qty"].forEach(function (id) { document.getElementById(id).addEventListener("input", updatePreview) });
document.getElementById("themeToggle").addEventListener("click", toggleTheme);
document.getElementById("summaryButton").addEventListener("click", showSummary);
document.getElementById("viewSummaryButton").addEventListener("click", showSummary);
document.getElementById("addMeasurementButton").addEventListener("click", addRow);
document.getElementById("clearBtn").addEventListener("click", clearAll);
document.getElementById("clearAllButton").addEventListener("click", clearAll);
document.getElementById("generatePdfButton").addEventListener("click", generatePdf);
document.getElementById("sharePdfButton").addEventListener("click", sharePdfOnWhatsApp);
document.getElementById("backButton").addEventListener("click", hideSummary);
document.getElementById("priceSummaryButton").addEventListener("click", showPriceSummary);
document.getElementById("generatePricePdfButton").addEventListener("click", generatePricePdf);
document.getElementById("sharePricePdfButton").addEventListener("click", sharePricePdfOnWhatsApp);
document.getElementById("backToMeasurementsButton").addEventListener("click", hidePriceSummary);
document.getElementById("bottomNav").addEventListener("click", function (event) {
  var button = event.target.closest("[data-view]");
  if (!button) return;
  var view = button.getAttribute("data-view");
  if (view === "measure") showCalculator();
  else if (view === "summary") showSummary();
  else if (view === "price") showPriceSummary();
});
document.getElementById("tb").addEventListener("click", function (event) { var button = event.target.closest("[data-row-index]"); if (button) delRow(Number(button.getAttribute("data-row-index"))) });
var installPromptEvent;
window.addEventListener("beforeinstallprompt", function (event) {
  event.preventDefault();
  installPromptEvent = event;
  document.getElementById("installAppButton").hidden = false;
});
document.getElementById("installAppButton").addEventListener("click", async function () {
  if (!installPromptEvent) return;
  installPromptEvent.prompt();
  var choice = await installPromptEvent.userChoice;
  installPromptEvent = null;
  document.getElementById("installAppButton").hidden = true;
  if (choice.outcome === "accepted") document.getElementById("installAppButton").textContent = "App Installed";
});
window.addEventListener("appinstalled", function () { document.getElementById("installAppButton").hidden = true });
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./service-worker.js").catch(function (error) { console.error("Could not register the app for offline use.", error) });
}
hydrateIcons(); document.getElementById("date").valueAsDate = new Date(); setTheme("light"); refresh();
