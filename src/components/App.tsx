import React from 'react';
import styled from 'styled-components';

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

function App() {
  return (
    <AppContainer>
      <Header>
        <Title>ActiveCampaign Dashboard</Title>
      </Header>
      <MainContent>
        <WidgetsContainer id="usage-widgets-container">
          {/* TODO: Build and mount UsageWidget components here */}
        </WidgetsContainer>
      </MainContent>
    </AppContainer>
  );
}

export default App;

