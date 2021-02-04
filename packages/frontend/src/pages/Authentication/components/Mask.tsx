import styled from 'styled-components';

export const Mask = styled.div`
  border-radius: 15px;
  padding: 30px 26px;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.75);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-height: 384px;
  width: 500px;
  line-height: 25.2px;
`;

export const MaskHolder = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: inherit;
`;
