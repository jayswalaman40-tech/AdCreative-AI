
export interface User {
  uid: string;
  email: string;
  plan: 'free' | 'pro';
  credits: {
    remaining: number;
    total: number;
  };
  lastCreditReset: string; // ISO string date
  history: AdCreative[];
}

export interface AdCreative {
  id: string;
  timestamp: string; // ISO string date
  image: string; // base64 string
  textVariations: AdTextVariation[];
  inputs: AdCreationFormState;
}

export interface AdTextVariation {
  headline: string;
  body: string;
}

export interface AdCreationFormState {
  productName: string;
  targetAudience: string;
  platform: 'Facebook' | 'Instagram' | 'Google Ads' | 'LinkedIn';
  promotion: string;
  sellingPoints: string;
  tone: 'Professional' | 'Friendly' | 'Witty' | 'Urgent' | 'Luxurious';
  cta: 'Shop Now' | 'Learn More' | 'Sign Up' | 'Get Offer';
}

export const platforms: AdCreationFormState['platform'][] = ['Facebook', 'Instagram', 'Google Ads', 'LinkedIn'];
export const tones: AdCreationFormState['tone'][] = ['Professional', 'Friendly', 'Witty', 'Urgent', 'Luxurious'];
export const ctas: AdCreationFormState['cta'][] = ['Shop Now', 'Learn More', 'Sign Up', 'Get Offer'];
