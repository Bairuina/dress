import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClothes, createClothesBatch, listClothes } from '../api/clothes';
import type { ClothesFormValues } from '../types/clothes';

export function useClothes() {
  return useQuery({
    queryKey: ['clothes'],
    queryFn: listClothes,
  });
}

export function useCreateClothes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ClothesFormValues) => createClothes(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clothes'] });
    },
  });
}


export function useCreateClothesBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ClothesFormValues[]) => createClothesBatch(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clothes'] });
    },
  });
}
