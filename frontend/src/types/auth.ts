export interface CurrentUser {
  id: number;
  username: string;
  display_name: string;
  role: string;
  avatar_text: string;
  bio: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: CurrentUser;
}
