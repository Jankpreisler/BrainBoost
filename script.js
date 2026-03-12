class Question{

    constructor(questions, answer1, answer2, answer3, answer4, correct){
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

const otazka = new Question("Ake je hlavne mesto Franczuska", "Lyon" ,"Paris", "Marsey", "Nice", "Paris");
otazka.debug();

localStorage.setItem("ulozenaOtazka", otazka.Question);
localStorage.setItem("ulozenaodpoved1", otazka.Answer1);
localStorage.setItem("ulozenaodpoved2", otazka.Answer2);
localStorage.setItem("ulozenaodpoved3", otazka.Answer3);
localStorage.setItem("ulozenaodpoved4", otazka.Answer4);
localStorage.setItem("spravnaOdpoved", otazka.CorrectAnswer);

console.log(otazka.Question);

window.onload = function() {
    const nacitanyText = localStorage.getItem("ulozenaOtazka");
    const nadpis = document.getElementById("Question");

    const nacitanaodpoved1 = localStorage.getItem("ulozenaodpoved1");
    const odpoved1 = document.getElementById("answear1");

    const nacitanaodpoved2 = localStorage.getItem("ulozenaodpoved2");
    const odpoved2 = document.getElementById("answear2");

    const nacitanaodpoved3 = localStorage.getItem("ulozenaodpoved3");
    const odpoved3 = document.getElementById("answear3");

    const nacitanaodpoved4 = localStorage.getItem("ulozenaodpoved4");
    const odpoved4 = document.getElementById("answear4");

    if (nacitanyText && nadpis) {
        nadpis.textContent = nacitanyText;
    } 
    if(nacitanaodpoved1 && odpoved1) {
        odpoved1.value = nacitanaodpoved1;
    } 
    if(nacitanaodpoved2 && odpoved1) {
        odpoved2.value = nacitanaodpoved2;
    } 
    if(nacitanaodpoved3 && odpoved1) {
        odpoved3.value = nacitanaodpoved3;
    } 
    if(nacitanaodpoved4 && odpoved1) {
        odpoved4.value = nacitanaodpoved4;
    } 

    document.getElementById("answear1").onclick = skontroluj;
    document.getElementById("answear2").onclick = skontroluj;
    document.getElementById("answear3").onclick = skontroluj;
    document.getElementById("answear4").onclick = skontroluj;
    
};

function NextQuestion(event) {

    const stlacenyButton = event.target; // Získame element, na ktorý sa kliklo
    const vybrataHodnota = stlacenyButton.value; // Text na buttone
    const spravna = localStorage.getItem("spravnaOdpoved"); // Načítame správnu odpoveď z pamäte

    if (vybrataHodnota === spravna) {
        alert("Správne! Ste génius.");
        stlacenyButton.style.backgroundColor = "green";
    } else {
        alert("Nesprávne, skús znova.");
        stlacenyButton.style.backgroundColor = "red";
    }
}
    

