/**
 * SuertudoApp - sorteo_comentarios.js
 * This file will handle the logic for the comment giveaway feature.
 */

document.addEventListener('DOMContentLoaded', () => {
    const postUrlInput = document.getElementById('post-url');
    const loadCommentsBtn = document.getElementById('load-comments-btn');
    const commentsDisplay = document.getElementById('comments-display');
    const runGiveawayBtn = document.getElementById('run-giveaway-btn');
    const winnerDisplay = document.getElementById('winner-display');

    let comments = []; // Array to store comments

    // Function to load comments (mock implementation for now)
    loadCommentsBtn.addEventListener('click', () => {
        const postUrl = postUrlInput.value;
        if (!postUrl) {
            alert('Por favor, ingresa la URL del post.');
            return;
        }

        // Mock comments - replace with actual API call in the future
        comments = [
            { id: 1, user: 'Usuario1', text: '¡Gran post!' },
            { id: 2, user: 'Usuario2', text: 'Me encanta esta idea.' },
            { id: 3, user: 'Usuario3', text: 'Participando :)' },
            { id: 4, user: 'Usuario4', text: '¡Quiero ganar!' },
            { id: 5, user: 'Usuario5', text: 'Excelente contenido.' },
        ];

        commentsDisplay.innerHTML = `<h3>Comentarios Cargados:</h3><ul>${comments.map(c => `<li>${c.user}: ${c.text}</li>`).join('')}</ul>`;
        runGiveawayBtn.disabled = false;
        loadCommentsBtn.disabled = true;
        postUrlInput.disabled = true;
    });

    // Function to run the giveaway
    runGiveawayBtn.addEventListener('click', () => {
        if (comments.length === 0) {
            alert('No hay comentarios cargados para sortear.');
            return;
        }

        const winnerIndex = Math.floor(Math.random() * comments.length);
        const winner = comments[winnerIndex];

        winnerDisplay.innerHTML = `<h3>¡El Ganador es!</h3><p>${winner.user}</p><p>Comentario: "${winner.text}"</p>`;
        runGiveawayBtn.disabled = true;
    });

    // Initial state
    runGiveawayBtn.disabled = true;
});
