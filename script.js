let allAbilities = [];
let current = null;

document.getElementById("startBtn").onclick = async () => {
  document.getElementById("feedback").innerText = "Loading abilities...";
  await fetchAbilities();
  if (allAbilities.length === 0) {
    document.getElementById("feedback").innerText = "Failed to load data.";
    return;
  }
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("startBtn").classList.add("hidden");
  newQuestion();
};

async function fetchAbilities() {
  try {
    const res = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
    const data = await res.json();

    data.data.forEach(agent => {
      agent.abilities.forEach((ability, idx) => {
        if (ability.displayIcon && ability.displayName && ability.slot !== "Passive") {
          let key = "C"; // Standard Keybind Map
          if (ability.slot === "Ability1") key = "Q";
          if (ability.slot === "Ability2") key = "E";
          if (ability.slot === "Grenade") key = "C";
          if (ability.slot === "Ultimate") key = "X";

          allAbilities.push({
            img: ability.displayIcon,
            ability: ability.displayName,
            agent: agent.displayName,
            key: key
          });
        }
      });
    });
  } catch (e) {
    console.error("Error loading API data:", e);
  }
}

function newQuestion() {
  current = allAbilities[Math.floor(Math.random() * allAbilities.length)];
  document.getElementById("abilityImg").src = current.img;
  document.getElementById("abilityName").value = "";
  document.getElementById("agentName").value = "";
  document.getElementById("keybind").value = "";
  document.getElementById("feedback").innerText = "";
}

document.getElementById("submitBtn").onclick = () => {
  const aName = document.getElementById("abilityName").value.trim().toLowerCase();
  const agName = document.getElementById("agentName").value.trim().toLowerCase();
  const key = document.getElementById("keybind").value;

  const correctAbility = current.ability.toLowerCase();
  const correctAgent = current.agent.toLowerCase();
  const correctKey = current.key;

  if (aName === correctAbility && agName === correctAgent && key === correctKey) {
    document.getElementById("feedback").innerText = "Correct! GG!";
  } else {
    document.getElementById("feedback").innerText = `Nope! It was "${current.ability}" by ${current.agent} on "${current.key}"`;
  }

  setTimeout(() => {
    newQuestion();
  }, 2500);
};
