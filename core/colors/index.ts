// * Grey Scale, 무채색 계열 색을 정의합니다.
const GREY_SCALE = {
  grey025: '#F9F9F9',
  grey100: '#E5E5E5',
  grey300: '#000',
  grey400: '#EEF0F1',
  grey600: '#666',
  grey900: '#1A1A1A',

  black: '#000',
  white: '#fff',
} as const;

export const colors = {
  ...GREY_SCALE,
};

export type ColorKey = keyof typeof colors;
