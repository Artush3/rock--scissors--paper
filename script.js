// Получаем элементы DOM
const userScore = document.getElementById("user-score");
const compScore = document.getElementById("comp-score");
const result = document.querySelector(".game-container__desc");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const actionMessage = document.getElementById("action-message");

// Инициализация счетчиков
let user_score = 0;
let comp_score = 0;

// Основная функция игры
function game(userChoice) {
    const compChoice = getCompChoice();
    const winner = getWinner(userChoice, compChoice);
    
    showChoices(userChoice, compChoice, winner);
    updateScore(winner);
    displayResult(winner, userChoice, compChoice);
}

// Получение случайного выбора компьютера
function getCompChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNum = Math.floor(Math.random() * 3);
    return choices[randomNum];
}

// Определение победителя
function getWinner(user, comp) {
    if (user === comp) {
        return 'draw'
    } else {
        const rules = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };
        
        return rules[user] === comp ? 'user' : 'comp';
    }
}

// Обновление счета
function updateScore(winner) {
    if (winner === 'user') {
        user_score++;
        userScore.textContent = user_score;
    } else if (winner === 'comp') {
        comp_score++;
        compScore.textContent = comp_score;
    }
}

// Отображение результата
function displayResult(winner, userChoice, compChoice) {
    const userChoiceRu = translateChoice(userChoice);
    const compChoiceRu = translateChoice(compChoice);
    
    if (winner === 'user') {
        result.textContent = `${userChoiceRu} побеждает ${compChoiceRu}. Вы выиграли!`;
        actionMessage.textContent = "Вы победили! Сыграем еще?";
    } else if (winner === 'comp') {
        result.textContent = `${compChoiceRu} побеждает ${userChoiceRu}. Вы проиграли.`;
        actionMessage.textContent = "Вы проиграли. Попробуйте еще раз!";
    } else {
        result.textContent = `Оба выбрали ${userChoiceRu}. Ничья!`;
        actionMessage.textContent = "Ничья! Сыграем еще?";
    }
}

// Перевод выбора на русский
function translateChoice(choice) {
    const translations = {
        rock: 'Камень',
        paper: 'Бумага',
        scissors: 'Ножницы'
    };
    return translations[choice];
}

// Подсветка выбранных вариантов
function showChoices(userChoice, compChoice, winner) {
    // Сначала убираем все подсветки
    rockButton.classList.remove('green-glow', 'red-glow', 'gray-glow');
    paperButton.classList.remove('green-glow', 'red-glow', 'gray-glow');
    scissorsButton.classList.remove('green-glow', 'red-glow', 'gray-glow');
    
    // Подсвечиваем выбор пользователя
    const userGlow = document.getElementById(userChoice);
    const compGlow = document.getElementById(compChoice);

    if(winner === 'draw') {
        setTimeout(() => {
            userGlow.classList.add('gray-glow');
        }, 300);
    } else {
        setTimeout(() => {
            compGlow.classList.add('red-glow');
            userGlow.classList.add('green-glow');
        }, 300);
    }
}

// Обработчики событий для выбора
rockButton.addEventListener('click', () => game('rock'));
paperButton.addEventListener('click', () => game('paper'));
scissorsButton.addEventListener('click', () => game('scissors'));