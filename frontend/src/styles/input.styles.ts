import styled from "styled-components";

export const InputStyles = styled.input<{
  $isError: boolean;
}>`
  padding-left: 5px;
  border-color: ${(props) => (props.$isError ? "red" : "black")};;
  border-width: 1px;
  border-radius: 25px;
  background: white;
  color: black;
`;
