document.getElementById("ageForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let country = document.getElementById("country").value;
    let alive = document.getElementById("alive").value;
    let birthDateStr = document.getElementById("birthDate").value;
    let birthTimeStr = document.getElementById("birthTime").value || "00:00";
    let deathDateStr = document.getElementById("deathDate").value;

    // Parse birth datetime
    let [birthHour, birthMinute] = birthTimeStr.split(":").map(Number);
    let birthDate = new Date(birthDateStr);
    birthDate.setHours(birthHour, birthMinute);

    // Adjust for country timezone
    if (timezoneOffsets[country] !== undefined) {
        birthDate.setHours(birthDate.getHours() + timezoneOffsets[country]);
    }

    // Decide end date (death or now)
    let endDate;
    if (alive === "no" && deathDateStr) {
        endDate = new Date(deathDateStr);
    } else {
        endDate = new Date();
    }

    // Calculate difference
    let diffMs = endDate - birthDate;
    let diffSec = Math.floor(diffMs / 1000);
    let years = Math.floor(diffSec / (365*24*60*60));
    diffSec %= (365*24*60*60);
    let months = Math.floor(diffSec / (30*24*60*60));
    diffSec %= (30*24*60*60);
    let days = Math.floor(diffSec / (24*60*60));
    diffSec %= (24*60*60);
    let hours = Math.floor(diffSec / 3600);
    diffSec %= 3600;
    let minutes = Math.floor(diffSec / 60);
    let seconds = diffSec % 60;

    // Show result
    document.getElementById("result").innerText = 
        `Age: ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`;
});
