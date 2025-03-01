function togglePhysicsExperiments() {
    var experiments = document.getElementById("physics-experiments");
    if (experiments.style.display === "none") {
        experiments.style.display = "block";
    } else {
        experiments.style.display = "none";
    }
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'ta,te', // Tamil and Telugu
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Add the Google Translate API script dynamically
let translateScript = document.createElement("script");
translateScript.type = "text/javascript";
translateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(translateScript);

function calculateCurrent() {
    let voltage = parseFloat(document.getElementById("voltage").value) || 0;
    let resistance = parseFloat(document.getElementById("resistance").value) || 0;
    let ammeterResistance = parseFloat(document.getElementById("ammeterResistance").value) || 0;

    if (resistance > 0) {
        let current = voltage / (resistance + ammeterResistance);
        document.getElementById("measuredCurrent").innerText = `Current: ${current.toFixed(3)} A`;
        updateResultsTable(voltage, resistance, ammeterResistance, current);
        drawAmmeter(current);
        drawRheostat(resistance);
    }
}

function updateResultsTable(voltage, resistance, ammeterResistance, current) {
    let table = document.getElementById("resultsTable");
    let row = table.insertRow();
    row.innerHTML = `<td>${voltage}</td><td>${resistance}</td><td>${ammeterResistance}</td><td>${current.toFixed(3)}</td>`;
}

function resetExperiment() {
    document.getElementById("voltage").value = "";
    document.getElementById("resistance").value = "";
    document.getElementById("ammeterResistance").value = "";
    document.getElementById("measuredCurrent").innerText = "Current: 0 A";
    document.getElementById("resultsTable").innerHTML = "";
    clearCanvas("ammeterCanvas");
    clearCanvas("rheostatCanvas");
}

function drawAmmeter(current) {
    let canvas = document.getElementById("ammeterCanvas");
    let ctx = canvas.getContext("2d");
    clearCanvas("ammeterCanvas");

    ctx.fillStyle = "#ff3b3b";
    ctx.font = "16px Arial";
    ctx.fillText(`Ammeter: ${current.toFixed(3)} A`, 40, 50);
}

function drawRheostat(resistance) {
    let canvas = document.getElementById("rheostatCanvas");
    let ctx = canvas.getContext("2d");
    clearCanvas("rheostatCanvas");

    ctx.fillStyle = "#3f37c9";
    ctx.font = "16px Arial";
    ctx.fillText(`Rheostat: ${resistance} Ω`, 40, 50);
}

function clearCanvas(canvasId) {
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if user has a preference stored
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.innerText = "☀️ Light Mode";
    }

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.innerText = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.innerText = "🌙 Dark Mode";
        }
    });
});