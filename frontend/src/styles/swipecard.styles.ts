import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  margin: 115px auto auto auto;
  width: 20%;
  display: grid;
  gap: 10px;
  grid-template-columns: auto auto auto;
  border-radius: 25px;
  background: lightgray;
  color: black;
  padding: 2rem;
  `;

export const InfoStyle = styled.div`
  grid-column: span 3;
`;

export const AdvertismentImage = styled.img`
  width: 100%;
  height: 25vh;
  border-radius: 25px;
  grid-column: span 3;
  border: 1px solid darkgray;
`;
