export type ExpiryItem = {
  ingredient: string;
  expiryDate?: string | null;
  quantity?: number;
  unit?: string;
};

export type ExpiryInsight = {
  ingredient: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'expired' | 'urgent' | 'soon' | 'normal';
  quantity?: number;
  unit?: string;
};

export function daysUntilExpiry(expiryDate?: string | null) {
  if (!expiryDate) return null;

  const target = new Date(expiryDate);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getExpiryStatus(expiryDate?: string | null): ExpiryInsight['status'] | null {
  const days = daysUntilExpiry(expiryDate);
  if (days === null) return null;
  if (days < 0) return 'expired';
  if (days <= 2) return 'urgent';
  if (days <= 7) return 'soon';
  return 'normal';
}

export function getExpiringIngredients(items: ExpiryItem[]): ExpiryInsight[] {
  return items
    .filter((item) => item.expiryDate)
    .map((item) => {
      const daysRemaining = daysUntilExpiry(item.expiryDate) ?? 9999;
      return {
        ingredient: item.ingredient,
        expiryDate: item.expiryDate as string,
        daysRemaining,
        status: getExpiryStatus(item.expiryDate) as ExpiryInsight['status'],
        quantity: item.quantity,
        unit: item.unit,
      };
    })
    .filter((item) => item.status !== 'normal')
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
}

export function explainExpiryPriority(ingredient: string, expiryDate?: string | null): string {
  const days = daysUntilExpiry(expiryDate);
  if (days === null) return `${ingredient} has no expiry date.`;
  if (days < 0) return `${ingredient} expired ${Math.abs(days)} day(s) ago.`;
  if (days === 0) return `${ingredient} expires today.`;
  if (days === 1) return `${ingredient} expires tomorrow.`;
  return `${ingredient} expires in ${days} day(s).`;
}
