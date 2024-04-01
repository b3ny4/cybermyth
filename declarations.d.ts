//import Question from "./src/game/question";

type Score = {
    total: number;
    correct: number;
}

type Question = {
    question: string,
    correct: number,
    answers: string[],
    explanation: string,
    source?: string,
}

declare module '*.ls' {
    const content: Question[];
    export default content;
}

declare module '*.qs' {
    const content: Question[];
    export default content;
}

declare module "*.png";