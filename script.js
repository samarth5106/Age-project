document.addEventListener("DOMContentLoaded", function () {
  
  function toggleDeathInput() {
    const deathInputs = document.getElementById("deathInputs");
    const aliveRadios = document.getElementsByName("alive");

    for (let radio of aliveRadios) {
      if (radio.checked && radio.value === "dead") {
        deathInputs.classList.remove("hidden");
        return;
      }
    }
    deathInputs.classList.add("hidden");
  }
  window.toggleDeathInput = toggleDeathInput; // 👈 make it available to onclick in HTML

  // Dynamic update of alive question
  document.getElementById("name").addEventListener("input", function () {
    const name = this.value.trim();
    const aliveQuestion = document.getElementById("aliveQuestion");

    if (name) {
      aliveQuestion.innerText = `Is ${name} still alive?`;
    } else {
      aliveQuestion.innerText = "Is the person still alive?";
    }
  });

  function calculateAge() {
    const name = document.getElementById("name").value.trim();
    const country = document.getElementById("country").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const birthtime = document.getElementById("birthtime").value;

    if (!birthdate || !birthtime) {
      document.getElementById("result").innerText = "⚠️ Please enter birth date and time.";
      return;
    }

    // Parse birth details
    const birth = new Date(birthdate + "T" + birthtime);
    let birth_yr = birth.getFullYear();
    let birth_month = birth.getMonth() + 1;
    let birth_day = birth.getDate();
    let birth_hr = birth.getHours();

    let currentDate = new Date(); // UTC now
    let currnt_yr = currentDate.getUTCFullYear();
    let currnt_month = currentDate.getUTCMonth() + 1;
    let currnt_day = currentDate.getUTCDate();
    let currnt_hr = currentDate.getUTCHours();

    // Country timezone offsets
    const timeZoneOffsets = {
      "India": 5,
      "USA": -5,
      "UK": 0,
      "Germany": 1,
      "Australia": 10,
      "Japan": 9,
      "China": 8,
      "Russia": 3
    };

    if (timeZoneOffsets[country]) {
      currnt_hr += timeZoneOffsets[country];
      if (currnt_hr >= 24) {
        currnt_hr -= 24;
        currnt_day++;
      } else if (currnt_hr < 0) {
        currnt_hr += 24;
        currnt_day--;
      }
    } else {
      alert("Country not found in database! Using UTC time.");
    }

    // Days in month
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((currnt_yr % 4 === 0 && currnt_yr % 100 !== 0) || (currnt_yr % 400 === 0)) {
      daysInMonth[1] = 29;
    }

    // Alive or Dead?
    let aliveRadios = document.getElementsByName("alive");
    let alive = "alive";
    for (let radio of aliveRadios) {
      if (radio.checked) {
        alive = radio.value;
      }
    }

    if (alive === "dead") {
      const deathdate = document.getElementById("deathdate").value;
      const deathtime = document.getElementById("deathtime").value;
      if (!deathdate || !deathtime) {
        document.getElementById("result").innerText = "⚠️ Please enter death date and time.";
        return;
      }

      let death = new Date(deathdate + "T" + deathtime);
      currnt_yr = death.getFullYear();
      currnt_month = death.getMonth() + 1;
      currnt_day = death.getDate();
      currnt_hr = death.getHours();
    }

    // Calculate difference
    let age_yr = currnt_yr - birth_yr;
    let age_mon = currnt_month - birth_month;
    let age_day = currnt_day - birth_day;
    let age_hr = currnt_hr - birth_hr;

    if (age_hr < 0) {
      age_hr += 24;
      age_day--;
    }

    if (age_day < 0) {
      age_mon--;
      let prevMonth = currnt_month === 1 ? 12 : currnt_month - 1;
      age_day += daysInMonth[prevMonth - 1];
    }

    if (age_mon < 0) {
      age_yr--;
      age_mon += 12;
    }

    // Output
    document.getElementById("result").innerText =
      `👤 ${name || "The person"} is ${age_yr} years, ${age_mon} months, ${age_day} days, and ${age_hr} hours OLD in ${country || "UTC"}.`;
  }

  window.calculateAge = calculateAge; // 👈 expose globally for button onclick
});
