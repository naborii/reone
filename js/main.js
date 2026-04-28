const { cardSchema, cardTypes } = window.OnePieceCardsData;
const siteData = window.OnePieceSiteData;
const { cards, decks } = siteData;

const typeGrid = document.querySelector("#typeGrid");
const deckList = document.querySelector("#deckList");
const deckDetail = document.querySelector("#deckDetail");
const schemaFields = document.querySelector("#schemaFields");
const searchInput = document.querySelector("#searchInput");
const colorFilter = document.querySelector("#colorFilter");
const typeFilter = document.querySelector("#typeFilter");
const cardGrid = document.querySelector("#cardGrid");
const cardDetail = document.querySelector("#cardDetail");
const jsonPreview = document.querySelector("#jsonPreview");
const deckCount = document.querySelector("#deckCount");
const cardCount = document.querySelector("#cardCount");

const heroStage = document.querySelector("[data-hero-stage]");
const heroCopy = document.querySelector("[data-hero-copy]");
const heroShowcase = document.querySelector("[data-hero-showcase]");
const heroPrev = document.querySelector("[data-hero-prev]");
const heroNext = document.querySelector("[data-hero-next]");
const heroIndicators = document.querySelector("#heroIndicators");
const heroEyebrow = document.querySelector("#heroEyebrow");
const heroTitleText = document.querySelector("#heroTitleText");
const heroAccent = document.querySelector("#heroAccent");
const heroDescription = document.querySelector("#heroDescription");
const heroPrimaryButton = document.querySelector("#heroPrimaryButton");
const heroSecondaryButton = document.querySelector("#heroSecondaryButton");
const heroPackBadge = document.querySelector("#heroPackBadge");
const heroPackTitle = document.querySelector("#heroPackTitle");
const heroPackText = document.querySelector("#heroPackText");
const heroMiniLabelA = document.querySelector("#heroMiniLabelA");
const heroMiniTitleA = document.querySelector("#heroMiniTitleA");
const heroMiniTextA = document.querySelector("#heroMiniTextA");
const heroMiniLabelB = document.querySelector("#heroMiniLabelB");
const heroMiniTitleB = document.querySelector("#heroMiniTitleB");
const heroMiniTextB = document.querySelector("#heroMiniTextB");
const heroLargeCard = document.querySelector("#heroLargeCard");
const heroLargeLabel = document.querySelector("#heroLargeLabel");
const heroLargeTitle = document.querySelector("#heroLargeTitle");
const heroLargeText = document.querySelector("#heroLargeText");

const playerLife = document.querySelector("#playerLife");
const botLife = document.querySelector("#botLife");
const playerCounter = document.querySelector("#playerCounter");
const botCounter = document.querySelector("#botCounter");
const playerDon = document.querySelector("#playerDon");
const botDon = document.querySelector("#botDon");
const playerField = document.querySelector("#playerField");
const botField = document.querySelector("#botField");
const playerAttackPower = document.querySelector("#playerAttackPower");
const botAttackPower = document.querySelector("#botAttackPower");
const turnIndicator = document.querySelector("#turnIndicator");
const battleHint = document.querySelector("#battleHint");
const battleLog = document.querySelector("#battleLog");
const deployButton = document.querySelector("#deployButton");
const attackButton = document.querySelector("#attackButton");
const defendButton = document.querySelector("#defendButton");
const endTurnButton = document.querySelector("#endTurnButton");
const resetButton = document.querySelector("#resetButton");

const heroSlides = [
  {
    theme: "theme-blue",
    eyebrow: "SET SAIL FOR ADVENTURE",
    title: "ONE PIECE",
    accent: "CARD GAME",
    description:
      "나만의 덱을 만들고, 동료와 함께 위대한 항해를 시작하라!",
    primaryLabel: "BROWSE DECKS",
    primaryHref: "#decks",
    secondaryLabel: "DECK BUILDER",
    secondaryHref: "deckbuilder.html",
    packBadge: "START GUIDE",
    packTitle: "초보자 항해 가이드",
    packText: "게임 구조와 기본 흐름을 빠르게 익히기",
    miniA: {
      label: "LEADER",
      title: "선장 선택",
      text: "내 스타일에 맞는 리더 찾기",
    },
    miniB: {
      label: "DECK FLOW",
      title: "운영 흐름 탐색",
      text: "핵심 카드와 운영 방향 이해",
    },
    large: {
      tone: "light-sky",
      label: "CARD DATABASE",
      title: "전략을 만드는 항해 지도",
      text: "카드 DB, 덱 빌더, 튜토리얼, 봇 대전을 하나의 포털 흐름으로 연결",
    },
  },
  {
    theme: "theme-red",
    eyebrow: "BUILD YOUR CREW",
    title: "ONE PIECE",
    accent: "CARD GAME",
    description:
      "리더를 선택하고, 핵심 카드를 모으고, 나만의 전략으로 바다를 지배하라!",
    primaryLabel: "CARD DB",
    primaryHref: "#database",
    secondaryLabel: "TUTORIAL",
    secondaryHref: "#tutorial",
    packBadge: "CREW SETUP",
    packTitle: "덱 조합의 시작",
    packText: "덱 타입, 핵심 카드, 추천 흐름 정리",
    miniA: {
      label: "BATTLE PLAN",
      title: "공격과 운영",
      text: "초보자도 이해되는 덱 큐레이션",
    },
    miniB: {
      label: "CARD PACK",
      title: "대표 팩 탐색",
      text: "필요 카드가 어디서 나오는지 연결",
    },
    large: {
      tone: "red-storm",
      label: "DECK DETAIL",
      title: "리더별 덱 비교",
      text: "초보자 추천도, 난이도, 핵심 카드까지 빠르게 확인",
    },
  },
  {
    theme: "theme-green",
    eyebrow: "ENTER THE BATTLE",
    title: "ONE PIECE",
    accent: "CARD GAME",
    description:
      "DON을 관리하고, 캐릭터를 전개하고, 봇과 함께 기본 전투 흐름을 익혀라!",
    primaryLabel: "START BATTLE",
    primaryHref: "#bot",
    secondaryLabel: "CARD PACKS",
    secondaryHref: "packs.html",
    packBadge: "BATTLE FLOW",
    packTitle: "전개와 공격 연습",
    packText: "버튼만 눌러도 흐름이 보이는 튜토리얼 전투",
    miniA: {
      label: "TURN",
      title: "턴 진행 체험",
      text: "플레이어와 봇이 번갈아 행동",
    },
    miniB: {
      label: "DON",
      title: "자원 사용 감각",
      text: "전개와 공격 선택에 따라 흐름 변화",
    },
    large: {
      tone: "green-wave",
      label: "BOT PROTOTYPE",
      title: "실전 전 감각 익히기",
      text: "공격, 방어, 턴 종료를 직접 누르며 구조 이해",
    },
  },
];

const uiState = {
  selectedDeckId: decks[0]?.id ?? "",
  selectedCardNumber: cards[0]?.cardNumber ?? "",
  currentHeroIndex: 0,
  heroTimerId: null,
};

const battleState = {
  currentTurn: "player",
  playerLife: 5,
  botLife: 5,
  playerCounter: 2,
  botCounter: 2,
  playerDon: 2,
  botDon: 2,
  playerField: 0,
  botField: 0,
  attackedThisTurn: false,
  pendingBotAttack: false,
  pendingBotPower: 5000,
  gameOver: false,
};

function uniqueValues(key) {
  return [...new Set(cards.map((card) => card[key]))];
}

function parseHash() {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || !raw.includes("/")) {
    return null;
  }

  const [section, value] = raw.split("/");
  if (!section || !value) {
    return null;
  }

  return { section, value: decodeURIComponent(value) };
}

function syncHash(kind, value) {
  const nextHash = `#${kind}/${encodeURIComponent(value)}`;
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  }
}

function applyHashRoute() {
  const route = parseHash();
  if (!route) {
    return;
  }

  if (route.section === "decks" && decks.some((deck) => deck.id === route.value)) {
    uiState.selectedDeckId = route.value;
  }

  if (route.section === "database" && cards.some((card) => card.cardNumber === route.value)) {
    uiState.selectedCardNumber = route.value;
  }
}

function renderCounts() {
  if (deckCount) {
    deckCount.textContent = String(decks.length);
  }

  if (cardCount) {
    cardCount.textContent = String(cards.length);
  }
}

function renderTypes() {
  typeGrid.innerHTML = cardTypes
    .map(
      (type) => `
        <article class="type-card">
          <h4>${type.title}</h4>
          <p>${type.description}</p>
        </article>
      `,
    )
    .join("");
}

function renderDeckList() {
  deckList.innerHTML = decks
    .map(
      (deck) => `
        <button class="deck-item ${deck.id === uiState.selectedDeckId ? "active" : ""}" data-deck-id="${deck.id}">
          <h5>${deck.name}</h5>
          <p>${deck.leader}</p>
        </button>
      `,
    )
    .join("");
}

function renderDeckDetail() {
  const deck = siteData.getDeckById(uiState.selectedDeckId);
  const linkedCards = deck.coreCards
    .map(siteData.findCardByName)
    .filter(Boolean)
    .map(
      (card) => `
        <button class="tag linked-card-tag" data-card-number="${card.cardNumber}">
          ${card.name}
        </button>
      `,
    )
    .join("");

  deckDetail.innerHTML = `
    <p class="card-label">DECK DETAIL</p>
    <h4>${deck.name}</h4>
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
    <div>
      <p class="card-label">핵심 카드</p>
      <div class="core-list">${linkedCards}</div>
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
    <div class="detail-actions">
      <a class="button secondary" href="deck.html?id=${encodeURIComponent(deck.id)}">덱 상세 페이지</a>
    </div>
  `;
}

function renderSchema() {
  schemaFields.innerHTML = cardSchema
    .map(
      (field) => `
        <article class="schema-item">
          <h5>${field.label}</h5>
          <p><strong>${field.key}</strong></p>
          <p>예시: ${field.example}</p>
        </article>
      `,
    )
    .join("");
}

function renderJsonPreview() {
  const card = siteData.getCardByNumber(uiState.selectedCardNumber);
  jsonPreview.textContent = JSON.stringify(card, null, 2);
}

function fillSelect(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function renderCardDetail() {
  const card = siteData.getCardByNumber(uiState.selectedCardNumber);
  cardDetail.innerHTML = `
    <p class="card-label">CARD DETAIL</p>
    <div class="detail-body">
      <img class="detail-card-image" src="${card.imageUrl}" alt="${card.name}">
      <div>
        <h4>${card.name}</h4>
        <div class="tag-row">
          <span class="tag">${card.color}</span>
          <span class="tag">${card.cardType}</span>
          <span class="tag">${card.rarity}</span>
          ${(card.featureTags ?? []).map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <p>${card.effect}</p>
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
          <a class="button secondary" href="card.html?card=${encodeURIComponent(card.cardNumber)}">카드 상세 페이지</a>
        </div>
      </div>
    </div>
  `;
}

function getFilteredCards() {
  const keyword = searchInput.value.trim().toLowerCase();
  const color = colorFilter.value;
  const type = typeFilter.value;

  return cards.filter((card) => {
    const matchesKeyword =
      card.name.toLowerCase().includes(keyword) ||
      card.effect.toLowerCase().includes(keyword) ||
      card.cardNumber.toLowerCase().includes(keyword);
    const matchesColor = color === "all" || card.color === color;
    const matchesType = type === "all" || card.cardType === type;
    return matchesKeyword && matchesColor && matchesType;
  });
}

function renderCards() {
  const list = getFilteredCards();

  if (!list.length) {
    cardGrid.innerHTML = `
      <article class="db-card">
        <h4>검색 결과가 없습니다</h4>
        <p>검색어 또는 필터를 바꿔 다시 확인해보세요.</p>
      </article>
    `;
    return;
  }

  if (!list.some((card) => card.cardNumber === uiState.selectedCardNumber)) {
    uiState.selectedCardNumber = list[0].cardNumber;
  }

  cardGrid.innerHTML = list
    .map(
      (card) => `
        <article class="db-card ${card.cardNumber === uiState.selectedCardNumber ? "active" : ""}" data-card-number="${card.cardNumber}">
          <img src="${card.imageUrl}" alt="${card.name}">
          <div class="tag-row">
            <span class="tag">${card.color}</span>
            <span class="tag">${card.cardType}</span>
            <span class="tag">${card.rarity}</span>
          </div>
          <h4>${card.name}</h4>
          <p>${card.effect}</p>
          <div class="db-meta">
            <div class="meta-chip">번호 ${card.cardNumber}</div>
            <div class="meta-chip">비용 ${card.cost}</div>
            <div class="meta-chip">파워 ${card.power}</div>
            <div class="meta-chip">카운터 ${card.counter}</div>
            <div class="meta-chip">팩 ${card.pack}</div>
          </div>
        </article>
      `,
    )
    .join("");
}

function rerenderDataViews() {
  renderDeckList();
  renderDeckDetail();
  renderCards();
  renderCardDetail();
  renderJsonPreview();
}

function renderHeroIndicators() {
  if (!heroIndicators) {
    return;
  }

  heroIndicators.innerHTML = heroSlides
    .map(
      (_, index) => `
        <button
          class="hero-indicator ${index === uiState.currentHeroIndex ? "active" : ""}"
          type="button"
          aria-label="슬라이드 ${index + 1}"
          data-hero-index="${index}">
        </button>
      `,
    )
    .join("");
}

function animateHeroTransition() {
  [heroCopy, heroShowcase].forEach((element) => {
    element.classList.remove("is-changing");
    window.requestAnimationFrame(() => {
      element.classList.add("is-changing");
    });
  });
}

function renderHeroSlide() {
  const slide = heroSlides[uiState.currentHeroIndex];

  heroStage.classList.remove("theme-blue", "theme-red", "theme-green");
  heroStage.classList.add(slide.theme);

  heroEyebrow.textContent = slide.eyebrow;
  heroTitleText.textContent = slide.title;
  heroAccent.textContent = slide.accent;
  if (uiState.currentHeroIndex === 0) {
    heroDescription.innerHTML = "나만의 덱을 만들고,<br>동료와 함께 위대한 항해를 시작하라!";
  } else {
    heroDescription.textContent = slide.description;
  }
  heroPrimaryButton.textContent = slide.primaryLabel;
  heroPrimaryButton.href = slide.primaryHref;
  heroSecondaryButton.textContent = slide.secondaryLabel;
  heroSecondaryButton.href = slide.secondaryHref;

  heroPackBadge.textContent = slide.packBadge;
  heroPackTitle.textContent = slide.packTitle;
  heroPackText.textContent = slide.packText;

  heroMiniLabelA.textContent = slide.miniA.label;
  heroMiniTitleA.textContent = slide.miniA.title;
  heroMiniTextA.textContent = slide.miniA.text;

  heroMiniLabelB.textContent = slide.miniB.label;
  heroMiniTitleB.textContent = slide.miniB.title;
  heroMiniTextB.textContent = slide.miniB.text;

  heroLargeCard.classList.remove("light-sky", "red-storm", "green-wave");
  heroLargeCard.classList.add(slide.large.tone);
  heroLargeLabel.textContent = slide.large.label;
  heroLargeTitle.textContent = slide.large.title;
  heroLargeText.textContent = slide.large.text;

  renderHeroIndicators();
  animateHeroTransition();
}

function changeHeroSlide(nextIndex) {
  const max = heroSlides.length;
  uiState.currentHeroIndex = (nextIndex + max) % max;
  renderHeroSlide();
}

function restartHeroTimer() {
  if (uiState.heroTimerId) {
    window.clearInterval(uiState.heroTimerId);
  }

  uiState.heroTimerId = window.setInterval(() => {
    changeHeroSlide(uiState.currentHeroIndex + 1);
  }, 5400);
}

function calculatePlayerAttackPower() {
  return 5000 + battleState.playerField * 1000 + (battleState.playerDon >= 2 ? 2000 : 0);
}

function calculateBotAttackPower() {
  return 5000 + battleState.botField * 1000 + (battleState.botDon >= 2 ? 2000 : 0);
}

function appendLog(message) {
  const lines = battleLog.textContent ? battleLog.textContent.split("\n") : [];
  lines.unshift(message);
  battleLog.textContent = lines.slice(0, 12).join("\n");
}

function startPlayerTurn() {
  battleState.currentTurn = "player";
  battleState.attackedThisTurn = false;
  battleState.pendingBotAttack = false;
  battleState.playerDon = Math.min(10, battleState.playerDon + 2);
  battleHint.textContent = "플레이어 턴입니다. 캐릭터를 전개하거나 공격한 뒤 턴을 종료할 수 있습니다.";
}

function syncBattleUi() {
  playerLife.textContent = String(battleState.playerLife);
  botLife.textContent = String(battleState.botLife);
  playerCounter.textContent = String(battleState.playerCounter);
  botCounter.textContent = String(battleState.botCounter);
  playerDon.textContent = String(battleState.playerDon);
  botDon.textContent = String(battleState.botDon);
  playerField.textContent = String(battleState.playerField);
  botField.textContent = String(battleState.botField);
  playerAttackPower.textContent = String(calculatePlayerAttackPower());
  botAttackPower.textContent = String(battleState.pendingBotAttack ? battleState.pendingBotPower : calculateBotAttackPower());
  turnIndicator.textContent = battleState.currentTurn === "player" ? "플레이어 턴" : "봇 턴";

  if (battleState.gameOver) {
    deployButton.disabled = true;
    attackButton.disabled = true;
    defendButton.disabled = true;
    endTurnButton.disabled = true;
    return;
  }

  deployButton.disabled =
    battleState.currentTurn !== "player" ||
    battleState.playerDon < 3 ||
    battleState.playerField >= 3 ||
    battleState.pendingBotAttack;
  attackButton.disabled =
    battleState.currentTurn !== "player" ||
    battleState.attackedThisTurn ||
    battleState.pendingBotAttack;
  defendButton.disabled = battleState.currentTurn !== "player" || !battleState.pendingBotAttack;
  endTurnButton.disabled = battleState.currentTurn !== "player" || battleState.pendingBotAttack;
}

function finishGame(winner) {
  battleState.gameOver = true;
  battleHint.textContent =
    winner === "player"
      ? "승리했습니다. 전개와 DON 사용 순서를 다시 반복해볼 수 있습니다."
      : "패배했습니다. DON 사용 타이밍과 카운터 선택을 다시 점검해보세요.";
  appendLog(winner === "player" ? "게임 종료: 플레이어 승리" : "게임 종료: 봇 승리");
  syncBattleUi();
}

function handleDeploy() {
  if (battleState.currentTurn !== "player" || battleState.playerDon < 3 || battleState.playerField >= 3 || battleState.pendingBotAttack) {
    return;
  }

  battleState.playerDon -= 3;
  battleState.playerField += 1;
  battleHint.textContent = "플레이어가 캐릭터를 1장 전개했습니다.";
  appendLog("플레이어: 캐릭터 전개");
  syncBattleUi();
}

function handlePlayerAttack() {
  if (battleState.currentTurn !== "player" || battleState.attackedThisTurn || battleState.pendingBotAttack || battleState.gameOver) {
    return;
  }

  battleState.attackedThisTurn = true;
  const attackPower = calculatePlayerAttackPower();
  if (battleState.playerDon >= 2) {
    battleState.playerDon -= 2;
  }

  const botBlocks = battleState.botCounter > 0 && (attackPower <= 6000 || Math.random() > 0.35);

  if (botBlocks) {
    battleState.botCounter -= 1;
    battleHint.textContent = `봇이 카운터 1장으로 ${attackPower} 공격을 방어했습니다.`;
    appendLog(`플레이어 공격 ${attackPower} -> 봇 카운터 사용`);
  } else {
    battleState.botLife -= 1;
    battleHint.textContent = `공격 성공. ${attackPower} 타점으로 봇 라이프가 1 감소했습니다.`;
    appendLog(`플레이어 공격 ${attackPower} 성공 -> 봇 라이프 -1`);
  }

  if (battleState.botLife <= 0) {
    finishGame("player");
    return;
  }

  syncBattleUi();
}

function resolveBotTurn() {
  battleState.currentTurn = "bot";
  battleState.pendingBotAttack = false;
  battleState.attackedThisTurn = false;
  battleState.botDon = Math.min(10, battleState.botDon + 2);
  battleHint.textContent = "봇이 턴을 시작했습니다.";
  syncBattleUi();

  window.setTimeout(() => {
    if (battleState.gameOver) {
      return;
    }

    if (battleState.botDon >= 3 && battleState.botField < 3) {
      battleState.botDon -= 3;
      battleState.botField += 1;
      appendLog("봇: 캐릭터 전개");
    }

    battleState.pendingBotPower = calculateBotAttackPower();
    if (battleState.botDon >= 2) {
      battleState.botDon -= 2;
    }
    battleState.pendingBotAttack = true;
    battleHint.textContent = `봇이 ${battleState.pendingBotPower} 타점으로 공격했습니다. 방어를 선택하세요.`;
    appendLog(`봇 공격 선언 ${battleState.pendingBotPower}`);
    syncBattleUi();
  }, 700);
}

function endPlayerTurn() {
  if (battleState.gameOver || battleState.pendingBotAttack) {
    return;
  }

  battleHint.textContent = "플레이어가 턴을 종료했습니다.";
  appendLog("플레이어: 턴 종료");
  resolveBotTurn();
}

function handlePlayerDefend() {
  if (battleState.currentTurn !== "player" || !battleState.pendingBotAttack || battleState.gameOver) {
    return;
  }

  const defended = battleState.playerCounter > 0 && battleState.pendingBotPower <= 7000;

  if (defended) {
    battleState.playerCounter -= 1;
    battleHint.textContent = "플레이어가 카운터 1장으로 봇의 공격을 막았습니다.";
    appendLog(`봇 공격 ${battleState.pendingBotPower} -> 플레이어 카운터 사용`);
  } else {
    if (battleState.playerCounter > 0) {
      battleState.playerCounter -= 1;
    }
    battleState.playerLife -= 1;
    battleHint.textContent = "방어가 충분하지 않아 라이프를 1 잃었습니다.";
    appendLog(`봇 공격 ${battleState.pendingBotPower} 성공 -> 플레이어 라이프 -1`);
  }

  battleState.pendingBotAttack = false;

  if (battleState.playerLife <= 0) {
    finishGame("bot");
    return;
  }

  startPlayerTurn();
  syncBattleUi();
}

function resetBattle() {
  battleState.currentTurn = "player";
  battleState.playerLife = 5;
  battleState.botLife = 5;
  battleState.playerCounter = 2;
  battleState.botCounter = 2;
  battleState.playerDon = 2;
  battleState.botDon = 2;
  battleState.playerField = 0;
  battleState.botField = 0;
  battleState.attackedThisTurn = false;
  battleState.pendingBotAttack = false;
  battleState.pendingBotPower = 5000;
  battleState.gameOver = false;
  battleLog.textContent = "튜토리얼 전투를 시작했습니다.";
  battleHint.textContent = "캐릭터를 전개하고 공격 타이밍을 잡아보세요.";
  syncBattleUi();
}

function bindEvents() {
  deckList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-deck-id]");
    if (!button) {
      return;
    }

    uiState.selectedDeckId = button.dataset.deckId;
    renderDeckList();
    renderDeckDetail();
    syncHash("decks", uiState.selectedDeckId);
  });

  deckDetail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-card-number]");
    if (!button) {
      return;
    }

    uiState.selectedCardNumber = button.dataset.cardNumber;
    renderCards();
    renderCardDetail();
    renderJsonPreview();
    syncHash("database", uiState.selectedCardNumber);
  });

  cardGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-card-number]");
    if (!card) {
      return;
    }

    uiState.selectedCardNumber = card.dataset.cardNumber;
    renderCards();
    renderCardDetail();
    renderJsonPreview();
    syncHash("database", uiState.selectedCardNumber);
  });

  heroPrev?.addEventListener("click", () => {
    changeHeroSlide(uiState.currentHeroIndex - 1);
    restartHeroTimer();
  });

  heroNext?.addEventListener("click", () => {
    changeHeroSlide(uiState.currentHeroIndex + 1);
    restartHeroTimer();
  });

  heroIndicators?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-hero-index]");
    if (!button) {
      return;
    }

    changeHeroSlide(Number(button.dataset.heroIndex));
    restartHeroTimer();
  });

  searchInput.addEventListener("input", rerenderDataViews);
  colorFilter.addEventListener("change", rerenderDataViews);
  typeFilter.addEventListener("change", rerenderDataViews);
  deployButton.addEventListener("click", handleDeploy);
  attackButton.addEventListener("click", handlePlayerAttack);
  defendButton.addEventListener("click", handlePlayerDefend);
  endTurnButton.addEventListener("click", endPlayerTurn);
  resetButton.addEventListener("click", resetBattle);
  window.addEventListener("hashchange", () => {
    applyHashRoute();
    rerenderDataViews();
  });
}

function init() {
  applyHashRoute();
  renderCounts();
  renderTypes();
  renderSchema();
  fillSelect(colorFilter, uniqueValues("color"));
  fillSelect(typeFilter, uniqueValues("cardType"));
  rerenderDataViews();
  renderHeroSlide();
  if (heroIndicators || heroPrev || heroNext) {
    restartHeroTimer();
  }
  resetBattle();
  bindEvents();
}

init();
