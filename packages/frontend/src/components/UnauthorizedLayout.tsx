import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthenticationContext';

const { Header, Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
  color: ${(props) => props.theme.colors.fontColor};
`;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.fontColor};
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const StyledContent = styled(Content)`
  padding: 1rem 2rem;
`;

const Title = styled.h1`
  margin: 1rem;
  align-self: flex-start;
  font-size: 2rem;
  color: #dfdfdf;
`;

export const UnauthorizedLayout: React.FC = ({ children }) => {
  const {
    actions: { logout },
  } = useAuth();

  const loggingOut = () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <Title>Wetter Online</Title>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
};
