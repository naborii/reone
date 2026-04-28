const siteData = window.OnePieceSiteData;

function getPackParam() {
  return new URLSearchParams(window.location.search).get("pack");
}

function renderPackOverview(groups) {
  const list = document.querySelector("#packList");
  list.innerHTML = groups
    .map(
      (group) => `
        <a class="pack-card" href="packs.html?pack=${encodeURIComponent(group.pack)}">
          <p class="card-label">CARD PACK</p>
          <h3>${group.pack}</h3>
          <p>${group.cards.length}장 샘플 카드</p>
        </a>
      `,
    )
    .join("");
}

function renderSelectedPack(groups) {
  const selectedPack = getPackParam() ?? groups[0]?.pack;
  const packGroup = groups.find((group) => group.pack === selectedPack) ?? groups[0];
  const title = document.querySelector("#packTitle");
  const desc = document.querySelector("#packDescription");
  const mount = document.querySelector("#packCards");

  title.textContent = packGroup.pack;
  desc.textContent = `${packGroup.cards.length}장의 샘플 카드가 연결되어 있습니다.`;
  mount.innerHTML = packGroup.cards
    .map(
      (card) => `
        <article class="db-card">
          <img src="${card.imageUrl}" alt="${card.name}">
          <div class="tag-row">
            <span class="tag">${card.color}</span>
            <span class="tag">${card.cardType}</span>
            <span class="tag">${card.rarity}</span>
          </div>
          <h4>${card.name}</h4>
          <p>${card.effect}</p>
          <div class="detail-actions">
            <a class="button secondary" href="card.html?card=${encodeURIComponent(card.cardNumber)}">카드 상세</a>
          </div>
        </article>
      `,
    )
    .join("");
}

function initPacksPage() {
  const groups = siteData.getPackGroups();
  renderPackOverview(groups);
  renderSelectedPack(groups);
}

initPacksPage();
