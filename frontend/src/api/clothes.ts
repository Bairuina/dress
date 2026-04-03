import { httpClient } from './http';
import type { ClothesFormValues, ClothesItem } from '../types/clothes';

export function listClothes() {
  return httpClient.get<ClothesItem[]>('/clothes');
}

export function createClothes(payload: ClothesFormValues) {
  return httpClient.post<ClothesItem>('/clothes', payload);
}


export function createClothesBatch(payload: ClothesFormValues[]) {
  return httpClient.post<ClothesItem[]>('/clothes/batch', { items: payload });
}
