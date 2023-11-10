import styled from "styled-components";

export const MainContainer = styled.div`
    display: grid;
    gap: 60px;
    grid-template-columns: auto auto;
    border-radius: 25px;
    color: black;
    padding: 10px;
`

export const MainBackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`