export const API_BASE_URL = 'https://challenge.outsera.tech/api/movies';

export const API_ENDPOINTS = {
  MOVIES: '',
  YEARS_WITH_MULTIPLE_WINNERS: '/yearsWithMultipleWinners',
  STUDIOS_WITH_WIN_COUNT: '/studiosWithWinCount',
  PRODUCER_INTERVALS: '/maxMinWinIntervalForProducers',
  WINNERS_BY_YEAR: '/winnersByYear',
} as const;

export const DEFAULT_PAGE_SIZE = 20;
export const MIN_SCREEN_WIDTH = 768;
export const MIN_SCREEN_HEIGHT = 1280;
