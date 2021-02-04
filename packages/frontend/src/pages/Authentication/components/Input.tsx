import React, { useRef } from 'react';
import styled from 'styled-components';

const InputLabel = styled.label`
  position: absolute;
  left: 15px;
  top: 35px;
  color: rgb(116, 116, 116);
  transform: matrix(1, 0, 0, 1, 0, -12.5);
  transition-property: transform;
  line-height: 25px;
  font-size: 18px;
  transition-duration: 0.3s;
`;

const InputField = styled.input`
  background-color: transparent;
  padding: 35px 21px 13px;
  outline-width: 0px;
  border-width: 0;
  &:focus + ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  &:not(:placeholder-shown) + ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  height: 100%;
  width: 100%;
`;

const InputContainer = styled.div`
  transition-duration: 0.4s;
  transition-property: box-shadow, border-color;
  border: 1px solid #000;

  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  color: #000;
  position: relative;
  height: 75px;
  margin-bottom: 10px;
`;

export const Input = ({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  type?: 'text' | 'password' | 'number' | 'email' | 'datetime-local';
}) => {
  const id = useRef(`${label.replace(' ', '-')}-${Math.floor(Math.random() * 10000)}`);

  return (
    <InputContainer>
      <InputField {...props} id={id.current} placeholder=" " />
      <InputLabel htmlFor={id.current}>{label}</InputLabel>
    </InputContainer>
  );
};

export const InputIcon = ({
  label,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  icon: string;
  type?: 'text' | 'password' | 'number' | 'email' | 'datetime-local';
}) => {
  const id = useRef(`${label.replace(' ', '-')}-${Math.floor(Math.random() * 10000)}`);

  return (
    <InputContainer>
      <i />
      <InputField {...props} id={id.current} placeholder=" " />
      <InputLabel htmlFor={id.current}>{label}</InputLabel>
    </InputContainer>
  );
};
