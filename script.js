document.getElementById("calculateage").addEventListener("click", function () {
     alert("Button clicked!");
    const birthDateInput = document.getElementById("birthDate").value;
    const alive = document.querySelector('input[name="alive"]:checked');

    if (!birthDateInput || !alive) {
        alert("⚠️ Please fill all required inputs.");
        return;
    }

    let birthDate = new Date(birthDateInput);
    let endDate;

    if (alive.value === "yes") {
        endDate = new Date(); // current time
    } else {
        const deathDateInput = document.getElementById("deathDate").value;
        if (!deathDateInput) {
            alert("⚠️ Please enter death date.");
            return;
        }
        endDate = new Date(deathDateInput);
    }

    if (endDate < birthDate) {
        alert("⚠️ Death/End date cannot be before birth date.");
        return;
    }

    // --- Precise Age Calculation (Y/M/D/H/M/S) ---
    let years = endDate.getFullYear() - birthDate.getFullYear();
    let months = endDate.getMonth() - birthDate.getMonth();
    let days = endDate.getDate() - birthDate.getDate();
    let hours = endDate.getHours() - birthDate.getHours();
  //  let minutes = endDate.getMinutes() - birthDate.getMinutes();
   //let seconds = endDate.getSeconds() - birthDate.getSeconds();

    // Adjust negatives (borrowing logic like in C++)
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        let prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    // --- Output ---
    document.getElementById("result").innerHTML = `
        <b>Precise Age:</b><br>
        ${years} Years, ${months} Months, ${days} Days, 
        ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds
    `;
});

// Show/Hide death date input depending on Alive/Dead
document.querySelectorAll('input[name="alive"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        const deathDateDiv = document.getElementById("deathDateDiv");
        if (this.value === "no") {
            deathDateDiv.style.display = "block";
        } else {
            deathDateDiv.style.display = "none";
        }
    });
});
