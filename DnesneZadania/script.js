let PridavcieBtn = document.getElementById("addBtn");
let zoznam = document.getElementById("taskList");
let pocetuloho = document.getElementById("pocitaculoh");
let element = document.getElementById("taskinput");
let pocetuloh =0;

element.addEventListener("keydown", function (event) {
    
    if (event.key === "Enter") {
        PridavcieBtn.click();
    }
});

PridavcieBtn.addEventListener("click", function () {

    console.log(element.value);
    let uloha = element.value;

    if (uloha !== "") {
        pocetuloh ++;
        pocetuloho.textContent = pocetuloh; 
        let novyRiadok = document.createElement("li");
        novyRiadok.textContent = uloha + " " + " ";

        let odkaz = document.createElement("a");
        odkaz.textContent = " (zmazať)";
        odkaz.href = "#";
        odkaz.style.color = "red";

        let Finished = document.createElement("a");
        Finished.textContent = " (Hotovo)";
        Finished.href = "#";
        Finished.style.color = "green";

        odkaz.onclick = function() {
            novyRiadok.remove();
            pocetuloh --;
            pocetuloho.textContent = pocetuloh; 
        };

        Finished.onclick = function() {
            novyRiadok.classList.toggle("hotovo");
            console.log("Trieda hotovo bola prepnutá!");
        };

        novyRiadok.appendChild(Finished);
        novyRiadok.appendChild(odkaz);
        zoznam.appendChild(novyRiadok);

        element.value = "";

    }
    else{
        alert("Musis najskor naplnit input button");
    }

});