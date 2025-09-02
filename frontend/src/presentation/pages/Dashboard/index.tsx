import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';
import { YearsWithMultipleWinnersCard } from '../../components/Dashboard/YearsWithMultipleWinners';
import { StudiosWithWinCountCard } from '../../components/Dashboard/StudiosWithWinCount';
import { ProducerIntervalsCard } from '../../components/Dashboard/ProducerIntervals';
import { WinnersByYearCard } from '../../components/Dashboard/WinnersByYear';
import { useDashboard } from '../../hooks/useDashboard';
import { Grid, ErrorMessage } from '../../../shared/utils/styles';

const PageTitle = styled.h1`
  margin-bottom: 3rem;
  color: white;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

const DashboardGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const DashboardContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

export const Dashboard: React.FC = () => {
  const {
    yearsWithMultipleWinners,
    studiosWithWinCount,
    producerIntervals,
    winnersByYear,
    loading,
    error,
    fetchWinnersByYear,
    clearWinnersByYear,
  } = useDashboard();

  return (
    <Layout>
      <DashboardContainer>
        <PageTitle>Dashboard</PageTitle>
        
        {error && (
          <ErrorMessage>
            Erro ao carregar dados: {error}
          </ErrorMessage>
        )}

        <DashboardGrid>
          <YearsWithMultipleWinnersCard 
            data={yearsWithMultipleWinners?.years || []} 
            loading={loading}
          />
          
          <StudiosWithWinCountCard 
            data={studiosWithWinCount?.studios || []} 
            loading={loading}
          />
        </DashboardGrid>

        <ProducerIntervalsCard 
          data={producerIntervals} 
          loading={loading}
        />

        <WinnersByYearCard 
          data={winnersByYear}
          onSearch={fetchWinnersByYear}
          onClear={clearWinnersByYear}
          loading={loading}
        />
      </DashboardContainer>
    </Layout>
  );
};
