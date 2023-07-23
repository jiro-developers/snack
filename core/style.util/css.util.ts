const mediaQuery = (width: number): string => {
  return `@media (max-width: ${width}px)`;
};

const MOBILE_MAX_WIDTH = 767;
const TABLET_MAX_WIDTH = 1199;

export const media = {
  mobile: mediaQuery(MOBILE_MAX_WIDTH),
  tablet: mediaQuery(TABLET_MAX_WIDTH),
  custom: mediaQuery,
};

