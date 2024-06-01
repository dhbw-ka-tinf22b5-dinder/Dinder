import styled from "styled-components";

export const MainContainer = styled.div<{ $isMain?: boolean }>`
    position: relative;
    margin: auto;
    display: grid;
    gap: 60px;
    grid-template-columns: auto auto;
    background: grey;
    border-radius: 25px;
    color: black;
    padding: 0.5rem;
`;

export const MainBackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;
