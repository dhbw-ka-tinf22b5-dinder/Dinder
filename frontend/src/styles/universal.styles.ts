import styled from "styled-components";

export const Logo = styled.img`
  position: relative;
  height: 100%;
  margin: 10px;
`;
export const Header = styled.header`
  position: relative;
  color: white;
  font-size: 2rem;
  margin-left: 1rem;
  margin-right: auto;
`;
export const HeaderSubpages = styled.header`
  position: relative;
  color: white;
  font-size: 1.5rem;
  margin-left: 2.5rem;
    user-select: none;
    cursor: pointer;
`;
export const HeaderLogout = styled.header`
  position: relative;
  color: white;
  font-size: 1.5rem;
  margin-left: auto;
  margin-right: 2.5rem;
`;
export const Nav = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6%;
  z-index: 1000;
  display: flex;
  padding: 19px;
  background: gray;
  opacity: 70%;
  align-items: center;
`;
