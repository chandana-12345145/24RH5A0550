// Save a new quote
if (document.getElementById('quoteForm')) {
    document.getElementById('quoteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const quoteText = document.getElementById('quoteText').value.trim();
        const author = document.getElementById('author').value.trim();
        
        if (quoteText && author) {
            // Get existing quotes or initialize empty array
            const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
            
            // Add new quote
            quotes.push({
                text: quoteText,
                author: author,
                date: new Date().toISOString()
            });
            
            // Save back to localStorage
            localStorage.setItem('quotes', JSON.stringify(quotes));
            
            // Reset form
            document.getElementById('quoteForm').reset();
            
            // Optional: Show success message
            alert('Quote saved successfully!');
        }
    });
}

// Display saved quotes
function displaySavedQuotes() {
    const quoteList = document.getElementById('quoteList');
    if (!quoteList) return;
    
    const quotes = JSON.parse(localStorage.getItem('quotes') || []);
    
    if (quotes.length === 0) {
        quoteList.innerHTML = '<div class="empty-message">No quotes saved yet.</div>';
        return;
    }
    
    quoteList.innerHTML = quotes.map((quote, index) => `
        <div class="quote-card">
            <p class="quote-text">"${quote.text}"</p>
            <p class="quote-author">— ${quote.author}</p>
            <small>${new Date(quote.date).toLocaleDateString()}</small>
        </div>
    `).join('');
}