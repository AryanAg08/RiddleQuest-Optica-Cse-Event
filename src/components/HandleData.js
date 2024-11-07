import Data from "./Riddles";
let currentRiddleNumber = null;

function getRiddleByNumber(riddleNumber) {
    const riddle = Data.find(item => item.riddle === riddleNumber);

    if (riddle) {
        currentRiddleNumber = riddleNumber;
        return riddle.question;
    } else {
        return "wrongAns";
    }
}

function checkRiddleAnswer(answer) {
    const riddle = Data.find(item => item.riddle === currentRiddleNumber);

    if (riddle && riddle.answer.toLowerCase() === answer.toLowerCase()) {
        return riddle.redirectLink;
    } else {
        return "wrongAns";
    }
}

export { getRiddleByNumber, checkRiddleAnswer };
