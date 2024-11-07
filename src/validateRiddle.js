import riddles from '../riddles[1].json'

const validateriddle = (riddleNumber, userAns, setMsg, setQues, setRedirectLink) => {
  const riddleIndex = parseInt(riddleNumber, 10) - 1;

  if (riddleIndex >= 0 && riddleIndex < riddles.length) {
    const riddle = riddles[riddleIndex];
    setQues(riddle.question);

    if (userAns.toLowerCase() === riddle.answer.toLowerCase()) {
      setMsg("Correct! Well done.");
      setRedirectLink(riddle.redirectLink);
    } else {
      setMsg("Incorrect. Try again!");
      setRedirectLink('');
    }
  } else {
    setFeedback("Invalid riddle number.");
    setQues('');
    setRedirectLink('');
  }
};

export default validateriddle;