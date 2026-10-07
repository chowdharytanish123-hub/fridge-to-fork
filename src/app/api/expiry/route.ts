export type ShoppingItem = {
  ingredient: string;
  quantity: number;
  unit: string;
  checked?: boolean;
};

export function aggregateShoppingList(requiredEntries: ShoppingItem[], inventory: Array<{ ingredient: string; quantity: number; unit: string }>) {
  const inventoryMap = new Map<string, number>();
  for (const item of inventory) {
    inventoryMap.set(item.ingredient.toLowerCase(), (inventoryMap.get(item.ingredient.toLowerCase()) ?? 0) + item.quantity);
  }

  const aggregated = new Map<string, ShoppingItem>();

  for (const entry of requiredEntries) {
    const key = entry.ingredient.toLowerCase();
    const existing = aggregated.get(key) ?? { ingredient: entry.ingredient, quantity: 0, unit: entry.unit };
    existing.quantity += entry.quantity;
    aggregated.set(key, existing);
  }

  return Array.from(aggregated.values())
    .map((item) => {
      const inventoryQty = inventoryMap.get(item.ingredient.toLowerCase()) ?? 0;
      const remaining = Math.max(0, item.quantity - inventoryQty);
      return {
        ...item,
        quantity: remaining,
      };
    })
    .filter((item) => item.quantity > 0)
    .sort((a, b) => a.ingredient.localeCompare(b.ingredient));
}
