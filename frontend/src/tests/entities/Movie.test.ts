import { describe, it, expect } from 'vitest';
import { MovieEntity } from '../../domain/entities/Movie';

describe('MovieEntity', () => {
  const movie = new MovieEntity(
    1,
    2000,
    'Test Movie',
    ['Studio A', 'Studio B'],
    ['Producer A', 'Producer B'],
    true
  );

  it('should create movie entity with correct properties', () => {
    expect(movie.id).toBe(1);
    expect(movie.year).toBe(2000);
    expect(movie.title).toBe('Test Movie');
    expect(movie.studios).toEqual(['Studio A', 'Studio B']);
    expect(movie.producers).toEqual(['Producer A', 'Producer B']);
    expect(movie.winner).toBe(true);
  });

  it('should return studios as text', () => {
    expect(movie.studiosText).toBe('Studio A, Studio B');
  });

  it('should return producers as text', () => {
    expect(movie.producersText).toBe('Producer A, Producer B');
  });

  it('should return winner status', () => {
    expect(movie.isWinner).toBe(true);
  });

  it('should handle single studio and producer', () => {
    const singleMovie = new MovieEntity(
      2,
      2001,
      'Single Movie',
      ['Single Studio'],
      ['Single Producer'],
      false
    );

    expect(singleMovie.studiosText).toBe('Single Studio');
    expect(singleMovie.producersText).toBe('Single Producer');
    expect(singleMovie.isWinner).toBe(false);
  });

  it('should handle empty studios and producers', () => {
    const emptyMovie = new MovieEntity(
      3,
      2002,
      'Empty Movie',
      [],
      [],
      false
    );

    expect(emptyMovie.studiosText).toBe('');
    expect(emptyMovie.producersText).toBe('');
  });
});
