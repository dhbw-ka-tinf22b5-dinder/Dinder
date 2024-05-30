import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  margin: auto;
  display: grid;
  gap: 10px;
  grid-template-columns: auto auto auto;
  border-radius: 25px;
  background: lightgray;
  color: black;
  padding: 2rem;
  `;
export const Info = styled.div`
  grid-column: span 3;
`;
export const AdvertismentImage = styled.img`
  width: 480px;
  height: 270px;
  border-radius: 25px;
  grid-column: span 3;
`;
