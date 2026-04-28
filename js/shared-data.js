const sharedCards = window.OnePieceCardsData?.cards ?? [];
const sharedDecks = window.OnePieceDecksData?.decks ?? [];

function normalizeLeaderColors(card) {
  if (!card) {
    return [];
  }
  if (Array.isArray(card.colors) && card.colors.length) {
    return card.colors;
  }
  return [card.color].filter(Boolean);
}

window.OnePieceSiteData = {
  cards: sharedCards,
  decks: sharedDecks,
  getCardByNumber(cardNumber) {
    return sharedCards.find((card) => card.cardNumber === cardNumber) ?? sharedCards[0];
  },
  getDeckById(deckId) {
    return sharedDecks.find((deck) => deck.id === deckId) ?? sharedDecks[0];
  },
  findCardByName(name) {
    return sharedCards.find((card) => card.name === name);
  },
  getPackGroups() {
    const groups = new Map();

    sharedCards.forEach((card) => {
      if (!groups.has(card.pack)) {
        groups.set(card.pack, []);
      }
      groups.get(card.pack).push(card);
    });

    return [...groups.entries()].map(([pack, items]) => ({
      pack,
      cards: items,
    }));
  },
  getUniqueValues(key) {
    return [...new Set(sharedCards.map((card) => card[key]))];
  },
  getLeaderCards() {
    return sharedCards.filter((card) => card.cardType === "리더");
  },
  getLeaderColors(cardNumber) {
    return normalizeLeaderColors(this.getCardByNumber(cardNumber));
  },
  isCardAllowedForLeader(card, leaderCardNumber) {
    const allowedColors = this.getLeaderColors(leaderCardNumber);
    return card.color === "무색" || allowedColors.includes(card.color);
  },
};
