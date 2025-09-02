import { render, screen } from '@testing-library/react';
import { MovieTable } from '../../presentation/components/Movies/MovieTable';
import { Movie } from '../../shared/types';

const mockMovies: Movie[] = [
  {
    id: 1,
    year: 2000,
    title: 'Test Movie 1',
    studios: ['Studio A', 'Studio B'],
    producers: ['Producer A'],
    winner: true,
  },
  {
    id: 2,
    year: 2001,
    title: 'Test Movie 2',
    studios: ['Studio C'],
    producers: ['Producer B', 'Producer C'],
    winner: false,
  },
];

describe('MovieTable', () => {
  it('renders loading state correctly', () => {
    render(<MovieTable movies={[]} loading={true} />);
    expect(screen.getByText('Carregando filmes...')).toBeInTheDocument();
  });

  it('renders empty state correctly', () => {
    render(<MovieTable movies={[]} loading={false} />);
    expect(screen.getByText('Nenhum filme encontrado')).toBeInTheDocument();
  });

  it('renders movies correctly', () => {
    render(<MovieTable movies={mockMovies} loading={false} />);
    
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Studio A, Studio B')).toBeInTheDocument();
    expect(screen.getByText('Producer B, Producer C')).toBeInTheDocument();
  });

  it('renders winner badges correctly', () => {
    render(<MovieTable movies={mockMovies} loading={false} />);
    
    const winnerBadges = screen.getAllByText(/^(Sim|Não)$/);
    expect(winnerBadges).toHaveLength(2);
    expect(screen.getByText('Sim')).toBeInTheDocument();
    expect(screen.getByText('Não')).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    render(<MovieTable movies={mockMovies} loading={false} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Ano')).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Estúdios')).toBeInTheDocument();
    expect(screen.getByText('Produtores')).toBeInTheDocument();
    expect(screen.getByText('Vencedor')).toBeInTheDocument();
  });
});
