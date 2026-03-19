function Question(question, a1, a2, a3, a4, correct) {
    this.question = question;
    this.answers = [a1, a2, a3, a4];
    this.correct = correct;
}

const vsetkyOtazky = [
    new Question("Aký je základný stavebný kameň všetkých živých organizmov?", "Molekula", "Atóm", "Bunka", "Tkanivo", "Bunka"),
    new Question("Ktorý organel je zodpovedný za produkciu energie (ATP) v bunke?", "Ribozóm", "Mitochondria", "Lyzozóm", "Jadro", "Mitochondria"),
    new Question("Ako sa nazýva proces, pri ktorom rastliny premieňajú svetelnú energiu na chemickú?", "Respirácia", "Fermentácia", "Fotosyntéza", "Transpirácia", "Fotosyntéza"),
    new Question("Ktorá zložka DNA je nositeľom genetickej informácie?", "Proteíny", "Nukleotidy", "Lipidy", "Sacharidy", "Nukleotidy"),
    new Question("Ako sa nazýva látka, ktorá dáva listom zelenú farbu?", "Karotén", "Chlorofyl", "Anthokyan", "Xantofyl", "Chlorofyl"),
    new Question("Ktorý orgán v ľudskom tele je zodpovedný za filtráciu krvi a tvorbu moču?", "Pečeň", "Obličky", "Srdce", "Pľúca", "Obličky"),
    new Question("Ako sa nazýva súbor všetkých génov v organizme?", "Fenotyp", "Genotyp", "Genóm", "Karyotyp", "Genóm"),
    new Question("Ktorý typ delenia buniek vedie k vzniku pohlavných buniek?", "Mitóza", "Amitóza", "Meióza", "Pučanie", "Meióza"),
    new Question("Ako sa nazýva vzťah medzi dvoma organizmami, z ktorého majú obaja úžitok?", "Parazitizmus", "Mutualizmus", "Komenzalizmus", "Predácia", "Mutualizmus"),
    new Question("Ktorý enzým v slinách začína trávenie škrobov?", "Lipáza", "Amyláza", "Proteáza", "Nukleáza", "Amyláza"),
    new Question("Ako sa nazýva schopnosť organizmu udržiavať stálu vnútornú teplotu?", "Homeostáza", "Osmoregulácia", "Metabolizmus", "Adaptácia", "Homeostáza"),
    new Question("Ktorá časť rastliny zabezpečuje príjem vody a minerálnych látok z pôdy?", "List", "Stonka", "Koreň", "Kvet", "Koreň"),
    new Question("Ktorý plyn je hlavným produktom bunkového dýchania?", "Kyslík", "Dusík", "Oxid uhličitý", "Vodík", "Oxid uhličitý"),
    new Question("Ako sa nazýva štrukturálna jednotka svalového vlákna?", "Nefrón", "Neurón", "Sarkoméra", "Axón", "Sarkoméra"),
    new Question("Ktorá skupina organizmov patrí medzi prokaryoty?", "Rastliny", "Živočíchy", "Baktérie", "Huby", "Baktérie")
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