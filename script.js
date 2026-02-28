// Show main content after 3 sec
setTimeout(() => {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
}, 3000);

// Dummy Data
const liveMatches = [
    { team1: 'RCB', team2: 'MI', score: '120/3', overs: '15.2', prediction: 'RCB 60%' },
    { team1: 'CSK', team2: 'KKR', score: '80/2', overs: '10.0', prediction: 'CSK 55%' },
];
const upcomingMatches = [
    { team1: 'RR', team2: 'DC', date: '01 Mar', time: '7:30 PM' },
    { team1: 'SRH', team2: 'PBKS', date: '02 Mar', time: '3:30 PM' },
];
const finishedMatches = [
    { team1: 'MI', team2: 'CSK', score: '180/7 - 175/9', result: 'MI won by 5 runs' },
];
const newsCards = [
    { title: 'RCB Wins Thrilling Match!', desc: 'RCB beats MI in last over thriller.' },
    { title: 'CSK Player Injured', desc: 'Key CSK player ruled out of next match.' },
];

// Render Function
function renderMatches() {
    const liveContainer = document.getElementById('live-matches');
    liveMatches.forEach(match => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h3>${match.team1} vs ${match.team2}</h3>
                          <p>Score: ${match.score}</p>
                          <p>Overs: ${match.overs}</p>
                          <p>Prediction: ${match.prediction}</p>`;
        liveContainer.appendChild(card);
    });

    const upcomingContainer = document.getElementById('upcoming-matches');
    upcomingMatches.forEach(match => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h3>${match.team1} vs ${match.team2}</h3>
                          <p>Date: ${match.date}</p>
                          <p>Time: ${match.time}</p>`;
        upcomingContainer.appendChild(card);
    });

    const finishedContainer = document.getElementById('finished-matches');
    finishedMatches.forEach(match => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h3>${match.team1} vs ${match.team2}</h3>
                          <p>${match.score}</p>
                          <p>Result: ${match.result}</p>`;
        finishedContainer.appendChild(card);
    });

    const newsContainer = document.getElementById('news-cards');
    newsCards.forEach(news => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h4>${news.title}</h4><p>${news.desc}</p>`;
        newsContainer.appendChild(card);
    });
}

// Chat simulation
document.getElementById('send-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value || 'Guest';
    const message = document.getElementById('message').value;
    if(message.trim() === '') return;
    const chatBox = document.getElementById('chat-box');
    const p = document.createElement('p');
    p.innerHTML = `<strong>${username}:</strong> ${message}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById('message').value = '';
});

// Initialize
renderMatches();
