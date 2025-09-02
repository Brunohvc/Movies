import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../shared/utils/styles';
import { YearWithMultipleWinners } from '../../../shared/types';

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
  data: YearWithMultipleWinners[];
  loading?: boolean;
}

export const YearsWithMultipleWinnersCard: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <Title>Anos com mais de um vencedor</Title>
        <p>Carregando...</p>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Anos com mais de um vencedor</Title>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Ano</th>
              <th>Quantidade de Vencedores</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.year}>
                <td>{item.year}</td>
                <td>{item.winnerCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '1rem' }}>
          Nenhum dado encontrado
        </p>
      )}
    </Card>
  );
};
