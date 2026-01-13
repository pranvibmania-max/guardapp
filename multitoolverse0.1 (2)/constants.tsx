
import { Category, Tool } from './types.ts';

export const TOOLS: Tool[] = [
  {
    id: 'daily-news',
    name: 'Daily News',
    description: 'Real-time news summaries and trending topics powered by AI search.',
    category: Category.NEWS,
    icon: 'fa-newspaper',
    path: '/news/daily',
    keywords: ['news', 'trends', 'updates', 'daily', 'headlines']
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand your weight category.',
    category: Category.HEALTH,
    icon: 'fa-weight-scale',
    path: '/health/bmi',
    keywords: ['bmi', 'health', 'weight', 'body mass index']
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Estimate your daily calorie needs based on age, gender, and activity level.',
    category: Category.HEALTH,
    icon: 'fa-fire-flame-curved',
    path: '/health/calories',
    keywords: ['calories', 'health', 'diet', 'tdee', 'bmr', 'nutrition']
  },
  {
    id: 'beauty-tips',
    name: 'Beauty & Skincare',
    description: 'Get personalized beauty routines and skincare tips based on your skin type.',
    category: Category.LIFESTYLE,
    icon: 'fa-sparkles',
    path: '/lifestyle/beauty-tips',
    keywords: ['beauty', 'skin', 'skincare', 'makeup', 'routine', 'glow']
  },
  {
    id: 'loan-emi-calculator',
    name: 'Loan/EMI Calculator',
    description: 'Estimate your monthly loan repayments and total interest payable.',
    category: Category.FINANCE,
    icon: 'fa-hand-holding-dollar',
    path: '/finance/emi',
    keywords: ['loan', 'emi', 'finance', 'mortgage', 'repayment']
  },
  {
    id: 'interest-calculator',
    name: 'Interest Calculator',
    description: 'Calculate simple and compound interest on your savings or loans.',
    category: Category.FINANCE,
    icon: 'fa-chart-line',
    path: '/finance/interest',
    keywords: ['interest', 'compound', 'simple', 'finance', 'savings', 'roi']
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert global currencies with real-time exchange rates.',
    category: Category.FINANCE,
    icon: 'fa-money-bill-transfer',
    path: '/finance/currency',
    keywords: ['currency', 'money', 'forex', 'exchange', 'finance', 'convert']
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Solve percentage increases, decreases, and common proportion tasks.',
    category: Category.MATH,
    icon: 'fa-percent',
    path: '/math/percentage',
    keywords: ['math', 'percentage', 'discount', 'ratio']
  },
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Convert between Meters, Feet, Inches, Kilometers and more.',
    category: Category.CONVERTER,
    icon: 'fa-ruler-horizontal',
    path: '/convert/length',
    keywords: ['length', 'distance', 'meters', 'feet', 'inches']
  },
  {
    id: 'temperature-converter',
    name: 'Temp Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin instantly.',
    category: Category.CONVERTER,
    icon: 'fa-temperature-half',
    path: '/convert/temperature',
    keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'weather']
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encode/Decode',
    description: 'Quickly encode or decode text strings using Base64 format.',
    category: Category.DEVELOPER,
    icon: 'fa-code',
    path: '/dev/base64',
    keywords: ['developer', 'base64', 'encode', 'decode', 'binary']
  }
];

export const CATEGORIES = Object.values(Category);
