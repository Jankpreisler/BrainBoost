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

function ulozAktualnyStav() {
    let poleUloh = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        poleUloh.push(li.childNodes[0].textContent.trim());
    });
    sessionStorage.setItem("mojeUlohy", JSON.stringify(poleUloh));
}
function nacitajUlohy() {
    let data = sessionStorage.getItem("mojeUlohy");
    if (data) {
        let pole = JSON.parse(data);
        pole.forEach(text => {
            vytvorPrvok(text); 
        });
    }
}
function vytvorPrvok(uloha) {
    pocetuloh++;
    pocetuloho.textContent = pocetuloh; 
    let novyRiadok = document.createElement("li");
    novyRiadok.textContent = uloha + "  ";

    let odkaz = document.createElement("a");
    odkaz.textContent = " (Zmazať)";
    odkaz.href = "#";
    odkaz.style.color = "red";
    odkaz.onclick = function(e) {
        e.preventDefault();
        novyRiadok.remove();
        pocetuloh--;
        pocetuloho.textContent = pocetuloh; 
        ulozAktualnyStav(); 
    };

    let Finished = document.createElement("a");
    Finished.textContent = " (Hotovo)";
    Finished.href = "#";
    Finished.style.color = "green";
    Finished.onclick = function(e) {
        e.preventDefault();
        novyRiadok.classList.toggle("hotovo");
    };

    novyRiadok.appendChild(Finished);
    novyRiadok.appendChild(odkaz);
    zoznam.appendChild(novyRiadok);
}

PridavcieBtn.addEventListener("click", function () {
    let uloha = element.value;

    if (uloha !== "") {
        vytvorPrvok(uloha); 
        ulozAktualnyStav(); 
        element.value = "";
    } else {
        alert("Musíš najsôr zadať úlohu");
    }
});

element.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        PridavcieBtn.click();
    }
});

nacitajUlohy();