import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Styled = styled(Link)`
  &:hover {
    color: #000000;
  }
  text-decoration: none;
  text-align: center;
  padding: 15px;
  color: ${(props) => props.theme.colors.primary};
`;

export const StyledLink = (props: any) => {
  return <Styled {...props}></Styled>;
};
