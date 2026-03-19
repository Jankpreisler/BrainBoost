function Question(question, a1, a2, a3, a4, correct) {
    this.question = question;
    this.answers = [a1, a2, a3, a4];
    this.correct = correct;
}

const vsetkyOtazky = [
    new Question("Aký je oficiálny názov pre najvyššiu triedu okruhových pretekov?", "WRC", "F1", "MotoGP", "IndyCar", "F1"),
    new Question("Koľko pneumatík musí mať vozidlo F1 počas pretekov?", "3", "4", "5", "6", "4"),
    new Question("Čo znamená skratka DRS?", "Drag Reduction System", "Driving Race System", "Direct Racing Speed", "Downforce Reset System", "Drag Reduction System"),
    new Question("Ktorá farba vlajky signalizuje okamžité zastavenie pretekov?", "Žltá", "Červená", "Čierna", "Modrá", "Červená"),
    new Question("Kto je rekordérom v počte titulov majstra sveta F1 (spolu s Michaelom Schumacherom)?", "Ayrton Senna", "Lewis Hamilton", "Sebastian Vettel", "Max Verstappen", "Lewis Hamilton"),
    new Question("Ako sa nazýva priestor, kde jazdci zastavujú na výmenu pneumatík?", "Boxy (Pit lane)", "Garáž", "Paddock", "Grid", "Boxy (Pit lane)"),
    new Question("Akú farbu má vlajka, ktorá signalizuje nebezpečenstvo na trati a zákaz predbiehania?", "Biela", "Zelená", "Žltá", "Čierna", "Žltá"),
    new Question("Ktorý tím je známy svojou ikonickou červenou farbou?", "Mercedes", "Red Bull", "Ferrari", "McLaren", "Ferrari"),
    new Question("Čo znamená pojem 'Safety Car'?", "Rýchle kolo", "Zavádzacie vozidlo", "Mechanik", "Časový limit", "Zavádzacie vozidlo"),
    new Question("Ako sa nazýva štartovacia pozícia z prvého miesta?", "Pole position", "Grid start", "Best start", "Lead position", "Pole position"),
    new Question("Ktorá časť vozidla zabezpečuje prítlak k zemi?", "Motor", "Aerodynamické krídla", "Prevodovka", "Brzdy", "Aerodynamické krídla"),
    new Question("Čo indikuje modrá vlajka?", "Pomalšie auto má pustiť rýchlejšie pred seba", "Koniec pretekov", "Porucha motora", "Diskvalifikácia", "Pomalšie auto má pustiť rýchlejšie pred seba"),
    new Question("Ktorá krajina je tradičným domovom slávnych pretekov 'Targa Florio'?", "Francúzsko", "Taliansko", "Nemecko", "Španielsko", "Taliansko"),
    new Question("Ako sa nazýva systém ochrany hlavy jazdca v kokpite?", "HANS", "Halo", "Cockpit Shield", "Rollbar", "Halo"),
    new Question("Aký typ motora sa v súčasnosti používa v F1?", "V12", "V8", "Hybridný V6 turbo", "Elektromotor", "Hybridný V6 turbo"),
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