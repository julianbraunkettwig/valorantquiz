const allAbilities = [
  // Agent: Breach
  {
    ability: "Aftershock",
    agent: "Breach",
    key: "Q",
    img: "https://static.wikia.nocookie.net/valorant/images/d/d3/Aftershock.png"
  },
  {
    ability: "Flashpoint",
    agent: "Breach",
    key: "E",
    img: "https://static.wikia.nocookie.net/valorant/images/2/23/Flashpoint.png"
  },
  {
    ability: "Fault Line",
    agent: "Breach",
    key: "C",
    img: "https://static.wikia.nocookie.net/valorant/images/8/85/Fault_Line.png"
  },
  {
    ability: "Rolling Thunder",
    agent: "Breach",
    key: "X",
    img: "https://static.wikia.nocookie.net/valorant/images/6/62/Rolling_Thunder.png"
  },

  // Agent: Jett
  {
    ability: "Cloudburst",
    agent: "Jett",
    key: "C",
    img: "https://static.wikia.nocookie.net/valorant/images/4/4c/Cloudburst.png"
  },
  {
    ability: "Updraft",
    agent: "Jett",
    key: "Q",
    img: "https://static.wikia.nocookie.net/valorant/images/0/0b/Updraft.png"
  },
  {
    ability: "Tailwind",
    agent: "Jett",
    key: "E",
    img: "https://static.wikia.nocookie.net/valorant/images/a/a0/Tailwind.png"
  },
  {
    ability: "Blade Storm",
    agent: "Jett",
    key: "X",
    img: "https://static.wikia.nocookie.net/valorant/images/4/4f/Blade_Storm.png"
  },

  // Agent: Phoenix
  {
    ability: "Curveball",
    agent: "Phoenix",
    key: "Q",
    img: "https://static.wikia.nocookie.net/valorant/images/3/3f/Curveball.png"
  },
  {
    ability: "Blaze",
    agent: "Phoenix",
    key: "C",
    img: "https://static.wikia.nocookie.net/valorant/images/e/e0/Blaze.png"
  },
  {
    ability: "Hot Hands",
    agent: "Phoenix",
    key: "E",
    img: "https://static.wikia.nocookie.net/valorant/images/7/73/Hot_Hands.png"
  },
  {
    ability: "Run It Back",
    agent: "Phoenix",
    key: "X",
    img: "https://static.wikia.nocookie.net/valorant/images/f/f7/Run_It_Back.png"
  },

  // Agent: Sage
  {
    ability: "Barrier Orb",
    agent: "Sage",
    key: "C",
    img: "https://static.wikia.nocookie.net/valorant/images/9/9f/Barrier_Orb.png"
  },
  {
    ability: "Slow Orb",
    agent: "Sage",
    key: "Q",
    img: "https://static.wikia.nocookie.net/valorant/images/c/c6/Slow_Orb.png"
  },
  {
    ability: "Healing Orb",
    agent: "Sage",
    key: "E",
    img: "https://static.wikia.nocookie.net/valorant/images/1/1e/Healing_Orb.png"
  },
  {
    ability: "Resurrection",
    agent: "Sage",
    key: "X",
    img: "https://static.wikia.nocookie.net/valorant/images/5/55/Resurrection.png"
  },

  // Agent: Sova
  {
    ability: "Owl Drone",
    agent: "Sova",
    key: "C",
    img: "https://static.wikia.nocookie.net/valorant/images/4/48/Owl_Drone.png"
  },
  {
    ability: "Shock Bolt",
    agent: "Sova",
    key: "Q",
    img: "https://static.wikia.nocookie.net/valorant/images/5/5e/Shock_Bolt.png"
  },
  {
    ability: "Recon Bolt",
    agent: "Sova",
    key: "E",
    img: "https://static.wikia.nocookie.net/valorant/images/c/cb/Recon_Bolt.png"
  },
  {
    ability: "Hunter's Fury",
    agent: "Sova",
    key: "X",
    img: "https://static.wikia.nocookie.net/valorant/images/f/f1/Hunter%27s_Fury.png"
  },

  // Agent: Viper
  {
    ability: "Snake Bite",
    agent: "Viper",
    key: "C",
    img: "https://static.wikia.nocookie.net/valorant/images/f/f1/Snake_Bite.png"
  },
  {
    ability: "Poison Cloud",
    agent: "Viper",
    key: "Q",
    img: "https://static.wikia.nocookie.net/valorant/images/7/79/Poison_Cloud.png"
  },
  {
    ability: "Toxic Screen",
    agent: "Viper",
    key: "E",
    img: "https://static.wikia.nocookie.net/valorant/images/d/d5/Toxic_Screen.png"
  },
  {
    ability: "Viper's Pit",
    agent: "Viper",
    key: "X",
    img: "https://static.wikia.nocookie.net/valorant/images/9/9a/Viper%27s_Pit.png"
  }
];

let current = null;

document.getElementById("startBtn").onclick = () => {
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  newQuestion();
};

function newQuestion() {
  current = allAbilities[Math.floor(Math.random() * allAbilities.length)];

  const img = document.getElementById("abilityImg");
  img.src = current.img;
  img.alt = `${current.ability} von ${current.agent}`;

  document.getElementById("abilityName").value = "";
  document.getElementById("agentName").value = "";
  document.getElementById("keybind").value = "";
  document.getElementById("feedback").innerText = "";
}

document.getElementById("submitBtn").onclick = () => {
  const abilityInput = document.getElementById("abilityName").value.trim().toLowerCase();
  const agentInput = document.getElementById("agentName").value.trim().toLowerCase();
  const keyInput = document.getElementById("keybind").value;

  const correctAbility = current.ability.toLowerCase();
  const correctAgent = current.agent.toLowerCase();
  const correctKey = current.key;

  if (abilityInput === correctAbility && agentInput === correctAgent && keyInput === correctKey) {
    document.getElementById("feedback").innerText = "Richtig! GG!";
  } else {
    document.getElementById("feedback").innerText = `Falsch! Richtig war "${current.ability}" von ${current.agent} auf "${current.key}"`;
  }

  setTimeout(() => {
    newQuestion();
  }, 2500);
};
