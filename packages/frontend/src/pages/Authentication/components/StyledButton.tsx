import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  color: black;
  margin: 1rem;
  width: auto;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const StyledButton = (givenProps: any) => {
  return <Button {...givenProps} />;
};
