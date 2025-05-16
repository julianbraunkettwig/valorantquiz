const abilities = [
  {
    img: "https://static.wikia.nocookie.net/valorant/images/8/89/Paranoia.png", // Beispielbild
    ability: "Paranoia",
    agent: "Omen",
    key: "Q"
  },
  {
    img: "https://static.wikia.nocookie.net/valorant/images/e/e7/Leer.png",
    ability: "Leer",
    agent: "Reyna",
    key: "C"
  }
  // Weitere Einträge möglich...
];

let current = 0;

document.getElementById("startBtn").onclick = () => {
  current = Math.floor(Math.random() * abilities.length);
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("startBtn").classList.add("hidden");
  loadAbility();
};

function loadAbility() {
  const ability = abilities[current];
  document.getElementById("abilityImg").src = ability.img;
  document.getElementById("abilityName").value = "";
  document.getElementById("agentName").value = "";
  document.getElementById("keybind").value = "";
  document.getElementById("feedback").innerText = "";
}

document.getElementById("submitBtn").onclick = () => {
  const aName = document.getElementById("abilityName").value.trim().toLowerCase();
  const agName = document.getElementById("agentName").value.trim().toLowerCase();
  const key = document.getElementById("keybind").value;

  const ability = abilities[current];
  const correctAbility = ability.ability.toLowerCase();
  const correctAgent = ability.agent.toLowerCase();
  const correctKey = ability.key;

  if (aName === correctAbility && agName === correctAgent && key === correctKey) {
    document.getElementById("feedback").innerText = "Correct! Nice one!";
  } else {
    document.getElementById("feedback").innerText = `Nope! It was "${ability.ability}" by ${ability.agent} on "${ability.key}"`;
  }

  // Neue Frage laden
  setTimeout(() => {
    current = Math.floor(Math.random() * abilities.length);
    loadAbility();
  }, 2000);
};
