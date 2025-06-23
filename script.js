// Função para adicionar comentário
function addComment(articleId) {
    const author = document.getElementById('comment-author').value;
    const text = document.getElementById('comment-text').value;
    
    if (!author || !text) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    const comment = {
        author: author,
        text: text,
        date: new Date().toLocaleString()
    };
    
    // Recupera comentários existentes ou cria um novo array
    let comments = JSON.parse(localStorage.getItem(articleId + '_comments')) || [];
    
    // Adiciona o novo comentário
    comments.push(comment);
    
    // Salva no localStorage
    localStorage.setItem(articleId + '_comments', JSON.stringify(comments));
    
    // Limpa o formulário
    document.getElementById('comment-author').value = '';
    document.getElementById('comment-text').value = '';
    
    // Recarrega os comentários
    loadComments(articleId);
}

// Função para carregar comentários
function loadComments(articleId) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
    
    const comments = JSON.parse(localStorage.getItem(articleId + '_comments')) || [];
    
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>';
        return;
    }
    
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-date">${comment.date}</div>
            <div class="comment-text">${comment.text}</div>
        `;
        commentsContainer.appendChild(commentDiv);
    });
}