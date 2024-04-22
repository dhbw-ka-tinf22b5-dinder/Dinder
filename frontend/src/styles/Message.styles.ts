import styled from "styled-components";

export const MessageStyles = styled.div<{
	$isHidden: boolean;
	$isError: boolean;
}>`
  position: relative;
  color: black;
  background: ${(props) => (props.$isError ? "red" : "green")}; 
  padding: 8px 24px;
  border-radius: 25px;
  box-shadow: none;
  border: none;
  z-index: 1000;
  margin: 20px;
  visibility: ${(props) => (props.$isHidden ? "hidden" : "visible")};
`;
