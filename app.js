const ready = [
  {id:"#176",title:"Increase AMM rewards for stablecoin pools",status:"Accepted",statusType:"accepted",votes:[
    {id:"176-for",type:"Vote For",date:"Jun 18, 09:42",amount:126.44,dot:"#872ab0"},
    {id:"176-against",type:"Vote Against",date:"Jun 20, 16:07",amount:58.20,dot:"#ff3c64"},
    {id:"176-abstain",type:"Vote Abstain",date:"Jun 21, 11:18",amount:31.75,dot:"#e8e8ed"}]},
  {id:"#181",title:"Whitelist EURC as a governance asset",status:"Accepted",statusType:"accepted",votes:[
    {id:"181-for",type:"Vote For",date:"Jul 2, 14:33",amount:204.50,dot:"#872ab0"}]},
  {id:"#184",title:"Reduce protocol fee for AQUA/USDC pools",status:"Rejected",statusType:"rejected",votes:[
    {id:"184-for",type:"Vote For",date:"Jul 9, 08:14",amount:73.12,dot:"#872ab0"},
    {id:"184-against",type:"Vote Against",date:"Jul 10, 19:26",amount:42.86,dot:"#ff3c64"}]},
  {id:"#189",title:"Fund Q3 community grants program",status:"No quorum",statusType:"plain",votes:[
    {id:"189-for",type:"Vote For",date:"Jul 21, 12:51",amount:168.04,dot:"#872ab0"}]}
];

const progress = [
  {id:"#192",title:"Treasury diversification: USDC and EURC",progressStatus:"Ends in 18h",votes:[
    {id:"192-for",type:"Vote For",date:"Jul 27, 10:06",amount:188.35,dot:"#872ab0"},
    {id:"192-abstain",type:"Vote Abstain",date:"Jul 27, 17:42",amount:44.18,dot:"#e8e8ed"}]},
  {id:"#194",title:"Extend market maker incentives through Q4",progressStatus:"Ends in 3d",votes:[
    {id:"194-against",type:"Vote Against",date:"Jul 28, 09:15",amount:97.60,dot:"#ff3c64"}]},
  {id:"#197",title:"Add XLM/AQUA concentrated liquidity pool",progressStatus:"Ends in 6d",votes:[
    {id:"197-for-a",type:"Vote For",date:"Jul 28, 13:04",amount:143.21,dot:"#872ab0"},
    {id:"197-for-b",type:"Vote For",date:"Jul 29, 08:27",amount:86.90,dot:"#872ab0"},
    {id:"197-against",type:"Vote Against",date:"Jul 29, 11:53",amount:39.74,dot:"#ff3c64"}]}
];

const claimed = [
  {id:"#161",title:"Migrate legacy liquidity rewards to Soroban",status:"Accepted",statusType:"accepted",votes:[
    {id:"161-for",type:"Vote For",date:"Apr 3, 10:22",amount:215.08,dot:"#872ab0",claimed:"Claimed Apr 12, 2026, 09:40"},
    {id:"161-abstain",type:"Vote Abstain",date:"Apr 4, 15:08",amount:34.90,dot:"#e8e8ed",claimed:"Claimed Apr 12, 2026, 09:40"}]},
  {id:"#169",title:"Introduce quarterly governance reports",status:"Accepted",statusType:"accepted",votes:[
    {id:"169-for",type:"Vote For",date:"May 16, 12:37",amount:108.44,dot:"#872ab0",claimed:"Claimed May 28, 2026, 14:12"}]},
  {id:"#173",title:"Update emergency council signer set",status:"Rejected",statusType:"rejected",votes:[
    {id:"173-for",type:"Vote For",date:"Jun 2, 08:52",amount:62.10,dot:"#872ab0",claimed:"Claimed Jun 11, 2026, 10:05"},
    {id:"173-against",type:"Vote Against",date:"Jun 2, 18:19",amount:91.75,dot:"#ff3c64",claimed:"Claimed Jun 11, 2026, 10:05"},
    {id:"173-abstain",type:"Vote Abstain",date:"Jun 3, 11:31",amount:28.36,dot:"#e8e8ed",claimed:"Claimed Jun 11, 2026, 10:05"}]},
  {id:"#178",title:"Sunset rewards for low-liquidity pairs",status:"No quorum",statusType:"plain",votes:[
    {id:"178-for",type:"Vote For",date:"Jun 24, 16:44",amount:149.80,dot:"#872ab0",claimed:"Claimed Jul 2, 2026, 12:26"}]}
];

const allReady = ready.flatMap(proposal => proposal.votes);
let mode = "ready";
let selected = new Set();
const app = document.querySelector("#app");

function statusMarkup(proposal) {
  if (mode === "progress") {
    return `<span class="status pending"><img src="./assets/pending.svg" alt="">${proposal.progressStatus}</span>`;
  }
  if (proposal.statusType === "plain") return `<span class="status">${proposal.status}</span>`;
  return `<span class="status"><img src="./assets/${proposal.statusType}.svg" alt="">${proposal.status}</span>`;
}

function voteMarkup(vote) {
  const picked = selected.has(vote.id);
  const check = mode === "ready"
    ? `<input type="checkbox" ${picked ? "checked" : ""} aria-label="Select ${vote.type}">`
    : "";
  const claimedAt = mode === "claimed" ? `<small>${vote.claimed}</small>` : "";
  return `
    <div class="vote ${mode === "ready" ? "selectable" : "static"} ${picked ? "selected" : ""}"
      ${mode === "ready" ? `role="button" tabindex="0" aria-pressed="${picked}" data-vote-id="${vote.id}"` : ""}>
      ${check}
      <div class="vote-copy">
        <div><i style="background:${vote.dot}"></i>${vote.type}</div>
        <span>${vote.date}</span>
      </div>
      <div class="${mode === "claimed" ? "amount-stack" : "amount"}">
        <span><img src="./assets/ice.svg" alt="ICE">${vote.amount.toFixed(2)} governICE</span>
        ${claimedAt}
      </div>
    </div>`;
}

function render() {
  const data = mode === "ready" ? ready : mode === "progress" ? progress : claimed;
  const readyTotal = allReady.reduce((sum, vote) => sum + vote.amount, 0);
  const selectedTotal = allReady
    .filter(vote => selected.has(vote.id))
    .reduce((sum, vote) => sum + vote.amount, 0);
  const proposals = data.map((proposal, index) => `
    <article class="proposal ${index ? "with-line" : ""}">
      <header>
        <div class="proposal-title"><span>${proposal.id}</span><h2>${proposal.title}</h2></div>
        ${statusMarkup(proposal)}
      </header>
      ${proposal.votes.map(voteMarkup).join("")}
    </article>`).join("");

  app.innerHTML = `
    <div class="prototype ${mode === "ready" && selected.size ? "has-selection" : ""}">
      <h1>Governance votes</h1>
      <nav class="tabs" role="tablist" aria-label="Vote status">
        <button data-mode="ready" class="${mode === "ready" ? "active" : ""}">Ready to claim <b><i></i>${allReady.length} votes</b></button>
        <button data-mode="progress" class="${mode === "progress" ? "active" : ""}">In progress</button>
        <button data-mode="claimed" class="${mode === "claimed" ? "active" : ""}">Claimed votes</button>
      </nav>
      ${mode === "ready" ? `
        <section class="summary">
          <div><strong>${readyTotal.toFixed(2)} governICE</strong><span>${allReady.length} votes across ${ready.length} proposals</span></div>
          <button class="primary">Claim all</button>
        </section>` : ""}
      <section class="proposals">${proposals}</section>
      ${mode === "ready" && selected.size ? `
        <aside class="selection">
          <div><span>${selected.size} ${selected.size === 1 ? "vote" : "votes"} selected</span><strong>${selectedTotal.toFixed(2)} governICE</strong></div>
          <div class="actions"><button class="clear">Clear</button><button class="claim">Claim selected</button></div>
        </aside>` : ""}
    </div>`;
}

app.addEventListener("click", event => {
  const tab = event.target.closest("[data-mode]");
  if (tab) {
    mode = tab.dataset.mode;
    render();
    return;
  }
  const clear = event.target.closest(".clear");
  if (clear) {
    selected.clear();
    render();
    return;
  }
  const row = event.target.closest("[data-vote-id]");
  if (row) {
    const id = row.dataset.voteId;
    selected.has(id) ? selected.delete(id) : selected.add(id);
    render();
  }
});

app.addEventListener("keydown", event => {
  const row = event.target.closest("[data-vote-id]");
  if (row && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    row.click();
  }
});

render();
