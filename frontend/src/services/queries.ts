import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api';
import type { ClothesFormValues, ClothesItem } from '../types/clothes';

async function fetchClothes() {
  return apiClient.get<ClothesItem[]>('/clothes');
}

async function createClothes(payload: ClothesFormValues) {
  return apiClient.post<ClothesItem>('/clothes', payload);
}

export function useClothes() {
  return useQuery({
    queryKey: ['clothes'],
    queryFn: fetchClothes,
  });
}

export function useCreateClothes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClothes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clothes'] });
    },
  });
}
