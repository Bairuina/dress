import type { CurrentUser, LoginPayload, LoginResponse } from '../types';
import { httpClient } from './http';

export function login(payload: LoginPayload) {
  return httpClient.post<LoginResponse>('/auth/login', payload);
}

export function getCurrentUser() {
  return httpClient.get<CurrentUser>('/auth/me');
}
