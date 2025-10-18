import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { fetchAppData } from '../store/thunks';
import { ContactsWidget } from './ContactsWidget';
import { EmailSendsWidget } from './EmailSendsWidget';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Header = styled.header`
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  color: #1a202c;
  font-weight: 600;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e53e3e;
  background-color: #fed7d7;
  border-radius: 8px;
  border: 1px solid #fc8181;
`;

function App() {
  const dispatch = useDispatch();
  const usage = useSelector((state: RootState) => state.usage);
  const account = useSelector((state: RootState) => state.account);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    dispatch(fetchAppData() as any);
  }, [dispatch]);

  const renderContent = () => {
    if (loading) {
      return <LoadingState>Loading usage data...</LoadingState>;
    }

    if (error) {
      return <ErrorState>Error loading data: {error}</ErrorState>;
    }

    if (!usage || !account) {
      return <LoadingState>No data available</LoadingState>;
    }

    return (
      <>
        <ContactsWidget usage={usage.contacts} account={account} />
        <EmailSendsWidget usage={usage.emailSends} account={account} />
      </>
    );
  };

  return (
    <AppContainer>
      <Header>
        <Title>ActiveCampaign Dashboard</Title>
      </Header>
      <MainContent>
        <WidgetsContainer id="usage-widgets-container">
          {renderContent()}
        </WidgetsContainer>
      </MainContent>
    </AppContainer>
  );
}

export default App;

