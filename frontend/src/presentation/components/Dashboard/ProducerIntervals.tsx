import React from 'react';
import styled from 'styled-components';
import { Card, Grid } from '../../../shared/utils/styles';
import { ProducerIntervalsResponse } from '../../../shared/types';

const Title = styled.h3`
  margin-bottom: 2rem;
  color: #1a202c;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const SubTitle = styled.h4`
  margin-bottom: 1rem;
  color: #4a5568;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;

  /* Styling para tabelas responsivas */
  @media (max-width: 768px) {
    table {
      font-size: 0.875rem;
    }
    
    th, td {
      padding: 8px;
      min-width: 80px;
    }
  }

  @media (max-width: 480px) {
    table {
      font-size: 0.8rem;
    }
    
    th, td {
      padding: 6px;
      min-width: 70px;
    }
  }
`;

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const IntervalSection = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  data: ProducerIntervalsResponse | null;
  loading?: boolean;
}

export const ProducerIntervalsCard: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <Title>Produtores com maior e menor intervalo entre vitórias</Title>
        <p>Carregando...</p>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <Title>Produtores com maior e menor intervalo entre vitórias</Title>
        <p style={{ textAlign: 'center', color: '#6c757d' }}>
          Nenhum dado encontrado
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Produtores com maior e menor intervalo entre vitórias</Title>
      
      <ResponsiveGrid>
        <IntervalSection>
          <SubTitle>Menor intervalo</SubTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Produtor</th>
                  <th>Intervalo</th>
                  <th>Ano Anterior</th>
                  <th>Ano Seguinte</th>
                </tr>
              </thead>
              <tbody>
                {data.min.map((producer, index) => (
                  <tr key={`min-${producer.producer}-${index}`}>
                    <td>{producer.producer}</td>
                    <td>{producer.interval}</td>
                    <td>{producer.previousWin}</td>
                    <td>{producer.followingWin}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </IntervalSection>

        <IntervalSection>
          <SubTitle>Maior intervalo</SubTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Produtor</th>
                  <th>Intervalo</th>
                  <th>Ano Anterior</th>
                  <th>Ano Seguinte</th>
                </tr>
              </thead>
              <tbody>
                {data.max.map((producer, index) => (
                  <tr key={`max-${producer.producer}-${index}`}>
                    <td>{producer.producer}</td>
                    <td>{producer.interval}</td>
                    <td>{producer.previousWin}</td>
                    <td>{producer.followingWin}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </IntervalSection>
      </ResponsiveGrid>
    </Card>
  );
};
