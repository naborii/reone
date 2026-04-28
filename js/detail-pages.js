const siteData = window.OnePieceSiteData;

function byId(id) {
  return document.querySelector(id);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderCardPage() {
  const card = siteData.getCardByNumber(getQueryParam("card"));
  byId("#pageTitle").textContent = `${card.name} | 카드 상세`;
  byId("#pageEyebrow").textContent = "CARD DETAIL PAGE";
  byId("#pageHeading").textContent = card.name;
  byId("#pageDescription").textContent = `${card.cardNumber} · ${card.pack}`;

  byId("#detailMount").innerHTML = `
    <article class="info-card detail-page-card">
      <div class="detail-body">
        <img class="detail-card-image" src="${card.imageUrl}" alt="${card.name}">
        <div>
          <div class="tag-row">
            <span class="tag">${card.color}</span>
            <span class="tag">${card.cardType}</span>
            <span class="tag">${card.rarity}</span>
            ${(card.featureTags ?? []).map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <p class="deck-summary">${card.effect}</p>
          <div class="detail-stats">
            <div class="detail-stat">카드 번호<strong>${card.cardNumber}</strong></div>
            <div class="detail-stat">수록 팩<strong>${card.pack}</strong></div>
            <div class="detail-stat">비용<strong>${card.cost}</strong></div>
            <div class="detail-stat">파워<strong>${card.power}</strong></div>
            <div class="detail-stat">카운터<strong>${card.counter}</strong></div>
            <div class="detail-stat">타입<strong>${card.cardType}</strong></div>
          </div>
          <div class="detail-actions">
            <a class="button secondary" href="packs.html?pack=${encodeURIComponent(card.pack)}">같은 팩 카드 보기</a>
            <a class="button secondary" href="index.html#database/${encodeURIComponent(card.cardNumber)}">메인에서 보기</a>
          </div>
        </div>
      </div>
    </article>
    <article class="info-card">
      <p class="card-label">RAW JSON</p>
      <pre class="json-preview">${JSON.stringify(card, null, 2)}</pre>
    </article>
  `;
}

function renderDeckPage() {
  const deck = siteData.getDeckById(getQueryParam("id"));
  const linkedCards = deck.coreCards
    .map(siteData.findCardByName)
    .filter(Boolean)
    .map(
      (card) => `
        <a class="tag" href="card.html?card=${encodeURIComponent(card.cardNumber)}">${card.name}</a>
      `,
    )
    .join("");

  byId("#pageTitle").textContent = `${deck.name} | 덱 상세`;
  byId("#pageEyebrow").textContent = "DECK DETAIL PAGE";
  byId("#pageHeading").textContent = deck.name;
  byId("#pageDescription").textContent = `${deck.leader} 리더 기반 덱 상세`;

  byId("#detailMount").innerHTML = `
    <article class="info-card detail-page-card">
      <div class="tag-row">
        ${deck.colors.map((color) => `<span class="tag">${color}</span>`).join("")}
        ${deck.styleTags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <p class="deck-summary">${deck.summary}</p>
      <div class="score-line">
        <div class="score-box">
          <span>초보자 추천도</span>
          <strong>${deck.beginnerScore}</strong>
        </div>
        <div class="score-box">
          <span>운영 난이도</span>
          <strong>${deck.difficulty}</strong>
        </div>
      </div>
      <div class="score-line">
        <div class="score-box">
          <span>강점</span>
          <strong>${deck.strongPoints.join(" / ")}</strong>
        </div>
        <div class="score-box">
          <span>약점</span>
          <strong>${deck.weakPoints.join(" / ")}</strong>
        </div>
      </div>
      <div>
        <p class="card-label">핵심 카드</p>
        <div class="core-list">${linkedCards}</div>
      </div>
      <div class="detail-actions">
        <a class="button secondary" href="index.html#decks/${encodeURIComponent(deck.id)}">메인에서 보기</a>
      </div>
    </article>
    <article class="info-card">
      <p class="card-label">RAW JSON</p>
      <pre class="json-preview">${JSON.stringify(deck, null, 2)}</pre>
    </article>
  `;
}

if (document.body.dataset.pageType === "card") {
  renderCardPage();
}

if (document.body.dataset.pageType === "deck") {
  renderDeckPage();
}
