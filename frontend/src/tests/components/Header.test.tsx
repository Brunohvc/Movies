import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../../presentation/components/Header';

const HeaderWithRouter = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

describe('Header', () => {
  it('renders the logo correctly', () => {
    render(<HeaderWithRouter />);
    expect(screen.getByText('Golden Raspberry Awards')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<HeaderWithRouter />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Lista de Filmes')).toBeInTheDocument();
  });

  it('navigation links have correct href attributes', () => {
    render(<HeaderWithRouter />);
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    const moviesLink = screen.getByText('Lista de Filmes').closest('a');
    
    expect(dashboardLink).toHaveAttribute('href', '/');
    expect(moviesLink).toHaveAttribute('href', '/movies');
  });
});
