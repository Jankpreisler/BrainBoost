function Question(question, a1, a2, a3, a4, correct) {
    this.question = question;
    this.answers = [a1, a2, a3, a4];
    this.correct = correct;
}

const vsetkyOtazky = [
    new Question("Aké je hlavné mesto Francúzska?", "Lyon", "Paris", "Marseille", "Nice", "Paris"),
    new Question("Aké je hlavné mesto Talianska?", "Rím", "Miláno", "Neapol", "Benátky", "Rím"),
    new Question("Aké je hlavné mesto Nemecka?", "Mníchov", "Hamburg", "Berlín", "Frankfurt", "Berlín"),
    new Question("Aké je hlavné mesto Španielska?", "Barcelona", "Sevilla", "Madrid", "Valencia", "Madrid"),
    new Question("Aké je hlavné mesto Portugalska?", "Porto", "Lisabon", "Faro", "Braga", "Lisabon"),
    new Question("Aké je hlavné mesto Rakúska?", "Viedeň", "Salzburg", "Innsbruck", "Graz", "Viedeň"),
    new Question("Aké je hlavné mesto Maďarska?", "Debrecín", "Budapešť", "Szeged", "Pécs", "Budapešť"),
    new Question("Aké je hlavné mesto Poľska?", "Krakov", "Varšava", "Gdansk", "Poznaň", "Varšava"),
    new Question("Aké je hlavné mesto Česka?", "Brno", "Ostrava", "Praha", "Plzeň", "Praha"),
    new Question("Aké je hlavné mesto Slovenska?", "Košice", "Žilina", "Prešov", "Bratislava", "Bratislava"),
    new Question("Aké je hlavné mesto Chorvátska?", "Split", "Dubrovník", "Záhreb", "Rijeka", "Záhreb"),
    new Question("Aké je hlavné mesto Grécka?", "Atény", "Solún", "Patras", "Kréta", "Atény"),
    new Question("Aké je hlavné mesto Holandska?", "Rotterdam", "Amsterdam", "Utrecht", "Eindhoven", "Amsterdam"),
    new Question("Aké je hlavné mesto Belgicka?", "Bruggy", "Antverpy", "Brusel", "Gent", "Brusel"),
    new Question("Aké je hlavné mesto Írska?", "Cork", "Galway", "Limerick", "Dublin", "Dublin"),
];

let aktualnyIndex = 0;
let skore = 0;
let casovacInterval = null;

const MAX_CAS = 12; // sekundy na otázku

document.addEventListener("DOMContentLoaded", function () {
    nacitajOtazku();
});

function nacitajOtazku() {
    clearInterval(casovacInterval);

    const tlacidla = document.querySelectorAll(".answer");
    const questionElement = document.getElementById("Question");
    const questionCount = document.getElementById("questionCount");
    const questionProgress = document.getElementById("questionprogressbar");
    const timerText = document.getElementById("timer");
    const timerProgress = document.getElementById("timerProgress");

    if (aktualnyIndex >= vsetkyOtazky.length) {
        const percenta = Math.round((skore / vsetkyOtazky.length) * 100);

        questionElement.textContent =
            "Kvíz skončený! Skóre: " + skore + " / " + vsetkyOtazky.length + " (" + percenta + "%)";

        if (questionCount) {
            questionCount.textContent = "Finished";
        }

        if (questionProgress) {
            questionProgress.style.width = "100%";
        }

        if (timerText) {
            timerText.textContent = "⏱ 0s";
        }

        if (timerProgress) {
            timerProgress.style.width = "0%";
        }

        tlacidla.forEach(function (btn) {
            btn.style.display = "none";
        });

        return;
    }

    const q = vsetkyOtazky[aktualnyIndex];
    questionElement.textContent = q.question;

    if (questionCount) {
        questionCount.textContent = "Question " + (aktualnyIndex + 1) + "/" + vsetkyOtazky.length;
    }

    if (questionProgress) {
        const percent = ((aktualnyIndex + 1) / vsetkyOtazky.length) * 100;
        questionProgress.style.width = percent + "%";
    }

    tlacidla.forEach(function (btn, i) {
        btn.style.display = "flex";
        btn.disabled = false;
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.querySelector(".text").textContent = q.answers[i];
        btn.onclick = skontrolujOdpoved;
    });

    spustiTimer();
}

function spustiTimer() {
    clearInterval(casovacInterval);

    const timerText = document.getElementById("timer");
    const timerProgress = document.getElementById("timerProgress");

    let zostavajuceMs = MAX_CAS * 1000;

    if (timerText) {
        timerText.textContent = "⏱ " + MAX_CAS + "s";
    }

    if (timerProgress) {
        timerProgress.style.width = "100%";
    }

    casovacInterval = setInterval(function () {
        zostavajuceMs -= 100;

        let sekundy = Math.ceil(zostavajuceMs / 1000);
        if (sekundy < 0) sekundy = 0;

        if (timerText) {
            timerText.textContent = "⏱ " + sekundy + "s";
        }

        if (timerProgress) {
            let percent = (zostavajuceMs / (MAX_CAS * 1000)) * 100;
            if (percent < 0) percent = 0;
            timerProgress.style.width = percent + "%";
        }

        if (zostavajuceMs <= 0) {
            clearInterval(casovacInterval);
            vyprsalCas();
        }
    }, 100);
}

function vyprsalCas() {
    const q = vsetkyOtazky[aktualnyIndex];
    const vsetkyTlacidla = document.querySelectorAll(".answer");

    vsetkyTlacidla.forEach(function (b) {
        b.disabled = true;

        if (b.querySelector(".text").textContent === q.correct) {
            b.style.backgroundColor = "green";
            b.style.color = "white";
        }
    });

    setTimeout(function () {
        aktualnyIndex++;
        nacitajOtazku();
    }, 1200);
}

function skontrolujOdpoved(event) {
    clearInterval(casovacInterval);

    const btn = event.currentTarget;
    const q = vsetkyOtazky[aktualnyIndex];
    const vsetkyTlacidla = document.querySelectorAll(".answer");
    const zvolenaOdpoved = btn.querySelector(".text").textContent;

    vsetkyTlacidla.forEach(function (b) {
        b.disabled = true;
    });

    if (zvolenaOdpoved === q.correct) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
        skore++;

        setTimeout(function () {
            aktualnyIndex++;
            nacitajOtazku();
        }, 800);
    } else {
        btn.style.backgroundColor = "red";
        btn.style.color = "white";

        vsetkyTlacidla.forEach(function (b) {
            if (b.querySelector(".text").textContent === q.correct) {
                b.style.backgroundColor = "green";
                b.style.color = "white";
            }
        });

        setTimeout(function () {
            aktualnyIndex++;
            nacitajOtazku();
        }, 1200);
    }
}