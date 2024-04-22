import styled from "styled-components";

export const ButtonStyled = styled.button<{ $span: number }>`
  background: deepskyblue;
  padding: 8px 24px;
  border-radius: 25px;
  box-shadow: none;
  border: none;
  grid-column: span ${(props) => props.$span};
`;
