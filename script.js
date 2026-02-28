const LIVE_API = "http://localhost:3000/api/live";

async function fetchLiveMatches() {
  try {
    const res = await fetch(LIVE_API);
    const matches = await res.json();

    const container = document.getElementById("live-matches");
    container.innerHTML = "";

    matches.forEach(match => {
      const team1 = match["team-1"] || "Team 1";
      const team2 = match["team-2"] || "Team 2";
      const score = match.score || "N/A";
      const commentary = `Batsman hits ${Math.floor(Math.random()*6)+1} runs!`;
      const winProb = Math.floor(Math.random()*100);

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${team1} vs ${team2}</h3>
        <p>Score: ${score}</p>
        <p>Win Probability: ${winProb}%</p>
        <p>Commentary: ${commentary}</p>
      `;
      container.appendChild(card);
    });
  } catch(err) {
    console.error("Error fetching live matches:", err);
  }
}

// Auto-refresh
fetchLiveMatches();
setInterval(fetchLiveMatches, 10000);
