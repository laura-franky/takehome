import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  display: flex;
  color: black;
  margin: 1rem;
  width: 20rem;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const StyledButton = (givenProps: any) => {
  return <Button {...givenProps} />;
};
