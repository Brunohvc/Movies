import { useState, useEffect } from 'react';
import { MovieService } from '../../application/services/MovieService';
import {
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  ProducerIntervalsResponse,
  WinnerByYear,
} from '../../shared/types';

export const useDashboard = () => {
  const [yearsWithMultipleWinners, setYearsWithMultipleWinners] = useState<YearsWithMultipleWinnersResponse | null>(null);
  const [studiosWithWinCount, setStudiosWithWinCount] = useState<StudiosWithWinCountResponse | null>(null);
  const [producerIntervals, setProducerIntervals] = useState<ProducerIntervalsResponse | null>(null);
  const [winnersByYear, setWinnersByYear] = useState<WinnerByYear[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const movieService = new MovieService();

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [years, studios, intervals] = await Promise.all([
        movieService.dashboard.getYearsWithMultipleWinners(),
        movieService.dashboard.getStudiosWithWinCount(),
        movieService.dashboard.getProducerIntervals(),
      ]);

      setYearsWithMultipleWinners(years);
      setStudiosWithWinCount(studios);
      setProducerIntervals(intervals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchWinnersByYear = async (year: number) => {
    try {
      const winners = await movieService.dashboard.getWinnersByYear(year);
      setWinnersByYear(winners);
    } catch (err) {
      console.error('Error fetching winners by year:', err);
      setWinnersByYear([]);
    }
  };

  const clearWinnersByYear = () => {
    setWinnersByYear([]);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    yearsWithMultipleWinners,
    studiosWithWinCount,
    producerIntervals,
    winnersByYear,
    loading,
    error,
    fetchWinnersByYear,
    clearWinnersByYear,
    refetch: fetchDashboardData,
  };
};
