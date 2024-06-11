import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  margin: 115px auto auto auto;
  width: 45vw;  
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1.5fr;
  border-radius: 25px;
  background: lightgray;
  color: black;
  padding: 1.5rem 2rem 2rem 2rem;
  `;

export const InfoStyle = styled.div`
  grid-column: span 3;
`;

export const SwipeInfo = styled.div`
  grid-column: 3/4;
`;

export const AdvertisementImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;  
  object-fit: cover;
  border-radius: 25px;
  border: 1px solid darkgray;
  grid-column: 1/3;
`;
