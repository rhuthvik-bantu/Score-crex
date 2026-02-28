// RHUTHVIK BANTU - Full Live Cricket Frontend

const LIVE_API = "http://localhost:3000/api/live";
const UPCOMING_API = "http://localhost:3000/api/upcoming";
const FINISHED_API = "http://localhost:3000/api/finished";

async function fetchJSON(url){
  try{ const res = await fetch(url); return await res.json(); }
  catch(err){ console.error("Fetch error:",err); return []; }
}

function renderMatches(matches, containerId){
  const container = document.getElementById(containerId);
  container.innerHTML="";
  matches.forEach(m=>{
    const team1 = m["team-1"]||"Team 1";
    const team2 = m["team-2"]||"Team 2";
    const status = m.matchStarted?"Live":(m.matchEnded?"Finished":"Upcoming");
    const score = m.score||"N/A";
    const winProb = m.winProbability!==undefined?m.winProbability:null;
    const commentary = m.commentary||"No commentary yet";

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
      <h3>${team1} vs ${team2}</h3>
      <p>Status: ${status}</p>
      <p>Score: ${score}</p>
      ${winProb!==null?`<p>Win Probability: <strong>${winProb}%</strong></p>`:""}
      <p>Commentary: ${commentary}</p>
    `;
    container.appendChild(card);
  });
}

async function refreshAll(){
  renderMatches(await fetchJSON(LIVE_API),"live-matches");
  renderMatches(await fetchJSON(UPCOMING_API),"upcoming-matches");
  renderMatches(await fetchJSON(FINISHED_API),"finished-matches");
}

// Initial load
refreshAll();
// Auto-refresh every 10 seconds
setInterval(refreshAll,10000);

// Chatbox (frontend only)
document.getElementById("send-btn").addEventListener("click",()=>{
  const username = document.getElementById("username").value || "Guest";
  const message = document.getElementById("message").value;
  if(!message.trim()) return;
  const chatBox = document.getElementById("chat-box");
  const p = document.createElement("p");
  p.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
  document.getElementById("message").value="";
});
