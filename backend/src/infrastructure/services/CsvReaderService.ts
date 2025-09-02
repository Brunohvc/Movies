import * as fs from 'fs';
import csv from 'csv-parser';
import { CsvReader } from '../../domain/interfaces/CsvReader';
import { Movie } from '../../domain/entities/Movie';

interface CsvRow {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}

export class CsvReaderService implements CsvReader {
  async readMovies(filePath: string): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
      const movies: Movie[] = [];
      
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row: CsvRow) => {
          try {
            const movie = new Movie(
              parseInt(row.year),
              row.title.trim(),
              row.studios.trim(),
              row.producers.trim(),
              row.winner === 'yes'
            );
            movies.push(movie);
          } catch (error) {
            console.warn(`Erro ao processar linha: ${JSON.stringify(row)}`, error);
          }
        })
        .on('end', () => {
          resolve(movies);
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    });
  }
}
