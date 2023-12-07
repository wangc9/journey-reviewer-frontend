import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useState, ChangeEvent } from 'react';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};
