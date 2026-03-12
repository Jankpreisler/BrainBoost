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

document.addEventListener("DOMContentLoaded", function () {
    nacitajOtazku();
});

function nacitajOtazku() {
    if (aktualnyIndex >= vsetkyOtazky.length) {
        document.getElementById("Question").textContent =
            "Kvíz skončený! Skóre: " + skore + " / " + vsetkyOtazky.length + " " + (skore / vsetkyOtazky.length) * 100 + "%";

        const tlacidla = document.querySelectorAll(".answer");
        tlacidla.forEach(btn => {
            btn.style.display = "none";
        });

        return;
    }

    const q = vsetkyOtazky[aktualnyIndex];
    const tlacidla = document.querySelectorAll(".answer");

    document.getElementById("Question").textContent = q.question;

    const questionCount = document.getElementById("questionCount");
    if (questionCount) {
        questionCount.textContent = "Question " + (aktualnyIndex + 1) + "/" + vsetkyOtazky.length;
    }

    tlacidla.forEach(function (btn, i) {
        btn.querySelector(".text").textContent = q.answers[i];
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.disabled = false;
        btn.onclick = skontrolujOdpoved;
    });
}

function skontrolujOdpoved(event) {
    const btn = event.currentTarget;
    const q = vsetkyOtazky[aktualnyIndex];
    const vsetkyTlacidla = document.querySelectorAll(".answer");
    const zvolenaOdpoved = btn.querySelector(".text").textContent;

    vsetkyTlacidla.forEach(b => b.disabled = true);

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