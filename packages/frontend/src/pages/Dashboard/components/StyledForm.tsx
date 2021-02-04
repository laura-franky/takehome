import React from 'react';
import styled from 'styled-components';

const Styled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
`;

export const StyledForm = (props: any) => {
  return <Styled {...props}></Styled>;
};
