const siteData = window.OnePieceSiteData;
const DECK_LIMIT = 50;
const COPY_LIMIT = 4;
const STORAGE_KEY = "onepiece-deck-builder-v2";

const state = loadState();

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        deckName: "새 덱",
        leaderCardNumber: siteData.getLeaderCards()[0]?.cardNumber ?? "",
        keyword: "",
        color: "all",
        type: "all",
        viewMode: "grid",
        entries: {},
      };
    }
    const parsed = JSON.parse(raw);
    return {
      deckName: parsed.deckName || "새 덱",
      leaderCardNumber: parsed.leaderCardNumber || siteData.getLeaderCards()[0]?.cardNumber || "",
      keyword: parsed.keyword || "",
      color: parsed.color || "all",
      type: parsed.type || "all",
      viewMode: parsed.viewMode || "grid",
      entries: parsed.entries || {},
    };
  } catch {
    return {
      deckName: "새 덱",
      leaderCardNumber: siteData.getLeaderCards()[0]?.cardNumber ?? "",
      keyword: "",
      color: "all",
      type: "all",
      viewMode: "grid",
      entries: {},
    };
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function totalCount() {
  return Object.values(state.entries).reduce((sum, count) => sum + count, 0);
}

function getDeckCards() {
  return Object.entries(state.entries)
    .filter(([, count]) => count > 0)
    .map(([cardNumber, count]) => ({
      card: siteData.getCardByNumber(cardNumber),
      count,
    }));
}

function getFilteredCards() {
  return siteData.cards.filter((card) => {
    if (card.cardType === "리더") {
      return false;
    }

    const matchesKeyword =
      card.name.toLowerCase().includes(state.keyword) ||
      card.effect.toLowerCase().includes(state.keyword) ||
      card.cardNumber.toLowerCase().includes(state.keyword);
    const matchesColor = state.color === "all" || card.color === state.color;
    const matchesType = state.type === "all" || card.cardType === state.type;
    return matchesKeyword && matchesColor && matchesType;
  });
}

function getValidationIssues() {
  const issues = [];
  const leader = siteData.getCardByNumber(state.leaderCardNumber);
  const deckCards = getDeckCards();

  if (!leader || leader.cardType !== "리더") {
    issues.push("리더를 선택해야 합니다.");
  }

  if (totalCount() !== DECK_LIMIT) {
    issues.push(`덱은 ${DECK_LIMIT}장이어야 합니다. 현재 ${totalCount()}장입니다.`);
  }

  deckCards.forEach(({ card, count }) => {
    if (count > COPY_LIMIT) {
      issues.push(`${card.name}은 ${COPY_LIMIT}장까지만 넣을 수 있습니다.`);
    }

    if (leader && !siteData.isCardAllowedForLeader(card, state.leaderCardNumber)) {
      issues.push(`${card.name}은 현재 리더 색상과 맞지 않습니다.`);
    }
  });

  return [...new Set(issues)];
}

function renderLeaderOptions() {
  const select = document.querySelector("#leaderSelect");
  if (select.dataset.filled) {
    select.value = state.leaderCardNumber;
    return;
  }

  select.innerHTML = siteData
    .getLeaderCards()
    .map(
      (leader) => `
        <option value="${leader.cardNumber}">${leader.name} (${leader.color})</option>
      `,
    )
    .join("");
  select.dataset.filled = "true";
  select.value = state.leaderCardNumber;
}

function renderFilters() {
  const colorSelect = document.querySelector("#builderColor");
  const typeSelect = document.querySelector("#builderType");
  const viewModeSelect = document.querySelector("#viewMode");

  if (!colorSelect.dataset.filled) {
    siteData.getUniqueValues("color").forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      colorSelect.appendChild(option);
    });
    colorSelect.dataset.filled = "true";
  }

  if (!typeSelect.dataset.filled) {
    siteData.getUniqueValues("cardType")
      .filter((value) => value !== "리더")
      .forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        typeSelect.appendChild(option);
      });
    typeSelect.dataset.filled = "true";
  }

  colorSelect.value = state.color;
  typeSelect.value = state.type;
  viewModeSelect.value = state.viewMode;
  document.querySelector("#builderSearch").value = state.keyword;
}

function renderLibrary() {
  const mount = document.querySelector("#builderLibrary");
  const list = getFilteredCards();
  mount.className = state.viewMode === "list" ? "builder-library-list" : "card-grid";

  mount.innerHTML = list
    .map((card) => {
      const count = state.entries[card.cardNumber] ?? 0;
      const disabled = totalCount() >= DECK_LIMIT && count === 0;
      const blockedByLeader = !siteData.isCardAllowedForLeader(card, state.leaderCardNumber);

      if (state.viewMode === "list") {
        return `
          <article class="builder-list-row ${blockedByLeader ? "blocked-card" : ""}">
            <div class="builder-list-main">
              <strong>${card.name}</strong>
              <p>${card.cardNumber} · ${card.color} · ${card.cardType} · ${card.pack}</p>
              <p>${card.effect}</p>
            </div>
            <div class="builder-row-actions">
              <span class="meta-chip">현재 ${count}장</span>
              <button class="control-button attack" data-add-card="${card.cardNumber}" ${disabled || blockedByLeader ? "disabled" : ""}>추가</button>
            </div>
          </article>
        `;
      }

      return `
        <article class="db-card builder-card ${blockedByLeader ? "blocked-card" : ""}">
          <img src="${card.imageUrl}" alt="${card.name}">
          <div class="tag-row">
            <span class="tag">${card.color}</span>
            <span class="tag">${card.cardType}</span>
            <span class="tag">${card.rarity}</span>
          </div>
          <h4>${card.name}</h4>
          <p>${card.effect}</p>
          <div class="builder-actions">
            <span class="meta-chip">현재 ${count}장</span>
            <button class="control-button attack" data-add-card="${card.cardNumber}" ${disabled || blockedByLeader ? "disabled" : ""}>추가</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSummary() {
  const leader = siteData.getCardByNumber(state.leaderCardNumber);
  const deckCards = getDeckCards();
  const colorCounts = new Map();
  const typeCounts = new Map();
  const issues = getValidationIssues();

  deckCards.forEach(({ card, count }) => {
    colorCounts.set(card.color, (colorCounts.get(card.color) ?? 0) + count);
    typeCounts.set(card.cardType, (typeCounts.get(card.cardType) ?? 0) + count);
  });

  document.querySelector("#deckName").value = state.deckName;
  document.querySelector("#deckTotal").textContent = String(totalCount());
  document.querySelector("#selectedLeaderName").textContent = leader?.name ?? "없음";

  document.querySelector("#deckColors").innerHTML =
    [...colorCounts.entries()].map(([key, value]) => `<span class="tag">${key} ${value}</span>`).join("") ||
    '<span class="tag">아직 카드 없음</span>';

  document.querySelector("#deckTypes").innerHTML =
    [...typeCounts.entries()].map(([key, value]) => `<span class="tag">${key} ${value}</span>`).join("") ||
    '<span class="tag">아직 카드 없음</span>';

  document.querySelector("#deckValidation").innerHTML =
    issues.length === 0
      ? '<div class="validation-item ok">현재 기준으로 덱 규칙을 만족합니다.</div>'
      : issues.map((issue) => `<div class="validation-item">${issue}</div>`).join("");

  document.querySelector("#deckExport").textContent = JSON.stringify(
    {
      name: state.deckName,
      leader: leader
        ? {
            cardNumber: leader.cardNumber,
            name: leader.name,
            color: leader.color,
          }
        : null,
      total: totalCount(),
      cards: deckCards.map(({ card, count }) => ({
        cardNumber: card.cardNumber,
        name: card.name,
        count,
      })),
    },
    null,
    2,
  );

  document.querySelector("#builderDeckList").innerHTML =
    deckCards
      .map(
        ({ card, count }) => `
          <article class="builder-row">
            <div>
              <strong>${card.name}</strong>
              <p>${card.cardNumber} · ${card.color} · ${card.cardType}</p>
            </div>
            <div class="builder-row-actions">
              <span class="meta-chip">${count}장</span>
              <button class="control-button defend" data-remove-card="${card.cardNumber}">제거</button>
            </div>
          </article>
        `,
      )
      .join("") || '<p class="empty-state">아직 추가한 카드가 없습니다.</p>';
}

function rerender() {
  renderLeaderOptions();
  renderFilters();
  renderLibrary();
  renderSummary();
}

function addCard(cardNumber) {
  const card = siteData.getCardByNumber(cardNumber);
  const current = state.entries[cardNumber] ?? 0;

  if (!siteData.isCardAllowedForLeader(card, state.leaderCardNumber)) {
    return;
  }

  if (current >= COPY_LIMIT) {
    return;
  }

  if (totalCount() >= DECK_LIMIT && current === 0) {
    return;
  }

  state.entries[cardNumber] = current + 1;
  saveState();
  rerender();
}

function removeCard(cardNumber) {
  if (!state.entries[cardNumber]) {
    return;
  }

  state.entries[cardNumber] -= 1;
  if (state.entries[cardNumber] <= 0) {
    delete state.entries[cardNumber];
  }

  saveState();
  rerender();
}

function resetDeck() {
  state.entries = {};
  saveState();
  rerender();
}

function bindEvents() {
  document.querySelector("#builderSearch").addEventListener("input", (event) => {
    state.keyword = event.target.value.trim().toLowerCase();
    saveState();
    renderLibrary();
  });

  document.querySelector("#builderColor").addEventListener("change", (event) => {
    state.color = event.target.value;
    saveState();
    renderLibrary();
  });

  document.querySelector("#builderType").addEventListener("change", (event) => {
    state.type = event.target.value;
    saveState();
    renderLibrary();
  });

  document.querySelector("#viewMode").addEventListener("change", (event) => {
    state.viewMode = event.target.value;
    saveState();
    renderLibrary();
  });

  document.querySelector("#leaderSelect").addEventListener("change", (event) => {
    state.leaderCardNumber = event.target.value;
    saveState();
    rerender();
  });

  document.querySelector("#deckName").addEventListener("input", (event) => {
    state.deckName = event.target.value || "새 덱";
    saveState();
    renderSummary();
  });

  document.querySelector("#builderLibrary").addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-card]");
    if (!button) {
      return;
    }
    addCard(button.dataset.addCard);
  });

  document.querySelector("#builderDeckList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-card]");
    if (!button) {
      return;
    }
    removeCard(button.dataset.removeCard);
  });

  document.querySelector("#resetDeck").addEventListener("click", resetDeck);
}

function init() {
  bindEvents();
  rerender();
}

init();
