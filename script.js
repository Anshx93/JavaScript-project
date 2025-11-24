// PAGE SWITCHING
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");
}

// SAVE CAPSULE
function saveCapsule() {
    let msg = document.getElementById("message").value;
    let date = document.getElementById("unlockDate").value;
    let pass = document.getElementById("password").value;

    let saved = document.getElementById("saved");
    let countdown = document.getElementById("countdown");

    if (!msg || !date || !pass) {
        alert("Fill all fields");
        return;
    }

    let unlockTime = new Date(date).getTime();
    if (unlockTime <= Date.now()) {
        alert("Choose a future date");
        return;
    }

    let data = {
        message: msg,
        unlock: unlockTime,
        password: pass
    };

    localStorage.setItem("timeCapsule", JSON.stringify(data));

    saved.classList.remove("hidden");
    saved.innerHTML = "✔ Capsule saved!";

    countdown.classList.remove("hidden");
    startCountdown(unlockTime, countdown);
}

// COUNTDOWN TIMER
function startCountdown(target, element) {
    let x = setInterval(() => {
        let now = Date.now();
        let diff = target - now;

        if (diff <= 0) {
            element.innerHTML = "🎉 Ready to unlock!";
            clearInterval(x);
            return;
        }

        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let m = Math.floor((diff / (1000 * 60)) % 60);
        let s = Math.floor((diff / 1000) % 60);

        element.innerHTML = `⏳ Unlocks in: ${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
}

// UNLOCK CAPSULE
function unlockCapsule() {
    let pass = document.getElementById("unlockPass").value;
    let result = document.getElementById("result");

    let data = JSON.parse(localStorage.getItem("timeCapsule"));
    if (!data) {
        alert("No capsule found!");
        return;
    }

    if (Date.now() < data.unlock) {
        alert("Unlock date not reached!");
        return;
    }

    if (pass !== data.password) {
        alert("Wrong password!");
        return;
    }

    result.classList.remove("hidden");
    result.innerHTML = `<h2>🎉 Your Message</h2><p>${data.message}</p>`;
}
