
function validateQuestion(question, lineNr) {
    if(!question) return;
    if(!question.question) throw new Error(`qsParser: Error in line ${lineNr}, there was no question!`);
    if(!question.answers || question.answers.length == 0) throw new Error(`qsParser: Error in line ${lineNr}, answers required!`);
    if(question.correct < 0 || question.correct > question.answers.length) throw new Error(`qsParser: Error in line ${lineNr}, question has no correct answer!`);
}

function newQuestion(data, question, line, lineNr) {
    validateQuestion(question, lineNr);
    if(question) data.push(question);
    question = {
        question: line.substring(2).trim(),
        answers: [],
        correct: -1,
        explanation: '',
    };
    return [data, question];
}

function makeCorrect(question, line, lineNr) {
    if(question.correct >= 0) throw new Error(`qsParser: Error in line ${lineNr}, question must only have one correct answer`);
    question.correct = question.answers.length;
    line = line.slice(0, -1);
    return [question, line];
}

function addExplanation(question, line) {
    question.explanation = line.trim().substring(1).trim();
    return question;
}

function addSource(question, line) {
    question.source = line.trim().substring(1).trim();
    return question;
}

function addAnswer(question, line, lineNr) {
    if (line.endsWith("*")) [question, line] = makeCorrect(question, line, lineNr);
    const answer = line.slice(1,-1).trim();
    question.answers.push(answer);
    return question;
}

function interpreteLine(data, question, line, lineNr) {
    line = line.split('//')[0].trim();          // remove comments
    if(!line) return [data, question];                           // ignore empty lines
    if (line.startsWith("# ")) [data, question] =  newQuestion(data, question, line, lineNr);
    else if (line.trim().startsWith("-")) question = addExplanation(question, line);
    else if (line.trim().startsWith("+")) question = addSource(question, line);
    else if (/\[.*(?:\]|]\*)$/.test(line)) question =  addAnswer(question, line, lineNr);
    else throw new Error(`qsParser: Syntax error in line ${lineNr}!`);
    return [data, question];
}

module.exports = function (source) {
    const lines = source.replace('\r', '').split('\n');
    let data = [];
    let question = undefined;
    for(i = 0; i < lines.length; i++) [data, question] = interpreteLine(data, question, lines[i], i);
    newQuestion(data, question, "", "EOF")
    return `export default ${JSON.stringify(data)}`;
}