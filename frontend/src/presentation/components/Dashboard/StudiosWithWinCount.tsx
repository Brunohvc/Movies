import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../shared/utils/styles';
import { StudioWithWinCount } from '../../../shared/types';

const Title = styled.h3`
  margin-bottom: 1rem;
  color: #495057;
`;

const Table = styled.table`
  width: 100%;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

interface Props {
  data: StudioWithWinCount[];
  loading?: boolean;
}

export const StudiosWithWinCountCard: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <Title>Estúdios com mais vitórias</Title>
        <p>Carregando...</p>
      </Card>
    );
  }

  // Pegar apenas os top 3
  const topStudios = data.slice(0, 3);

  return (
    <Card>
      <Title>Estúdios com mais vitórias</Title>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Vitórias</th>
            </tr>
          </thead>
          <tbody>
            {topStudios.map((studio, index) => (
              <tr key={`${studio.name}-${index}`}>
                <td>{studio.name}</td>
                <td>{studio.winCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      {topStudios.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '1rem' }}>
          Nenhum dado encontrado
        </p>
      )}
    </Card>
  );
};
