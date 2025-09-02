// Movie types
export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

// API Response types
export interface ApiResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  number: number;
  numberOfElements: number;
  size: number;
}

// Dashboard data types
export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearWithMultipleWinners[];
}

export interface StudioWithWinCount {
  name: string;
  winCount: number;
}

export interface StudiosWithWinCountResponse {
  studios: StudioWithWinCount[];
}

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducerIntervalsResponse {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

export interface WinnerByYear {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

// Filter types
export interface MovieFilters {
  page?: number;
  size?: number;
  winner?: boolean;
  year?: number;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
}
