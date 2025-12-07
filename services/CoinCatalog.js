let catalog = [];

export function addCoin(coin) {
  catalog.push(coin);
}

export function getCatalog() {
  return [...catalog].sort((a, b) => b.createdAt - a.createdAt);
}

export function clearCatalog() {
  catalog = [];
}
