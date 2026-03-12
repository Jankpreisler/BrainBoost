class Question {

    constructor(questions, answer1, answer2, answer3, answer4, correct) {
        this.Question = questions
        this.Answer1 = answer1
        this.Answer2 = answer2
        this.Answer3 = answer3
        this.Answer4 = answer4
        this.CorrectAnswer = correct;
    }
    debug() {
        console.log(this.Question, this.Answer1, this.Answer2, this.Answer3, this.Answer4);
    }

}

const vsetkyOtazky = [
    new Question("Ake je hlavne mesto Franczuska", "Lyon", "Paris", "Marsey", "Nice", "Paris"),
    new Question("Ake je hlavne mesto Talianska", "Rím", "Miláno", "Neapol", "Benátky", "Rím")
];

// Uložíme ich ručne podľa indexu
vsetkyOtazky.forEach((q, index) => {
    localStorage.setItem("q" + index + "_text", q.Question);
    localStorage.setItem("q" + index + "_a1", q.Answer1);
    localStorage.setItem("q" + index + "_a2", q.Answer2);
    localStorage.setItem("q" + index + "_a3", q.Answer3);
    localStorage.setItem("q" + index + "_a4", q.Answer4);
    localStorage.setItem("q" + index + "_correct", q.CorrectAnswer);
});

localStorage.setItem("aktualnyIndex", 0);

window.onload = function () {
    let idx = localStorage.getItem("aktualnyIndex");
    if (idx === null) {
        idx = "0";
        localStorage.setItem("aktualnyIndex", 0);
    }
    
    console.log("Načítam otázku s indexom: " + idx);

    
    const text = localStorage.getItem("q" + idx + "_text");
    
    
        document.getElementById("Question").textContent = text;
        document.getElementById("answear1").value = localStorage.getItem("q" + idx + "_a1");
        document.getElementById("answear2").value = localStorage.getItem("q" + idx + "_a2");
        document.getElementById("answear3").value = localStorage.getItem("q" + idx + "_a3");
        document.getElementById("answear4").value = localStorage.getItem("q" + idx + "_a4");
    
        
    // Priradenie funkcie
    document.querySelectorAll("input[type=button]").forEach(btn => btn.onclick = NextQuestion);
};

function NextQuestion(event) {
    const btn = event.target;
    const idx = parseInt(localStorage.getItem("aktualnyIndex")); 
    const spravna = localStorage.getItem("q" + idx + "_correct");

    if (btn.value === spravna) {
        btn.style.backgroundColor = "green";
        
        let novyIdx = idx + 1; // Zvýšime číslo

        localStorage.setItem("aktualnyIndex", novyIdx.toString()); 
        
        console.log("Ukladám nový index: " + novyIdx); // Toto musíš vidieť v konzole
        
        location.reload(); 
    }    
    else {
        btn.style.backgroundColor = "red";
    }
}


