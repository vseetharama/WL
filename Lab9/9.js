// Convert JSON text to JavaScript object
function convertJsonToObject() {
  const text = document.getElementById("jsonInput").value;
  try {
    const obj = JSON.parse(text);
    document.getElementById("objectOutput").textContent =JSON.stringify(obj, null, 2);
  } catch {
    document.getElementById("objectOutput").textContent = "Invalid JSON!";
  }
}
  
  // Convert JSON date text to JavaScript Date object
  function convertJsonToDate() {
  const text = document.getElementById("dateInput").value;

  try {
    const obj = JSON.parse(text);
    const date = new Date(obj.date);
    document.getElementById("dateOutput").textContent = date.toString();
  } catch {
    document.getElementById("dateOutput").textContent = "Invalid JSON or date!";
  }
}


  
  // Convert JSON to CSV
  function convertJsonToCsv() {
  const text = document.getElementById("jsonCsvInput").value;

  try {
    const arr = JSON.parse(text);
    const headers = Object.keys(arr[0]);
    let csv = headers.join(",") + "\n";

    arr.forEach(row => {
      csv += headers.map(h => row[h]).join(",") + "\n";
    });

    document.getElementById("csvOutput").textContent = csv.trim();
  } catch {
    document.getElementById("csvOutput").textContent = "Invalid JSON!";
  }
}
  
  // Convert CSV to JSON
  function convertCsvToJson() {
  const text = document.getElementById("csvToJsonInput").value;

  const lines = text.split("\n");
  const headers = lines[0].split(",");

  const json = lines.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};

    headers.forEach((h, i) => {
      obj[h] = values[i];
    });

    return obj;
  });

  document.getElementById("jsonOutput").textContent =
    JSON.stringify(json, null, 2);
}

  
  // Create a hash using crypto module
  // Create a hash using the Web Crypto API (SHA-256)
async function createHash() {
    const hashInput = document.getElementById('hashInput').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);
    
    // Use the Web Crypto API to generate a hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert hash buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    document.getElementById('hashOutput').textContent = `Hash: ${hashHex}`;
  }
  
  
