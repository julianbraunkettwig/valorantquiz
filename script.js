let agents = [];
let abilitiesList = [];
let current = null;

const startBtn = document.getElementById("startBtn");
const quizDiv = document.getElementById("quiz");
const abilityImg = document.getElementById("abilityImg");
const abilityNameInput = document.getElementById("abilityName");
const agentNameInput = document.getElementById("agentName");
const keybindSelect = document.getElementById("keybind");
const feedbackP = document.getElementById("feedback");
const submitBtn = document.getElementById("submitBtn");

startBtn.onclick = () => {
  startBtn.disabled = true;
  feedbackP.innerText = "Lade Daten...";
  fetchAgents();
};

function fetchAgents() {
  fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
    .then((res) => res.json())
    .then((data) => {
      agents = data.data;
      buildAbilitiesList();
      feedbackP.innerText = "";
      startBtn.classList.add("hidden");
      quizDiv.classList.remove("hidden");
      newQuestion();
    })
    .catch(() => {
      feedbackP.innerText = "Fehler beim Laden der Agenten!";
      startBtn.disabled = false;
    });
}

function buildAbilitiesList() {
  abilitiesList = [];
  agents.forEach((agent) => {
    agent.abilities.forEach((ability) => {
      // Manche Abilities haben keinen Key (z.B. Passive)
      if (ability.slot && ability.displayName && ability.displayIcon) {
        abilitiesList.push({
          ability: ability.displayName,
          agent: agent.displayName,
          key: ability.slot, // Q, E, C, X
          img: ability.displayIcon,
        });
      }
    });
  });
}

function newQuestion() {
  current = abilitiesList[Math.floor(Math.random() * abilitiesList.length)];
  abilityImg.src = current.img;
  abilityImg.alt = `${current.ability} von ${current.agent}`;

  abilityNameInput.value = "";
  agentNameInput.value = "";
  keybindSelect.value = "";
  feedbackP.innerText = "";
}

submitBtn.onclick = () => {
  const abilityInput = abilityNameInput.value.trim().toLowerCase();
  const agentInput = agentNameInput.value.trim().toLowerCase();
  const keyInput = keybindSelect.value;

  if (!abilityInput || !agentInput || !keyInput) {
    feedbackP.innerText = "Bitte alle Felder ausfüllen!";
    return;
  }

  const correctAbility = current.ability.toLowerCase();
  const correctAgent = current.agent.toLowerCase();
  const correctKey = current.key;

  if (abilityInput === correctAbility && agentInput === correctAgent && keyInput === correctKey) {
    feedbackP.innerText = "Richtig! GG!";
  } else {
    feedbackP.innerText = `Falsch! Richtig war "${current.ability}" von ${current.agent} auf "${current.key}"`;
  }

  setTimeout(() => {
    newQuestion();
  }, 2500);
};
