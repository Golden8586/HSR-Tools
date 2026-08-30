function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');
}

// Master Roster with official PNG image URLs and exact game kit descriptions
const MASTER_ROSTER = [
  {
    name: "Acheron",
    role: "DPS",
    archetype: "Nihility",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1308.png",
    sigLC: "Along the Passing Shore",
    sigDesc: "Increases CRIT DMG by 36%. Applies Mirage to enemies for 1 turn, causing them to take 24% increased DMG and Ult DMG by 24%.",
    e1: "CRIT Rate increases by 18% when dealing DMG to enemies with debuffs.",
    e2: "Reduces required Nihility allies for Max Trace from 2 to 1. Gains 1 Slashed Dream stack at turn start and applies 1 Crimson Knot."
  },
  {
    name: "Feixiao",
    role: "DPS",
    archetype: "FUA",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1220.png",
    sigLC: "I Venture Forth to Hunt",
    sigDesc: "Increases CRIT Rate by 15%. Ignores 54% DEF when dealing Ultimate DMG after applying Follow-up Attacks.",
    e1: "Ultimate DMG is increased by up to 60% based on the number of Flying Aureus points consumed.",
    e2: "Requires 1 fewer ally attack to gain 1 Flying Aureus stack (triggers on every ally attack)."
  },
  {
    name: "Firefly",
    role: "DPS",
    archetype: "Break",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1310.png",
    sigLC: "Where Dreams Dwell",
    sigDesc: "Increases Break Effect by 60%. Inflicts Rout on targets for 2 turns, slowing them by 20% and increasing Break DMG taken by 24%.",
    e1: "Enhanced Skill ignores 15% DEF and consumes 0 Skill Points.",
    e2: "Grants 1 extra turn immediately after breaking an enemy or defeating a target with Enhanced Basic/Skill."
  },
  {
    name: "Robin",
    role: "Support",
    archetype: "Universal",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1309.png",
    sigLC: "Flowing Nightglow",
    sigDesc: "Increases Energy Regen Rate by 15% during Concerto. Increases teamwide DMG by 24% and ATK by 48%.",
    e1: "While Concerto state is active, all allies gain 24% All-Type RES PEN.",
    e2: "While Concerto state is active, increases teamwide SPD by 16% and Robin's energy regen from talent by 1."
  },
  {
    name: "Ruan Mei",
    role: "Support",
    archetype: "Break",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1303.png",
    sigLC: "Past Self in Mirror",
    sigDesc: "Increases Break Effect by 60%. Increases team DMG by 24% after Ult and restores 1 SP if Break Effect >= 150%. Restores 10 Energy per wave.",
    e1: "While Ultimate Field is active, all allies ignore 20% of the target's DEF.",
    e2: "Increases team ATK by 40% when attacking Weakness Broken enemies."
  },
  {
    name: "Aventurine",
    role: "Sustain",
    archetype: "FUA",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1304.png",
    sigLC: "Inherently Unjust Destiny",
    sigDesc: "Increases DEF by 40%. Increases CRIT DMG by 40% when granting shields. Target takes 10% increased FUA DMG.",
    e1: "Increases team CRIT DMG by 20%. Ultimate grants Fortified Wager Shield to the entire party without needing Skill.",
    e2: "Basic ATK reduces the target's All-Type RES by 12% for 3 turns."
  },
  {
    name: "Sparkle",
    role: "Support",
    archetype: "Hypercarry",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1301.png",
    sigLC: "Earthly Escapade",
    sigDesc: "Increases CRIT DMG by 32%. Grants Mask at battle start, boosting party CRIT Rate by 10% and CRIT DMG by 28%.",
    e1: "Cipher state grants an additional 40% ATK to all allies and extends Cipher duration by 1 turn.",
    e2: "Each Cipher stack allows allies to ignore 8% of the target's DEF (max 24%)."
  },
  {
    name: "Jiaoqiu",
    role: "Support",
    archetype: "Nihility",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1218.png",
    sigLC: "Those Many Springs",
    sigDesc: "Increases Effect Hit Rate by 60%. Applies Unarmed state to targets, increasing enemy DMG taken by 24%.",
    e1: "Team deals 48% increased DMG to enemies with Ashen Roast.",
    e2: "Ashen Roast DoT scaling is dramatically boosted by +300% ATK."
  },
  {
    name: "Lingsha",
    role: "Sustain",
    archetype: "Break",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1222.png",
    sigLC: "Scent Alone Stays True",
    sigDesc: "Increases Break Effect by 60%. Targets hit by Ult take 18% increased Break DMG for 2 turns.",
    e1: "Weakness Break Efficiency increased by 20%. Reduces broken enemy DEF by 20%.",
    e2: "Casting Ultimate increases all allies' Break Effect by 40% for 2 turns."
  },
  {
    name: "Gepard",
    role: "Sustain",
    archetype: "Universal",
    icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1104.png",
    sigLC: "Moment of Victory",
    sigDesc: "Increases DEF by 24% and Effect Hit Rate by 24%. Increases agro and gains an additional 24% DEF when hit.",
    e1: "Skill base chance to Freeze increases to 100%.",
    e2: "When frozen enemies thaw out, their Speed is reduced by 20% for 1 turn."
  }
];

const WARP_HISTORY = [
  { name: "Feixiao", pity: 76, outcome: "WON 50/50", icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1220.png" },
  { name: "Acheron", pity: 78, outcome: "WON 50/50", icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1308.png" },
  { name: "Gepard", pity: 81, outcome: "LOST 50/50", icon: "https://raw.githubusercontent.com/Mar-V-Mel/Reroll-Assets/main/hsr/1104.png" }
];

class AdvisorEngine {
  constructor() {
    this.owned = new Map();
    this.owned.set("Acheron", { eidolon: 0, hasSig: false });
    this.owned.set("Feixiao", { eidolon: 0, hasSig: false });
    this.owned.set("Gepard", { eidolon: 0, hasSig: false });
  }

  init() {
    this.renderRoster();
    this.renderWarpTracker();
  }

  onSearchInput(query) {
    const popup = document.getElementById('searchSuggestions');
    if (!query.trim()) {
      popup.classList.add('hidden');
      this.renderRoster();
      return;
    }

    const matches = MASTER_ROSTER.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));
    
    if (matches.length === 0) {
      popup.classList.add('hidden');
    } else {
      popup.innerHTML = matches.map(m => `
        <div class="suggestion-item" onclick="advisor.selectFromSearch('${m.name}')">
          <img class="suggestion-avatar" src="${m.icon}" alt="${m.name}">
          <div>
            <div style="font-weight: 700; color: #fff; font-size: 0.85rem;">${m.name}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${m.role} • ${m.archetype}</div>
          </div>
        </div>
      `).join('');
      popup.classList.remove('hidden');
    }

    this.renderRoster(query);
  }

  selectFromSearch(name) {
    document.getElementById('characterSearch').value = name;
    document.getElementById('searchSuggestions').classList.add('hidden');
    if (!this.owned.has(name)) {
      this.owned.set(name, { eidolon: 0, hasSig: false });
    }
    this.renderRoster(name);
  }

  renderRoster(filter = "") {
    const grid = document.getElementById('rosterGrid');
    grid.innerHTML = '';

    MASTER_ROSTER.filter(u => u.name.toLowerCase().includes(filter.toLowerCase())).forEach(u => {
      const isOwned = this.owned.has(u.name);
      const data = this.owned.get(u.name) || { eidolon: 0, hasSig: false };

      const card = document.createElement('div');
      card.className = `char-card ${isOwned ? 'selected' : ''}`;

      card.innerHTML = `
        <img class="char-avatar-img" src="${u.icon}" alt="${u.name}">
        <div class="char-name">${u.name}</div>
        ${isOwned ? `
          <div class="card-controls" onclick="event.stopPropagation()">
            <select onchange="advisor.updateE('${u.name}', parseInt(this.value))">
              ${[0,1,2,3,4,5,6].map(e => `<option value="${e}" ${data.eidolon === e ? 'selected' : ''}>E${e}</option>`).join('')}
            </select>
            <button style="background:${data.hasSig ? 'var(--hsr-gold)' : 'transparent'}; color:${data.hasSig ? '#000' : '#fff'}; border:1px solid var(--hsr-gold); border-radius:4px; font-size:0.65rem; cursor:pointer;" onclick="advisor.toggleSig('${u.name}')">LC</button>
          </div>
        ` : ''}
      `;

      card.onclick = () => {
        if (this.owned.has(u.name)) this.owned.delete(u.name);
        else this.owned.set(u.name, { eidolon: 0, hasSig: false });
        this.renderRoster(filter);
      };

      grid.appendChild(card);
    });
  }

  renderWarpTracker() {
    const container = document.getElementById('pityGalleryContainer');
    container.innerHTML = '';

    WARP_HISTORY.forEach(item => {
      const card = document.createElement('div');
      card.className = 'pity-card';
      const isWon = item.outcome.startsWith("WON");
      
      card.innerHTML = `
        <div class="pity-badge">${item.pity} Pity</div>
        <img class="char-avatar-img" style="margin-top:0.4rem;" src="${item.icon}" alt="${item.name}">
        <div class="char-name" style="margin-bottom:0;">${item.name}</div>
        <div class="pity-outcome ${isWon ? 'won' : 'lost'}">${item.outcome}</div>
      `;
      container.appendChild(card);
    });
  }

  updateE(name, val) {
    if (this.owned.has(name)) this.owned.get(name).eidolon = val;
  }

  toggleSig(name) {
    if (this.owned.has(name)) {
      this.owned.get(name).hasSig = !this.owned.get(name).hasSig;
      this.renderRoster(document.getElementById('characterSearch').value);
    }
  }

  analyze() {
    const ownedNames = Array.from(this.owned.keys());
    const pullEl = document.getElementById('pullRecommendations');
    const vertEl = document.getElementById('verticalInvestments');

    let pulls = [];
    let verts = [];

    const sustains = ownedNames.filter(n => MASTER_ROSTER.find(u => u.name === n)?.role === "Sustain");
    const hasRobin = ownedNames.includes("Robin");
    const hasRM = ownedNames.includes("Ruan Mei");

    if (sustains.length < 2) {
      pulls.push({ 
        title: "High Priority: Limited 5★ Sustain", 
        desc: `You have ${sustains.length} limited sustain(s). Securing 2 limited sustains (Aventurine, Lingsha, Huohuo, Fu Xuan) is essential for MoC / AS / SU content.`, 
        priority: "high" 
      });
    }

    if (!hasRobin && !hasRM) {
      pulls.push({ 
        title: "Top Priority: Universal Support Core (Robin or Ruan Mei)", 
        desc: "Robin and Ruan Mei offer unmatched party-wide RES PEN, Action Advance, and Break efficiency.", 
        priority: "high" 
      });
    }

    ownedNames.forEach(name => {
      const char = MASTER_ROSTER.find(u => u.name === name);
      if (!char) return;

      if (char.archetype === "FUA" && char.role === "DPS") {
        if (!hasRobin) pulls.push({ title: `Synergy: Robin for ${name}`, desc: `Robin gains Energy on every follow-up trigger, maximizing ${name}'s attack rate.`, priority: "high" });
        if (!ownedNames.includes("Aventurine")) pulls.push({ title: `Synergy: Aventurine for ${name}`, desc: `Aventurine's Blinded Bet stacks build faster with ally follow-up attacks.`, priority: "mid" });
      }

      if (char.name === "Acheron" && !ownedNames.includes("Jiaoqiu")) {
        pulls.push({ title: "Synergy: Jiaoqiu for Acheron", desc: "Jiaoqiu provides continuous stack generation on enemy turns, drastically accelerating Acheron's Ultimate.", priority: "high" });
      }
    });

    ownedNames.forEach(name => {
      const data = this.owned.get(name);
      const char = MASTER_ROSTER.find(u => u.name === name);
      if (!char || !data) return;

      if (!data.hasSig && char.sigLC) {
        verts.push({
          title: `${name} Signature Light Cone (${char.sigLC})`,
          desc: char.sigDesc,
          priority: (["Acheron", "Feixiao", "Firefly"].includes(name)) ? "high" : "mid"
        });
      }

      if (data.eidolon < 1 && char.e1) {
        verts.push({
          title: `${name} Eidolon 1`,
          desc: char.e1,
          priority: "mid"
        });
      }

      if (data.eidolon < 2 && char.e2) {
        verts.push({
          title: `${name} Eidolon 2`,
          desc: char.e2,
          priority: (["Acheron", "Feixiao", "Firefly"].includes(name)) ? "high" : "mid"
        });
      }
    });

    if (pulls.length === 0) pulls.push({ title: "Roster Core Complete", desc: "Your roster covers all essential roles and synergy pairs.", priority: "mid" });
    if (verts.length === 0) verts.push({ title: "Max Vertical Investment Reached", desc: "Your selected roster already possesses priority Signature Light Cones and Eidolons.", priority: "mid" });

    pullEl.innerHTML = pulls.map(p => `<div class="rec-box"><div class="rec-title">${p.title}</div><div class="rec-desc">${p.desc}</div></div>`).join('');
    vertEl.innerHTML = verts.map(v => `<div class="rec-box"><div class="rec-title">${v.title}</div><div class="rec-desc">${v.desc}</div></div>`).join('');
  }
}

class SimEngine {
  constructor() {
    this.units = [
      { id: 1, name: 'Pela', speed: 161, relicSet: 'eagle', ultCycle: 2, danceAdvance: 0, actionAdvanceAmount: 0, advanceTarget: 'none' },
      { id: 2, name: 'Bronya', speed: 134, relicSet: 'none', ultCycle: 3, danceAdvance: 0, actionAdvanceAmount: 100, advanceTarget: '1' }
    ];
  }

  init() {
    this.renderUnits();
    this.runSimulation();
  }

  addUnit() {
    this.units.push({
      id: Date.now(),
      name: `Unit ${this.units.length + 1}`,
      speed: 120,
      relicSet: 'none',
      ultCycle: 3,
      danceAdvance: 0,
      actionAdvanceAmount: 0,
      advanceTarget: 'none'
    });
    this.renderUnits();
    this.runSimulation();
  }

  removeUnit(id) {
    this.units = this.units.filter(u => u.id !== id);
    this.renderUnits();
    this.runSimulation();
  }

  updateUnit(id, field, value) {
    const unit = this.units.find(u => u.id === id);
    if (unit) unit[field] = value;
  }

  renderUnits() {
    const container = document.getElementById('simUnitContainer');
    container.innerHTML = '';

    this.units.forEach(u => {
      const card = document.createElement('div');
      card.className = 'unit-card';

      let targetOptions = `<option value="none" ${u.advanceTarget === 'none' ? 'selected' : ''}>No Target</option><option value="team" ${u.advanceTarget === 'team' ? 'selected' : ''}>Entire Team</option>`;
      this.units.forEach(other => {
        if (other.id !== u.id) {
          targetOptions += `<option value="${other.id}" ${u.advanceTarget.toString() === other.id.toString() ? 'selected' : ''}>${other.name}</option>`;
        }
      });

      card.innerHTML = `
        <div class="card-top">
          <input type="text" style="font-weight: bold;" value="${u.name}" onchange="sim.updateUnit(${u.id}, 'name', this.value); sim.renderUnits();">
          ${this.units.length > 1 ? `<button class="hsr-btn small danger" onclick="sim.removeUnit(${u.id})">✕</button>` : ''}
        </div>
        <div class="grid-2 field-group">
          <div>
            <label>Speed (SPD)</label>
            <input type="number" value="${u.speed}" step="0.1" oninput="sim.updateUnit(${u.id}, 'speed', parseFloat(this.value) || 0)">
            <div class="pill-presets">
              <span class="pill" onclick="sim.updateUnit(${u.id}, 'speed', 134); sim.renderUnits();">134</span>
              <span class="pill" onclick="sim.updateUnit(${u.id}, 'speed', 143); sim.renderUnits();">143</span>
              <span class="pill" onclick="sim.updateUnit(${u.id}, 'speed', 160.1); sim.renderUnits();">160.1</span>
            </div>
          </div>
          <div>
            <label>Relic / Planar Set</label>
            <select onchange="sim.updateUnit(${u.id}, 'relicSet', this.value)">
              <option value="none" ${u.relicSet === 'none' ? 'selected' : ''}>Standard Set</option>
              <option value="vonwacq" ${u.relicSet === 'vonwacq' ? 'selected' : ''}>Sprightly Vonwacq / Lushaka</option>
              <option value="eagle" ${u.relicSet === 'eagle' ? 'selected' : ''}>4pc Eagle of Twilight</option>
            </select>
          </div>
        </div>
        <div class="grid-2 field-group">
          <div>
            <label>Ult Frequency</label>
            <select onchange="sim.updateUnit(${u.id}, 'ultCycle', parseInt(this.value))">
              <option value="0" ${u.ultCycle === 0 ? 'selected' : ''}>Manual / None</option>
              <option value="1" ${u.ultCycle === 1 ? 'selected' : ''}>Every 1 Turn</option>
              <option value="2" ${u.ultCycle === 2 ? 'selected' : ''}>Every 2 Turns</option>
              <option value="3" ${u.ultCycle === 3 ? 'selected' : ''}>Every 3 Turns</option>
            </select>
          </div>
          <div>
            <label>Dance! Dance! Dance!</label>
            <select onchange="sim.updateUnit(${u.id}, 'danceAdvance', parseFloat(this.value))">
              <option value="0" ${u.danceAdvance === 0 ? 'selected' : ''}>None</option>
              <option value="16" ${u.danceAdvance === 16 ? 'selected' : ''}>S1 (16% Advance)</option>
              <option value="24" ${u.danceAdvance === 24 ? 'selected' : ''}>S5 (24% Advance)</option>
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div>
            <label>Skill Action Advance %</label>
            <input type="number" value="${u.actionAdvanceAmount}" placeholder="e.g. 100 or 50" oninput="sim.updateUnit(${u.id}, 'actionAdvanceAmount', parseFloat(this.value) || 0)">
          </div>
          <div>
            <label>Advance Target</label>
            <select onchange="sim.updateUnit(${u.id}, 'advanceTarget', this.value)">${targetOptions}</select>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  runSimulation() {
    const maxAV = parseFloat(document.getElementById('simLimitSelect').value);

    let state = this.units.map(u => {
      const baseAV = u.speed > 0 ? (10000 / u.speed) : 999999;
      let startAdvance = u.danceAdvance;
      if (u.relicSet === 'vonwacq') startAdvance += 40;
      return {
        ...u,
        baseAV: baseAV,
        currentAV: Math.max(0, baseAV * (1 - (startAdvance / 100))),
        turnsTaken: 0,
        startAdvanceApplied: startAdvance
      };
    });

    let currentSimAV = 0;
    let cycle = 0;
    let cycleThreshold = 150;
    let timelineEvents = [];

    while (currentSimAV <= maxAV) {
      state.sort((a, b) => a.currentAV - b.currentAV);
      let actor = state[0];
      let avPassed = actor.currentAV;

      currentSimAV += avPassed;
      if (currentSimAV > maxAV) break;

      while (currentSimAV >= cycleThreshold && cycleThreshold <= maxAV) {
        timelineEvents.push({ type: 'cycle', cycleNumber: cycle, limit: cycleThreshold });
        cycle++;
        cycleThreshold += 100;
      }

      state.forEach(u => u.currentAV -= avPassed);
      actor.turnsTaken++;

      timelineEvents.push({
        type: 'turn',
        name: actor.name,
        turnNum: actor.turnsTaken,
        simAV: currentSimAV,
        speed: actor.speed,
        note: (actor.turnsTaken === 1 && actor.startAdvanceApplied > 0) ? `-${actor.startAdvanceApplied}% Start AV` : ''
      });

      if (actor.actionAdvanceAmount > 0) {
        if (actor.advanceTarget === 'team') {
          state.forEach(u => {
            if (u.id !== actor.id) u.currentAV = Math.max(0, u.currentAV - (u.baseAV * (actor.actionAdvanceAmount / 100)));
          });
          timelineEvents.push({ type: 'advance', name: actor.name, simAV: currentSimAV, note: `Advanced Entire Team by ${actor.actionAdvanceAmount}%` });
        } else if (actor.advanceTarget !== 'none') {
          let targetUnit = state.find(u => u.id.toString() === actor.advanceTarget.toString());
          if (targetUnit) {
            targetUnit.currentAV = Math.max(0, targetUnit.currentAV - (targetUnit.baseAV * (actor.actionAdvanceAmount / 100)));
            timelineEvents.push({ type: 'advance', name: actor.name, simAV: currentSimAV, note: `Advanced ${targetUnit.name} by ${actor.actionAdvanceAmount}%` });
          }
        }
      }

      let nextTurnAV = actor.baseAV;
      if (actor.relicSet === 'eagle' && actor.ultCycle > 0) {
        if (actor.turnsTaken % actor.ultCycle === 0) {
          nextTurnAV -= (actor.baseAV * 0.25);
          timelineEvents.push({ type: 'ult', name: actor.name, simAV: currentSimAV, note: 'Eagle 4pc Triggered (-25% Base AV)' });
        }
      }
      actor.currentAV = Math.max(0, nextTurnAV);
    }

    const summaryContainer = document.getElementById('summaryContainer');
    summaryContainer.innerHTML = '';
    this.units.forEach(u => {
      let unitState = state.find(s => s.id === u.id);
      let turns = unitState ? unitState.turnsTaken : 0;
      const card = document.createElement('div');
      card.className = 'summary-card';
      card.innerHTML = `<div class="count">${turns}</div><div class="name">${u.name}</div>`;
      summaryContainer.appendChild(card);
    });

    const output = document.getElementById('timelineOutput');
    output.innerHTML = '';

    timelineEvents.forEach(e => {
      const node = document.createElement('div');
      if (e.type === 'cycle') {
        node.className = 'timeline-node cycle-marker';
        node.innerHTML = `<span>End of MoC Cycle ${e.cycleNumber}</span> <span>${e.limit} Cumulative AV</span>`;
      } else if (e.type === 'ult') {
        node.className = 'timeline-node ult-event';
        node.innerHTML = `<div style="display:flex; align-items:center; gap:0.6rem;"><span class="badge ult">ULT</span><div><div style="font-weight:700; color:#a855f7; font-size:0.9rem;">${e.name} Cast Ultimate</div><div style="font-size:0.75rem; color:var(--text-muted);">${e.note}</div></div></div><div style="font-weight:700; color:#a855f7;">${e.simAV.toFixed(1)} AV</div>`;
      } else if (e.type === 'advance') {
        node.className = 'timeline-node advance-event';
        node.innerHTML = `<div style="display:flex; align-items:center; gap:0.6rem;"><span class="badge adv">SKILL</span><div><div style="font-weight:700; color:var(--hsr-gold); font-size:0.9rem;">${e.name} Action Advance</div><div style="font-size:0.75rem; color:var(--text-muted);">${e.note}</div></div></div><div style="font-weight:700; color:var(--hsr-gold);">${e.simAV.toFixed(1)} AV</div>`;
      } else {
        node.className = 'timeline-node';
        const noteText = e.note ? `<span style="font-size:0.75rem; color:var(--hsr-gold); margin-left:0.4rem;">(${e.note})</span>` : '';
        node.innerHTML = `<div style="display:flex; align-items:center; gap:0.6rem;"><span class="badge">Turn ${e.turnNum}</span><div><div style="font-weight:700; font-size:0.95rem;">${e.name} ${noteText}</div><div style="font-size:0.75rem; color:var(--text-muted);">${e.speed} SPD</div></div></div><div style="text-align:right;"><div style="font-weight:700; color:var(--hsr-gold); font-size:1.05rem;">${e.simAV.toFixed(1)}</div><div style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">AV</div></div>`;
      }
      output.appendChild(node);
    });
  }
}

// Global initialization
const advisor = new AdvisorEngine();
const sim = new SimEngine();

advisor.init();
sim.init();

// Close search popup on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    document.getElementById('searchSuggestions')?.classList.add('hidden');
  }
});
