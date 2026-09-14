const questionText = document.getElementById("question-text");
const choices = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");
const nextButton = document.getElementById("next-btn");

nextButton.disabled = true;
let score = 0;
let totalquestions = 0;
let correctAnswer;


// Get a question from FastAPI
async function getQuestion() {
    try {
        const response = await fetch("http://127.0.0.1:8000/capital");

        if (!response.ok) {
            throw new Error("Failed to fetch question");
        }

        const data = await response.json();

        const country = data.country;
        correctAnswer = data.correct_answer;
        const answers = data.answers;

        questionText.textContent = `What is the capital of ${country}?`;

        choices.innerHTML = "";

        answers.forEach(answer => {
            const button = document.createElement("button");

            button.textContent = answer;
            button.classList.add("choice-btn");

            button.addEventListener("click", () => {
                checkAnswer(answer);
            });

            choices.appendChild(button);
        });

    } catch (error) {
        console.error(error);
        questionText.textContent = "Could not load question.";
    }
}


// Check the user's answer
function checkAnswer(answer) {
    totalquestions ++;
    totalQuestionsElement.textContent = totalquestions
    if (answer === correctAnswer) {
        score++;
        scoreElement.textContent = score;
        
    }
    else {
        questionText.textContent = `Wrong! correct answer: ${correctAnswer}`
    }

    // Prevent answering the same question multiple times
    const buttons = choices.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });
    nextButton.disabled = false;
}


// Next question
nextButton.addEventListener("click", () => {
   getQuestion();
   nextButton.disabled = true;
});


// Load the first question
getQuestion();