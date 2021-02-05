import { Card } from 'antd';
import React from 'react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/AuthenticationContext';
import { StyledButton } from '../../Authentication/components/StyledButton';
import { City } from './CityCard';
import { StyledForm } from './StyledForm';
import { StyledInput } from './StyledInput';

const StyledCard = styled(Card)`
  &.ant-card-body {
    padding: 1rem;
  }
  background-color: ${(props) => props.theme.colors.backgroundColor};
  width: 30rem;
  margin: auto;
  justify-content: center;
`;

const StyledH3 = styled.h3`
  font-size: 2rem;
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

export type AddCityFormProps = {
  setAddCityVisible: (addCityVisible: boolean) => void;
  setCities: (cities: City[]) => void;
  cities: City[];
};

export const AddCityForm: FunctionComponent<AddCityFormProps> = ({ setAddCityVisible, setCities, cities }) => {
  const { token } = useAuth();
  const [values, setValues] = useState({
    name: '',
  });

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await fetch(`/api/city/addCityToUser`, {
        body: JSON.stringify(values),
        headers: { 'content-type': 'application/json', authorization: token! },
        method: 'PATCH',
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledCard>
      <StyledForm onSubmit={onSubmitForm}>
        <StyledInput name="name" type="text" placeholder="Name" onChange={fieldDidChange} required={true} />
        <ButtonWrapper>
          <StyledButton type="submit">Add City</StyledButton>
        </ButtonWrapper>
      </StyledForm>
    </StyledCard>
  );
};
