import { quizData } from './data.js';
const questionBox = document.querySelector('.question-box');
let currentQuestionIndex = 0
let score = 0;

function updateScore(){
    score = score + 1; 
}

function render() {
    const currentQuestion = quizData[currentQuestionIndex];
    const quizHTML = `
      <div class="question">${currentQuestion.question}</div>
      <ul>
        <li><input type="button" name="option" value="${currentQuestion.a}" class="answer-btn"></li>
        <li><input type="button" name="option" value="${currentQuestion.b}" class="answer-btn"></li>
        <li><input type="button" name="option" value="${currentQuestion.c}" class="answer-btn"></li>
        <li><input type="button" name="option" value="${currentQuestion.d}" class="answer-btn"></li>
      </ul>
    `;
    questionBox.innerHTML = quizHTML;
    const answerBtn = document.querySelectorAll(".answer-btn");
    answerBtn.forEach((button) => {
    button.addEventListener('click', ()=> {
        const correctAnswer = currentQuestion.correct;
        const userValue = button.value;
        const userAnswerAlphabet = Object.keys(currentQuestion).find(key => currentQuestion[key] == userValue);
        if(correctAnswer == userAnswerAlphabet){
            updateScore();
        }

        currentQuestionIndex++;
        if(currentQuestionIndex >= quizData.length){
            const h2Ele = document.createElement('h2');
            const divEle = document.createElement('div');
            divEle.setAttribute("class", "final-result");
            document.querySelector(".container").style.height = "250px";
            h2Ele.innerHTML = "Your Final Score"
            divEle.innerHTML = `Final Score: ${score} out of ${quizData.length}`
            questionBox.innerHTML = "";
            questionBox.appendChild(h2Ele);
            questionBox.appendChild(divEle);
        } else{
            render();
        }
    })
}) 
}
render();