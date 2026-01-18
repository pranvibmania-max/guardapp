
export enum Category {
  FINANCE = 'Finance',
  HEALTH = 'Health & Fitness',
  MATH = 'Math & Science',
  CONVERTER = 'Unit Converters',
  DEVELOPER = 'Developer Tools',
  LIFESTYLE = 'Lifestyle & Beauty',
  NEWS = 'News & Trends'
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: string;
  path: string;
  keywords: string[];
}

export interface CalculationHistory {
  id: string;
  toolId: string;
  timestamp: number;
  input: any;
  result: any;
}
