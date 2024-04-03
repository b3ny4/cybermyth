import QuestionDisplay from "./questiondisplay";

import wizard from "../images/wizard.png";
import guru from "../images/guru.png";
import champion from "../images/champion.png";
import master from "../images/master.png";
import king from "../images/king.png";
import knight from "../images/knight.png";
import greenhorn from "../images/greenhorn.png";
import newcomer from "../images/newcomer.png";

const rankTitle = [
    "Magier",       // 100%
    "Guru",         // >90%
    "Champion",     // >80%
    "Quizmaster",   // >70%
    "Ratekönig",    // >60%
    "Rateritter",   // >40%
    "Grünschnabel", // >20%
    "Neuling"       // default
]

const rankPictures = [
    wizard,
    guru,
    champion,
    master,
    king,
    knight,
    greenhorn,
    newcomer
]

class QuizMaster {

    private questions: Question[];
    private display: HTMLElement;
    private scoredisplay: HTMLElement;
    private rankdisplay: HTMLElement;
    private feedbackdisplay: HTMLElement;
    private score: Score;
    private question: Question;

    constructor(questions: Question[], display: HTMLElement, scoredisplay: HTMLElement, rankdisplay: HTMLElement, feedbackdisplay: HTMLElement) {
        this.questions = Array.from(questions)
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        this.display = display;
        this.scoredisplay = scoredisplay;
        this.rankdisplay = rankdisplay;
        this.feedbackdisplay = feedbackdisplay;
        this.score = { total: questions.length, correct: 0 };
    }

    public evaluate(button: HTMLElement, correct: boolean) {
        if (correct) this.score.correct++;
        button.classList.remove("btn-secondary");
        const btnClass = correct ? "success" : "danger";
        button.classList.add(`btn-${btnClass}`);
        for(const button of this.display.getElementsByTagName("button")) {
            button.disabled = true;
        }

        const next: HTMLButtonElement = document.createElement("button");
        next.type = "button";
        next.classList.add("btn", "btn-primary", "w-100", "my-1", "mt-3");
        next.innerText = "Weiter >";
        next.onclick = () => {
            this.run();
        }
        this.display.appendChild(next);

        this.feedbackdisplay.innerHTML = `<h6 class="text-${correct?'success':'danger'}">${correct?'Richtig!':'Nicht ganz!'}</h6>`
        if (this.question.explanation) {
            this.feedbackdisplay.innerHTML += this.question.explanation;
        }
        if(this.question.source) {
            this.feedbackdisplay.innerHTML += `\n<a href="https://${this.question.source}" target="blank">read more...</a>`
        }
        this.feedbackdisplay.style.display = 'block';
        // setTimeout(() => {
        //     this.run();
        // }, 3000);
    }

    private getCorrect() {
        return this.score.correct;
    }

    private getTotal() {
        return this.score.total;
    }

    private getPercentage() {
        return this.getCorrect()/this.getTotal();
    }

    private getRank() {
        const percentage = this.getPercentage();
        if (percentage >= 1) return 0;
        if (percentage >= 0.9) return 1;
        if (percentage >= 0.8) return 2;
        if (percentage >= 0.7) return 3;
        if (percentage >= 0.6) return 4;
        if (percentage >= 0.4) return 5;
        if (percentage >= 0.2) return 6;
        return 7;
    }

    private render(question: Question) {
        console.log(question);
        let gameOver = false;
        if (!question) {
            question = {
                question: `Du bist ein Privacy ${rankTitle[this.getRank()]}!`,
                correct: 0,
                answers: ["Erneut versuchen!"],
                explanation: ""
            }
            gameOver = true;
        }
        const questiondisplay = new QuestionDisplay(question);
        // clear screen
        this.scoredisplay.innerHTML = "";
        this.display.innerHTML = "";
        this.rankdisplay.innerHTML = "";
        // render question
        const callback = gameOver ? () => location.reload() : this.evaluate.bind(this)
        this.display.appendChild(questiondisplay.render(callback));
        // render score
        const total = this.getTotal();
        const correct = this.getCorrect();
        const percentage = Math.round(this.getPercentage()*100);
        this.scoredisplay.innerHTML = `(${correct}/${total}) ${percentage}%`;
        // render rank
        const rank = this.getRank();

        const rankImage = document.createElement("img");
        rankImage.src = rankPictures[rank];
        this.rankdisplay.appendChild(rankImage);

        const ranklabel = document.createElement("h2");
        ranklabel.innerText = rankTitle[rank];
        this.rankdisplay.appendChild(ranklabel);
    }

    public run() {
        this.question = this.questions.pop();
        this.feedbackdisplay.style.display = 'none';
        this.render(this.question);
    }
}

export default QuizMaster;