const questions = [
    {
        question: "O que são funções de callback em JavaScript?",
        options: ["Funções sem retorno", "Funções como argumentos", "Funções para sincronização", "Funções substitutas"],
        answer: "Funções como argumentos"
    },
    {
        question: "Como centralizar um elemento no meio da tela com CSS?",
        options: ["position: absolute", "display: flex", "margin: auto", "display: inline-block"],
        answer: "display: flex"
    },
    {
        question: "QualO que é MySQLi em PHP?",
        options: ["Qualquer banco", "Exclusivo do PDO", "Exclusivo do MySQL", "Versão avançada"],
        answer: "Exclusivo do MySQL"
    },
    {
        question: "Como criar uma variável CSS?",
        options: ["Diretamente no CSS", "Dentro de <style>", "Em :root", "No HTML"],
        answer: "Em :root"
    },
    {
        question: " Qual a diferença entre == e === em JavaScript?",
        options: ["Compara tipo e valor", "Compara só tipo", "Compara só valor", "São idênticos"],
        answer: "Compara tipo e valor"
    }
];

let currentQuestion = 0;
let score = 0;
let results = [];  // Array para armazenar os resultados de cada pergunta

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');

function loadQuestion() {
    const current = questions[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="option" value="${option}">
            ${option}
        `;
        optionsEl.appendChild(label);
    });
}

function showResult() {
    resultEl.style.display = 'block';
    scoreEl.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;

    // Exibir detalhes das respostas corretas e incorretas
    const detailsEl = document.createElement('div');
    results.forEach((result, index) => {
        const questionResult = document.createElement('p');
        questionResult.textContent = `Pergunta ${index + 1}: ${result.question} - Sua resposta: ${result.selected} - ${result.isCorrect ? "Correta" : "Incorreta"}`;
        detailsEl.appendChild(questionResult);
    });
    resultEl.appendChild(detailsEl);
}

nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    
    if (selectedOption) {
        const isCorrect = selectedOption.value === questions[currentQuestion].answer;
        
        // Adicionar o resultado da pergunta ao array results
        results.push({
            question: questions[currentQuestion].question,
            selected: selectedOption.value,
            isCorrect: isCorrect
        });
        
        if (isCorrect) {
            score++;
        }
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            document.getElementById('quiz-form').style.display = 'none';
            showResult();
        }
    } else {
        alert("Por favor, selecione uma opção!");
    }
});

// Iniciar o quiz
loadQuestion();