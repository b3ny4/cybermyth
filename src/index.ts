import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import questions from './questions/enabled.ls';

import QuizMaster from './game/quizmaster';


function main () {
    const display: HTMLElement = document.getElementById("display");
    const score: HTMLElement = document.getElementById("score");
    const rank: HTMLElement = document.getElementById("rank");
    const feedback: HTMLElement = document.getElementById("feedback");
    const qm = new QuizMaster(questions, display, score, rank, feedback);
    qm.run();
}

window.onload = main;