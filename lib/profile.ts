export interface ProfileFormData {
  consumerKey: string;
  consumerSecret: string;
  wooEcomWebsiteUrl: string;
}

export interface WalletInfo {
  address: string;
}

export interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}
