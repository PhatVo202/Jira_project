import styled from "styled-components";

// JSS ( CSS IN JS )

export const WrapperSpin = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  background: ${(props) => props.customBackground};
  z-index: 999;
`;
