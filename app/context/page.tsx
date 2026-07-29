import GovernanceVotes from "../page";

const profileSections = [
  "Balances",
  "My Liquidity",
  "SDEX Rewards",
  "My Liquidity Votes",
  "Governance Votes",
  "ICE Locks",
  "Payments History",
];

function AquariusLogo() {
  return (
    <div className="aqua-logo" aria-label="Aquarius">
      <img className="aqua-logo-tile" src="/assets/context/aquarius-tile.svg" alt="" />
      <img className="aqua-logo-wave" src="/assets/context/aquarius-wave.svg" alt="" />
      <img className="aqua-wordmark" src="/assets/context/aquarius-wordmark.svg" alt="aquarius" />
    </div>
  );
}

function Chevron() {
  return <span className="figma-chevron" aria-hidden="true"><img src="/assets/context/chevron.svg" alt="" /></span>;
}

function DaoBadge() {
  return <span className="dao-badge" aria-hidden="true"><img src="/assets/context/dao-left.svg" alt="" /><img src="/assets/context/dao-right.svg" alt="" /><b>3</b></span>;
}

function ProfileIcon() {
  return <span className="profile-icon" aria-hidden="true"><img src="/assets/context/profile.svg" alt="" /></span>;
}

function Avatar() {
  return (
    <span className="profile-avatar" aria-hidden="true">
      <img className="avatar-bg" src="/assets/context/avatar-bg.svg" alt="" />
      <img className="identicon" src="/assets/context/identicon.svg" alt="" />
      <span className="lobstr-badge"><img src="/assets/context/lobstr.svg" alt="" /><img src="/assets/context/lobstr-path.svg" alt="" /></span>
    </span>
  );
}

function ExplorerIcon() {
  return <span className="explorer-icon" aria-hidden="true"><img src="/assets/context/explorer-box.svg" alt="" /><img src="/assets/context/explorer-arrow-a.svg" alt="" /><img src="/assets/context/explorer-arrow-b.svg" alt="" /></span>;
}

function CopyIcon() {
  return <span className="copy-icon" aria-hidden="true"><img src="/assets/context/copy-a.svg" alt="" /><img src="/assets/context/copy-b.svg" alt="" /></span>;
}

function PlusIcon() {
  return <span className="plus-icon" aria-hidden="true"><img src="/assets/context/plus-horizontal.svg" alt="" /><img src="/assets/context/plus-vertical.svg" alt="" /></span>;
}

function ShareIcon() {
  return <span className="share-icon" aria-hidden="true"><img src="/assets/context/share-tray.svg" alt="" /><img src="/assets/context/share-head.svg" alt="" /><img src="/assets/context/share-stem.svg" alt="" /></span>;
}

function StellarIcon() {
  return <span className="stellar-icon" aria-hidden="true"><img src="/assets/context/stellar-top.svg" alt="" /><img src="/assets/context/stellar-bottom.svg" alt="" /></span>;
}

function InfoIcon() {
  return <span className="info-icon" aria-hidden="true"><img src="/assets/context/info-circle.svg" alt="" /><img src="/assets/context/info-line.svg" alt="" /><img src="/assets/context/info-dot.svg" alt="" /></span>;
}

export default function ContextPage() {
  return (
    <div className="context-page">
      <header className="product-header">
        <AquariusLogo />
        <nav className="product-nav" aria-label="Product navigation">
          <div className="product-menu">
            <span className="nav-spacer" />
            <span className="nav-pools">Pools</span>
            <span className="nav-swap">Swap</span>
            <i />
            <span className="nav-incentives">Incentives <Chevron /></span>
            <span className="nav-dao">DAO <DaoBadge /><Chevron /></span>
            <span className="nav-aqua">AQUA &amp; ICE <Chevron /></span>
          </div>
        </nav>
        <div className="product-account">
          <button className="my-aquarius"><ProfileIcon /><span>My Aquarius</span></button>
          <div className="account-wallet">
            <Avatar />
            <span className="account-copy"><b>johndoe*lobstr.co</b><small>GAHB5NLW...S2L7BNLU</small></span>
            <Chevron />
          </div>
        </div>
      </header>

      <section className="profile-area">
        <div className="profile-shell">
          <div className="profile-heading">
            <div className="profile-name">
              <Avatar />
              <div><strong>johndoe*lobstr.co</strong><span>GCY2DDE4...AYWSRRUD</span></div>
            </div>
            <div className="profile-actions">
              <button>Explorer <ExplorerIcon /></button>
              <button className="copy-profile" aria-label="Copy public key"><CopyIcon /></button>
            </div>
          </div>

          <section className="balances-card">
            <div className="balance-column">
              <p className="balance-label">Your available AQUA balance</p>
              <div className="balance-value"><img src="/assets/context/aqua.svg" alt="" /><strong>25,024.62 AQUA</strong></div>
              <div className="balance-stats aqua-stats">
                <div><b className="amm-tag">AquariusAMM</b><strong>5,488.83</strong><span>AQUA in AMM pool</span></div>
                <div><b className="lock-tag">LOCK</b><strong>123,039.12</strong><span>AQUA locked</span></div>
              </div>
            </div>

            <div className="balance-column ice-column">
              <div className="balance-topline">
                <p className="balance-label">Your current ICE balance</p>
                <div><button className="get-ice"><PlusIcon />GET ICE</button><button className="delegate"><ShareIcon />DELEGATE</button></div>
              </div>
              <div className="balance-value"><img src="/assets/context/ice-large.svg" alt="" /><strong>251,039.12 ICE</strong></div>
              <div className="balance-stats">
                <div><span>UpvoteICE</span><strong><img src="/assets/context/ice-small.svg" alt="" />2,039.12</strong></div>
                <div><span>GovernICE</span><strong><img src="/assets/context/ice-small.svg" alt="" />123,039.12</strong></div>
              </div>
            </div>

            <div className="xlm-row">
              <span>XLM balance:</span>
              <StellarIcon />
              <strong>5,287.91 <small>XLM</small></strong>
              <p>☝️ <span>XLM is used to pay network fees</span><InfoIcon /></p>
            </div>
          </section>

          <nav className="profile-sections" aria-label="Profile sections">
            {profileSections.map((item) => <span className={item === "Governance Votes" ? "active" : ""} key={item}>{item}</span>)}
          </nav>
        </div>
      </section>

      <section className="context-votes">
        <GovernanceVotes />
      </section>
    </div>
  );
}
