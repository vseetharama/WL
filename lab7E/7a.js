
function jsonToObject() {
  var text = document.getElementById("jsonInput").value;
  try {
    var obj = JSON.parse(text);
    document.getElementById("objectOutput").innerText =
      JSON.stringify(obj, null, 2);
  } catch {
    document.getElementById("objectOutput").innerText = "Invalid JSON";
  }
}


function jsonToDate() {
  const text = document.getElementById("dateInput").value;

  try {
    const obj = JSON.parse(text);
    const date = new Date(obj.date);
    document.getElementById("dateOutput").textContent = date.toString();
  } catch {
    document.getElementById("dateOutput").textContent = "Invalid JSON or date!";
  }
}

function jsonToCsv() {
  var text = document.getElementById("jsonCsvInput").value;

  try {
    var arr = JSON.parse(text);
    var headers = Object.keys(arr[0]);
    var csv = headers.join(",") + "\n";

    
    arr.forEach(function (obj) {
      var row = headers.map(h => obj[h]).join(",");
      csv += row + "\n";
    });

    document.getElementById("csvOutput").innerText = csv;
  } catch {
    document.getElementById("csvOutput").innerText = "Invalid JSON Array";
  }
}
function csvToJson() {
  var text = document.getElementById("csvToJsonInput").value;

  var rows = text.split("\n");
  var headers = rows[0].split(",");

  var result = [];

  for (var i = 1; i < rows.length; i++) {
    if (rows[i] === "") continue;

    var values = rows[i].split(",");
    var obj = {};

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j];
    }

    result.push(obj);
  }

  document.getElementById("jsonOutput").innerText =
    JSON.stringify(result, null, 2);
}


async function makeHash() {
    const hashInput = document.getElementById('hashInput').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);
    
   
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    document.getElementById('hashOutput').textContent = `Hash: ${hashHex}`;
  }
    