import styled from "styled-components";

export const InformationImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 25px;
    grid-column: span 3;
    border: 1px solid darkgray;
`;

export const CardGrid = styled.div`
    margin: 120px auto 3.5rem auto;
    max-width: 90%;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto;
    border-radius: 25px;
    background: lightgray;
    color: black;
    padding: 2rem;
`;

export const CardGridItem = styled.div`
  height: auto;
  width: 200px;
  padding: 1rem;
  margin: 0.5rem;
  display: grid;
  gap: 10px;
  grid-template-columns: auto auto auto;
  border-radius: 25px;
  background: lightgray;
  color: black;
  `;