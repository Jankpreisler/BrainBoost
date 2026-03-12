function Question(question, a1, a2, a3, a4, correct) {
    this.question = question;
    this.answers = [a1, a2, a3, a4];
    this.correct = correct;
}

const vsetkyOtazky = [
    new Question("Ktoré kľúčové slovo sa používa na deklaráciu premennej, ktorú nemožno meniť?", "var", "let", "const", "static", "const"),
    new Question("Ako sa v JS vypisuje text do konzoly?", "print()", "console.log()", "write()", "alert()", "console.log()"),
    new Question("Aký je rozdiel medzi '==' a '==='?", "žiadny", "=== porovnáva aj typ", "== porovnáva aj typ", "neexistujú", "=== porovnáva aj typ"),
    new Question("Čo vráti výraz '2' + 2?", "4", "22", "NaN", "chyba", "22"),
    new Question("Ako sa zapíše komentár na jeden riadok?", "/* */", "", "//", "#", "//"),
    new Question("Ktorá metóda pridá prvok na koniec poľa?", "push()", "pop()", "shift()", "unshift()", "push()"),
    new Question("Ako sa definuje šípková funkcia (arrow function)?", "function =>", "=> ()", "() =>", "arrow()", "() =>"),
    new Question("Čo je to 'undefined' v JavaScripte?", "chyba", "nulová hodnota", "neinicializovaná hodnota", "typ objektu", "neinicializovaná hodnota"),
    new Question("Ktorý objekt v JS slúži na prácu s časom?", "Time", "Clock", "Date", "Calendar", "Date"),
    new Question("Čo vráti funkcia typeof 'Ahoj'?", "string", "text", "char", "object", "string"),
    new Question("Ktorý operátor slúži na logické 'A'?", "||", "!", "&&", "??", "&&"),
    new Question("Ako sa nazýva proces, pri ktorom JS automaticky mení typy?", "casting", "type coercion", "parsing", "compiling", "type coercion"),
    new Question("Ktorý cyklus sa bežne používa na iteráciu poľa?", "for", "do-while", "if", "switch", "for"),
    new Question("Čo vráti výraz 2 === '2'?", "true", "false", "undefined", "NaN", "false"),
    new Question("Ako sa volá štandard, podľa ktorého sa JS vyvíja?", "HTML", "ECMAScript", "JSON", "Node", "ECMAScript")
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