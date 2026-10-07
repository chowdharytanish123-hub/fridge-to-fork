export type UserProfile = {
  id: string;
  name: string;
  email: string;
  age?: number;
  sex?: string;
  heightCm?: number;
  weightKg?: number;
  activityLevel?: string;
  fitnessGoal?: 'weight-loss' | 'muscle-gain' | 'maintenance' | 'general-health';
  calorieTarget?: number;
  proteinTarget?: number;
  dietaryPreference?: string;
  allergies?: string[];
  dislikedFoods?: string[];
  preferredCuisines?: string[];
};
