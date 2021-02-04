import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Modal } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  &.ant-card-body {
    padding: 1rem;
  }
  margin: 1rem 0;
`;

export type City = {
  id: string;
  name: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CityItemProps = {
  city: City;
  deleteCity: (id: string) => Promise<void>;
};

export const CityCard: FunctionComponent<CityItemProps> = ({ city, deleteCity }) => {
  return <StyledCard title={city.name}></StyledCard>;
};
