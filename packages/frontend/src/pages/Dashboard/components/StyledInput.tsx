import styled from 'styled-components';
import { Input } from 'antd';
import React from 'react';

const Styled = styled(Input)`
  margin: 1rem;
  justify-content: center;
  width: 20rem;
  height: 3rem;
`;

export const StyledInput = (props: any) => {
  return <Styled {...props}></Styled>;
};
