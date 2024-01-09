
class QuestionDisplay {
    
    question: Question;

    constructor(question: Question) {
        this.question = question;
    }

    render(callback: (button: HTMLElement, correct: boolean) => void) : HTMLElement {
        const container = document.createElement("div");

        const question: HTMLElement = document.createElement("h4");
        question.innerText = this.question.question;
        question.classList.add("question");
        container.appendChild(question);
        
        const answers = Array.from(this.question.answers.entries())
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        for (const [index, answer] of answers) {
            const button: HTMLButtonElement = document.createElement("button");
            button.type = "button";
            button.classList.add("btn", "btn-secondary", "w-100", "my-1");
            button.innerText = answer;
            button.onclick = () => {
                callback(button, index === this.question.correct);
            }
            container.appendChild(button);
        }

        return container;
    }
}

export default QuestionDisplay;