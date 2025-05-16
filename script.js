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

    allAbilities = []; // reset

    data.data.forEach(agent => {
      const slots = {
        "Grenade": "C",
        "Ability1": "Q",
        "Ability2": "E",
        "Ultimate": "X"
      };

      agent.abilities.forEach(ability => {
        if (
          ability.displayIcon &&
          ability.displayIcon !== "" &&
          ability.slot !== "Passive"
        ) {
          allAbilities.push({
            img: ability.displayIcon,
            ability: ability.displayName,
            agent: agent.displayName,
            key: slots[ability.slot] || "?"
          });
        }
      });
    });

    console.log("Abilities geladen:", allAbilities.length);
  } catch (err) {
    console.error("Fehler beim Laden der Abilities:", err);
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
    document.getElementById("feedback").innerText =
      `Nope! It was "${current.ability}" by ${current.agent} on "${current.key}"`;
  }

  setTimeout(() => {
    newQuestion();
  }, 2500);
};
