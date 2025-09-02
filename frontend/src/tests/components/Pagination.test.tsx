import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../../presentation/components/Movies/Pagination';

const mockOnPageChange = vi.fn();

describe('Pagination', () => {
  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders pagination info correctly', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        totalElements={100}
        pageSize={20}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Mostrando 1 - 20 de 100 itens')).toBeInTheDocument();
  });

  it('renders page buttons correctly', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        totalElements={100}
        pageSize={20}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        totalElements={100}
        pageSize={20}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByText('←');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={5}
        totalElements={100}
        pageSize={20}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText('→');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when clicking page button', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        totalElements={100}
        pageSize={20}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2); // 0-indexed
  });

  it('calls onPageChange when clicking next button', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalElements={100}
        pageSize={20}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText('→'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('does not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination
        currentPage={0}
        totalPages={1}
        totalElements={10}
        pageSize={20}
        onPageChange={mockOnPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
