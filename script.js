// -----------------------------
// RHUTHVIK BANTU - Live Cricket JS
// -----------------------------

const API_KEY = "https://cricket-api-free-data.p.rapidapi.com/cricket-players?teamid=2"; // 🔴 Replace with your RapidAPI key
const API_HOST = "cricket-api-free-data.p.rapidapi.com";

// -----------------------------
// Helper Functions
// -----------------------------
const fetchJSON = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    });
    return await response.json();
  } catch (err) {
    console.error("API fetch error:", err);
    return null;
  }
};

// -----------------------------
// Render Match Cards
// -----------------------------
const renderMatches = (matches, containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  matches.forEach((match) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Extract match info safely
    const team1 = match["team-1"] || "Team 1";
    const team2 = match["team-2"] || "Team 2";
    const score = match.score || "Not Available";
    const status = match.matchStarted ? "Live" : "Upcoming";

    // Dummy win probability (simulate or replace with API if available)
    const winProb = match.matchStarted
      ? Math.floor(Math.random() * 100)
      : null;

    // Dummy commentary
    const commentary = match.matchStarted
      ? `Batsman hits ${Math.floor(Math.random() * 6) + 1} runs!`
      : "Match not started yet.";

    card.innerHTML = `
      <h3>${team1} vs ${team2}</h3>
      <p>Status: ${status}</p>
      <p>Score: ${score}</p>
      ${
        winProb !== null
          ? `<p>Win Probability: <span style="color: gold; font-weight: bold;">${winProb}%</span></p>`
          : ""
      }
      <p>Commentary: ${commentary}</p>
    `;

    container.appendChild(card);
  });
};

// -----------------------------
// Fetch Live Matches
// -----------------------------
const fetchLiveMatches = async () => {
  const data = await fetchJSON(
    `https://${API_HOST}/cricket-players?teamid=2`
  );

  if (!data || !data.players) return;

  // Transform players to dummy match data (for demo)
  const matches = [
    {
      "team-1": "RCB",
      "team-2": "MI",
      score: "120/3",
      matchStarted: true,
    },
    {
      "team-1": "CSK",
      "team-2": "KKR",
      score: "85/2",
      matchStarted: true,
    },
    {
      "team-1": "DC",
      "team-2": "RR",
      matchStarted: false,
    },
  ];

  renderMatches(matches, "live-matches");
};

// -----------------------------
// Fetch Upcoming Matches
// -----------------------------
const fetchUpcomingMatches = async () => {
  // Dummy data; replace with API call if your endpoint supports
  const upcomingMatches = [
    { "team-1": "SRH", "team-2": "PBKS", matchStarted: false },
    { "team-1": "IND", "team-2": "PAK", matchStarted: false },
  ];

  renderMatches(upcomingMatches, "upcoming-matches");
};

// -----------------------------
// Fetch Finished Matches
// -----------------------------
const fetchFinishedMatches = async () => {
  const finishedMatches = [
    {
      "team-1": "MI",
      "team-2": "CSK",
      score: "180/7 - 175/9",
      matchStarted: true,
    },
  ];

  renderMatches(finishedMatches, "finished-matches");
};

// -----------------------------
// Auto Refresh All
// -----------------------------
const refreshAll = async () => {
  await fetchLiveMatches();
  await fetchUpcomingMatches();
  await fetchFinishedMatches();
};

// -----------------------------
// Initial Call
// -----------------------------
refreshAll();

// -----------------------------
// Auto Refresh Every 10 Seconds
// -----------------------------
setInterval(refreshAll, 10000);

// -----------------------------
// Chat functionality (frontend only)
// -----------------------------
document.getElementById("send-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value || "Guest";
  const message = document.getElementById("message").value;
  if (!message.trim()) return;

  const chatBox = document.getElementById("chat-box");
  const p = document.createElement("p");
  p.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
  document.getElementById("message").value = "";
});
