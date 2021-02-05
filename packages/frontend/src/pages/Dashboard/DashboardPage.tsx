import { FunctionComponent, useEffect, useState } from 'react';
import React from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Card } from 'antd';
import styled from 'styled-components';
import { City, CityCard } from './components/CityCard';
import { useAuth } from '../../contexts/AuthenticationContext';
import { StyledButton } from '../Authentication/components/StyledButton';
import { AddCityForm } from './components/AddCityForm';

const CityCardWrapper = styled.div`
  padding: 1rem 2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export type ApiResponse<T> = {
  data: T;
};

export const DashboardPage: FunctionComponent = () => {
  const { token } = useAuth();
  const [error, setError] = useState<any>(null);
  const [addCityVisible, setAddCityVisible] = useState<boolean>(false);

  const [cities, setCities] = useState<City[]>();

  useEffect(() => {
    (async () => {
      try {
        const userCitiesRequest = await fetch('/api/city', {
          headers: { 'content-type': 'application/json', authorization: token! },
        });
        const citiesJSON = (await userCitiesRequest.json()) as ApiResponse<City[]>;

        setCities(citiesJSON.data);
      } catch (e) {
        setError(e);
      }
    })();
  }, [token]);

  const deleteCity = async (id: string) => {
    try {
      const result = await fetch(`/api/city/${id}`, {
        headers: { 'content-type': 'application/json', authorization: token! },
        method: 'DELETE',
      });
      if (result.status === 200) {
        setCities(cities?.filter((city) => city.id !== id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DashboardLayout>
      <CityCardWrapper>
        {cities ? (
          cities.map((city) =>  <CityCard key={city.id} city={city} deleteCity={deleteCity}/>)
        ) : (
          <StyledDiv>You have no weather updates</StyledDiv>
        )}
      </CityCardWrapper>
      <StyledDiv>
        <Card>
          <StyledButton
            onClick={() => {
              setAddCityVisible(!addCityVisible);
            }}
          >
            Add a City
          </StyledButton>
        </Card>
        {addCityVisible && <AddCityForm setCities={setCities} cities={cities!} setAddCityVisible={setAddCityVisible} />}
      </StyledDiv>
    </DashboardLayout>
  );
};
