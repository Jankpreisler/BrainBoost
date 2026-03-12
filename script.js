class Question{

    constructor(questions, answer1, answer2, answer3, answer4){
        this.Question = questions
        this.Answer1 = answer1
        this.Answer2 = answer2
        this.Answer3 = answer3
        this.Answer4 = answer4
    }
    debug() {
        console.log(this.Question, this.Answer1, this.Answer2, this.Answer3, this.Answer4);
    }

}

const otazka = new Question("Ake je hlavne mesto Franczuska", "Lyon" ,"Paris", "Marsey", "Nice");
otazka.debug();