// REPLACE WITH THIS:
function switchTab(tabId, btn) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');
  if (btn) btn.classList.add('active');

  // Triggers engine updates on tab switch
  if (tabId === 'advisorTab' && window.advisor) {
    window.advisor.renderRoster(document.getElementById('characterSearch')?.value || '');
  } else if (tabId === 'pityTab' && window.advisor) {
    window.advisor.renderPityGallery(document.getElementById('trackerInput')?.value || '');
    window.advisor.calculateStats();
  } else if (tabId === 'simTab' && window.sim) {
    window.sim.renderUnits();
    window.sim.runSimulation();
  }
}

const MASTER_ROSTER = [
  { name: "Acheron", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1308.png", role: "DPS", archetype: "Nihility", sigLC: "Along the Passing Shore", sigDesc: "Essential for stack generation per turn + CRIT DMG.", e1: "18% CRIT Rate against debuffed targets.", e2: "Requires only 1 Nihility teammate; unlocks Harmony supports." },
  { name: "Argenti", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1302.png", role: "DPS", archetype: "Erudition", sigLC: "An Instant Before A Gaze", sigDesc: "High Ultimate DMG multiplier based on Max Energy.", e1: "Grants 40% CRIT DMG stacking from Talent.", e2: "ATK% boost when 3+ enemies are present." },
  { name: "Aventurine", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1304.png", role: "Sustain", archetype: "FUA", sigLC: "Inherently Unjust Destiny", sigDesc: "DEF boost + vulnerability debuff on enemy follow-up.", e1: "Ultimate applies Shield; team CRIT DMG +20%.", e2: "Basic ATK applies 12% All-Type RES PEN debuff." },
  { name: "Bailu", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1205.png", role: "Sustain", archetype: "Universal", sigLC: "Time Waits for No One", sigDesc: "Max HP% boost + bonus DMG on heal.", e1: "Energy regen when ally with Invigoration is max HP.", e2: "Healing output increased by 15% after Ultimate." },
  { name: "Black Swan", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1307.png", role: "DPS", archetype: "DoT", sigLC: "Reforged Remembrance", sigDesc: "EHR boost + massive DEF ignore on DoT triggers.", e1: "Reduces enemy RES by 25% for active DoT types.", e2: "Spreads Arcana stacks when an enemy is defeated." },
  { name: "Blade", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1201.png", role: "DPS", archetype: "Hypercarry", sigLC: "The Unreachable Side", sigDesc: "Max HP% boost + incoming damage enhancement.", e1: "Ultimate single-target execute DMG scaling.", e2: "Increases CRIT Rate by 15% while Hellscape is active." },
  { name: "Boothill", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1315.png", role: "DPS", archetype: "Break", sigLC: "Sailing Towards a Second Life", sigDesc: "Break Effect + DEF ignore on Break DMG + Speed.", e1: "Starts battle with 1 Pocket Trickshot; ignores 16% DEF.", e2: "Regenerates 1 SP when triggering Pocket Trickshot." },
  { name: "Bronya", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1101.png", role: "Support", archetype: "Hypercarry", sigLC: "But the Battle Isn't Over", sigDesc: "Energy Regen + SP refund on Ult + Next Ally DMG%.", e1: "50% chance to recover 1 SP when using Skill.", e2: "Advanced target gains +30% SPD for 1 turn." },
  { name: "Clara", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1107.png", role: "DPS", archetype: "Counter", sigLC: "Something Irreplaceable", sigDesc: "ATK% boost + HP recovery on hit taken.", e1: "Mark of Svarog is no longer removed on Skill.", e2: "Increases ATK by 30% for 2 turns after Ultimate." },
  { name: "Dan Heng • Imbibitor Lunae", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1213.png", role: "DPS", archetype: "Hypercarry", sigLC: "Brighter Than the Sun", sigDesc: "CRIT Rate + Energy Regen on 3-EBA.", e1: "Increases Righteous Heart stacks max limit.", e2: "100% Action Advance after Ultimate + 1 Squama Sacra." },
  { name: "Dr. Ratio", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1305.png", role: "DPS", archetype: "FUA", sigLC: "Baptism of Pure Thought", sigDesc: "CRIT DMG boost + ignores DEF per debuff on target.", e1: "Increases Summation stack limit by 4.", e2: "Follow-up deals extra trace damage per debuff." },
  { name: "Feixiao", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1220.png", role: "DPS", archetype: "FUA", sigLC: "I Venture Forth to Hunt", sigDesc: "CRIT Rate + DEF ignore on Ultimate attacks.", e1: "Increases Ultimate DMG scaling per stack.", e2: "Doubles Flying Aureus stack gain from ally FUAs." },
  { name: "Firefly", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1310.png", role: "DPS", archetype: "Break", sigLC: "Where Dreams Dwell", sigDesc: "Break Effect + enemy slow + incoming Break DMG increase.", e1: "Enhanced Skill ignores 15% DEF and costs 0 SP.", e2: "Grants extra turn upon breaking or killing an enemy." },
  { name: "Fu Xuan", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1208.png", role: "Sustain", archetype: "Universal", sigLC: "She Already Shut Her Eyes", sigDesc: "HP% + ER% + Team DMG boost + wave HP regen.", e1: "Knowledge state grants team +30% CRIT DMG.", e2: "Team revive once per battle during Skill." },
  { name: "Fugue", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1225.png", role: "Support", archetype: "Break", sigLC: "Long Road Has No End", sigDesc: "Break Effect sharing + weakness break efficiency.", e1: "Reduces enemy Break Recovery speed.", e2: "Team Super Break DMG multiplier increase." },
  { name: "Gepard", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1104.png", role: "Sustain", archetype: "Universal", sigLC: "Moment of Victory", sigDesc: "DEF% boost + Effect Hit Rate + Agro increase.", e1: "Skill freeze base probability increases to 100%.", e2: "Enemies slowed after unfreezing." },
  { name: "Himeko", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1003.png", role: "DPS", archetype: "Erudition", sigLC: "Night on the Milky Way", sigDesc: "ATK% per enemy + Break DMG boost.", e1: "Gains 20% SPD for 2 turns after Talent triggers.", e2: "Deals 15% extra DMG to enemies below 50% HP." },
  { name: "Huohuo", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1217.png", role: "Sustain", archetype: "Universal", sigLC: "Night of Fright", sigDesc: "Energy Regen + Healing scaling ATK% buff.", e1: "Skill grants team +12% SPD and 1 extra turn duration.", e2: "Revives downed ally during Divine Provision state." },
  { name: "Jade", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1314.png", role: "DPS", archetype: "FUA", sigLC: "Yet Hope Is Priceless", sigDesc: "CRIT Rate + FUA DMG DEF ignore stacking.", e1: "Debt Collector ally attacks grant extra Pawn stacks.", e2: "Grants 18% CRIT Rate when Pawn stacks reach 15." },
  { name: "Jiaoqiu", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1218.png", role: "Support", archetype: "Nihility", sigLC: "Those Many Springs", sigDesc: "Effect Hit Rate + enemy vulnerability debuff.", e1: "Team deals 48% increased DMG to Ashen Roast targets.", e2: "Ashen Roast DoT scaling dramatically increased." },
  { name: "Jing Yuan", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1204.png", role: "DPS", archetype: "FUA", sigLC: "Before Dawn", sigDesc: "Massive CRIT DMG + Skill/Ult/FUA DMG multipliers.", e1: "Lightning-Lord adjacent target damage increased.", e2: "Increases Basic/Skill/Ult damage after Lightning-Lord acts." },
  { name: "Jingliu", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1212.png", role: "DPS", archetype: "Hypercarry", sigLC: "I Shall Be My Own Sword", sigDesc: "CRIT DMG + Ally HP drain for DEF ignore.", e1: "Single target Ultimate/Skill gains massive CRIT DMG.", e2: "Next Enhanced Skill after Ult deals +80% DMG." },
  { name: "Kafka", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1005.png", role: "DPS", archetype: "DoT", sigLC: "Patience Is All You Need", sigDesc: "SPD stacking + Erosion DoT application.", e1: "Talent FUA increases DoT taken by target by 30%.", e2: "While Kafka is alive, team DoT DMG increases by 25%." },
  { name: "Lingsha", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1222.png", role: "Sustain", archetype: "Break", sigLC: "Scent Alone Stays True", sigDesc: "Break Effect + enemy Break DMG vulnerability.", e1: "Weakness Break Efficiency +20%; reduces enemy DEF when broken.", e2: "Ultimate grants team +40% Break Effect." },
  { name: "Luocha", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1203.png", role: "Sustain", archetype: "Universal", sigLC: "Echoes of the Coffin", sigDesc: "ATK% boost + Team SPD buff on Ultimate.", e1: "Field grants team +20% ATK.", e2: "Skill shield or healing output increased." },
  { name: "Rappa", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1317.png", role: "DPS", archetype: "Break", sigLC: "Ninjutsu Inscription", sigDesc: "Break Effect + Energy gain on wave start.", e1: "Enhanced Basic ATK ignores 15% DEF.", e2: "Breaks enemy toughness bar regardless of weakness type." },
  { name: "Robin", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1309.png", role: "Support", archetype: "Universal", sigLC: "Flowing Nightglow", sigDesc: "Energy Regen + Team ATK% buff while Concerto active.", e1: "Concerto state grants team 24% All-Type RES PEN.", e2: "Concerto state grants team +16% SPD." },
  { name: "Ruan Mei", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1303.png", role: "Support", archetype: "Universal", sigLC: "Past Self in Mirror", sigDesc: "Break Effect + Team DMG% + SP generation on Ult.", e1: "Ultimate field ignores 20% of enemy DEF.", e2: "Team ATK +40% when attacking Weakness Broken enemies." },
  { name: "Seele", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1102.png", role: "DPS", archetype: "Hypercarry", sigLC: "In the Night", sigDesc: "CRIT Rate + Speed-scaling Skill/Ult DMG.", e1: "CRIT Rate +15% against enemies below 80% HP.", e2: "Speed buff from Skill can stack up to 2 times." },
  { name: "Silver Wolf", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1006.png", role: "Support", archetype: "Nihility", sigLC: "Incessant Rain", sigDesc: "Effect Hit Rate + CRIT Rate + Aether Code debuff.", e1: "Regenerates Energy per debuff on enemy when using Ult.", e2: "Enemies entering battle have Effect RES reduced by 20%." },
  { name: "Sparkle", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1306.png", role: "Support", archetype: "Hypercarry", sigLC: "Earthly Escapade", sigDesc: "CRIT DMG boost + team CRIT Rate/DMG aura.", e1: "Cipher state grants +40% ATK and extends duration.", e2: "Cipher stacks ignore 8% enemy DEF per stack (max 24%)." },
  { name: "Sunday", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1313.png", role: "Support", archetype: "Hypercarry", sigLC: "A Grounded Ascent", sigDesc: "Energy Regen + Target CRIT DMG scaling.", e1: "Skill target ignores 16% DEF on attacks.", e2: "Ultimate regenerates SP and boosts team Speed." },
  { name: "Topaz & Numby", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1112.png", role: "DPS", archetype: "FUA", sigLC: "Worblesd-d-d!", sigDesc: "CRIT Rate + FUA CRIT DMG vulnerability.", e1: "Debuff stacks up to 50% CRIT DMG for FUA attacks.", e2: "Numby attacks restore 5 Energy to Topaz." },
  { name: "Yunli", img: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1221.png", role: "DPS", archetype: "Counter", sigLC: "Dance at Sunset", sigDesc: "Massive Agro increase + Counter CRIT DMG.", e1: "Intuit: Slash / Cull damage increased significantly.", e2: "Counter attacks ignore 20% of enemy DEF." }
];

let PITY_HISTORY = [
  { name: "Feixiao", pity: 76, outcome: "WON 50/50" },
  { name: "Acheron", pity: 78, outcome: "WON 50/50" },
  { name: "Gepard", pity: 81, outcome: "LOST 50/50" },
  { name: "Firefly", pity: 72, outcome: "WON 50/50" },
  { name: "Robin", pity: 80, outcome: "WON 50/50" },
  { name: "Ruan Mei", pity: 75, outcome: "WON 50/50" }
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
    this.renderPityGallery();
    this.calculateStats();
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
        <img class="char-avatar-img" src="${u.img}" alt="${u.name}" onerror="this.src='https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1001.png'">
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

  calculateStats() {
    if (PITY_HISTORY.length === 0) return;

    const totalPity = PITY_HISTORY.reduce((acc, cur) => acc + cur.pity, 0);
    const avgPity = (totalPity / PITY_HISTORY.length).toFixed(1);

    const nonGuaranteed = PITY_HISTORY.filter(p => p.outcome !== "GUARANTEED");
    const wins = nonGuaranteed.filter(p => p.outcome.startsWith("WON")).length;
    const winRate = nonGuaranteed.length > 0 ? ((wins / nonGuaranteed.length) * 100).toFixed(0) : 0;

    const softPityCount = PITY_HISTORY.filter(p => p.pity >= 75).length;
    const softPityRate = ((softPityCount / PITY_HISTORY.length) * 100).toFixed(0);

    const estRate = ((PITY_HISTORY.length / totalPity) * 100).toFixed(2);

    document.getElementById('statAvgPity').innerText = avgPity;
    document.getElementById('statWinRate').innerText = `${winRate}%`;
    document.getElementById('statSoftPity').innerText = `${softPityRate}%`;
    document.getElementById('statFiveStarRate').innerText = `${estRate}%`;
  }

  addPullRecord() {
    const nameInput = document.getElementById('pullCharName');
    const pityInput = document.getElementById('pullPityCount');
    const outcomeInput = document.getElementById('pullOutcome');

    const name = nameInput.value.trim();
    const pity = parseInt(pityInput.value);
    const outcome = outcomeInput.value;

    if (!name || isNaN(pity)) return;

    PITY_HISTORY.unshift({ name, pity, outcome });
    this.renderPityGallery();
    this.calculateStats();
    nameInput.value = '';
  }

  renderPityGallery(filter = "") {
    const container = document.getElementById('pityGalleryContainer');
    container.innerHTML = '';

    const query = filter.toLowerCase().trim();
    let displayList = PITY_HISTORY;

    if (query !== "") {
      displayList = PITY_HISTORY.filter(u => u.name.toLowerCase().includes(query));
    }

    if (displayList.length === 0) {
      container.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem; grid-column: 1 / -1;">No matching history logs found.</div>`;
      return;
    }

    displayList.forEach(item => {
      const masterChar = MASTER_ROSTER.find(u => u.name.toLowerCase() === item.name.toLowerCase());
      const imgUrl = masterChar ? masterChar.img : "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1001.png";

      const card = document.createElement('div');
      card.className = 'pity-card';
      const outcomeClass = item.outcome.startsWith("WON") ? 'won' : item.outcome.startsWith("LOST") ? 'lost' : 'guaranteed';
      
      card.innerHTML = `
        <div class="pity-badge">${item.pity} Pity</div>
        <img class="char-avatar-img" style="margin-top:0.4rem;" src="${imgUrl}" alt="${item.name}" onerror="this.src='https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1001.png'">
        <div class="char-name" style="margin-bottom:0;">${item.name}</div>
        <div class="pity-outcome ${outcomeClass}">${item.outcome}</div>
      `;
      container.appendChild(card);
    });
  }

  filterRoster() {
    const val = document.getElementById('characterSearch').value;
    this.renderRoster(val);
  }

  filterTracker() {
    const val = document.getElementById('trackerInput').value;
    this.renderPityGallery(val);
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
        desc: `You currently have ${sustains.length} limited sustain(s). Securing 2 limited sustains (Aventurine, Lingsha, Huohuo, Fu Xuan, Luocha) is essential for endgame stability.`, 
        priority: "high" 
      });
    }

    if (!hasRobin && !hasRM) {
      pulls.push({ 
        title: "Top Priority: Universal Support Core (Robin or Ruan Mei)", 
        desc: "Robin and Ruan Mei offer unmatched party-wide damage multipliers across multiple team archetypes.", 
        priority: "high" 
      });
    }

    ownedNames.forEach(name => {
      const char = MASTER_ROSTER.find(u => u.name === name);
      if (!char) return;

      if (char.archetype === "FUA" && char.role === "DPS") {
        if (!hasRobin) pulls.push({ title: `Synergy: Robin for ${name}`, desc: `Robin gains Energy on every follow-up trigger, maximizing ${name}'s action output.`, priority: "high" });
        if (!ownedNames.includes("Aventurine")) pulls.push({ title: `Synergy: Aventurine for ${name}`, desc: `Aventurine's Blinded Bet stacks build faster with ally follow-up attacks.`, priority: "mid" });
      }

      if (char.name === "Acheron") {
        if (!ownedNames.includes("Jiaoqiu")) pulls.push({ title: "Synergy: Jiaoqiu for Acheron", desc: "Jiaoqiu provides continuous stack generation on enemy turns, significantly accelerating Acheron's Ultimate.", priority: "high" });
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
          priority: (["Acheron", "Feixiao"].includes(name)) ? "high" : "mid"
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
          priority: (["Acheron", "Feixiao"].includes(name)) ? "high" : "mid"
        });
      }
    });

    if (pulls.length === 0) pulls.push({ title: "Roster Core Complete", desc: "Your roster covers all essential roles and synergy pairs.", priority: "mid" });
    if (verts.length === 0) verts.push({ title: "Max Vertical Investment Reached", desc: "Your selected roster already possesses priority Signature Light Cones and Eidolons.", priority: "mid" });

    pullEl.innerHTML = pulls.map(p => `<div class="rec-box ${p.priority}"><div class="rec-title">${p.title}</div><div class="rec-desc">${p.desc}</div></div>`).join('');
    vertEl.innerHTML = verts.map(v => `<div class="rec-box ${v.priority}"><div class="rec-title">${v.title}</div><div class="rec-desc">${v.desc}</div></div>`).join('');
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

const advisor = new AdvisorEngine();
const sim = new SimEngine();

advisor.init();
sim.init();
