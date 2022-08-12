import {FC} from "react";
import styled from "styled-components";

const ErrorFieldStyled = styled.p<{error: string}>`
  margin: 0;
  width: 33.3334vw;
  aspect-ratio: 32/3;
  border-radius: 8px;
  background: #f5e9e9;
  border: 1px solid #e26f6f;
  margin-block-end: 2.5vh;
  display: ${(props) => props.error};
  align-items: center;
  font: normal 400 14px/17px "HN", Helvetica, sans-serif;
`;

const ErrorImage = styled.img`
  width: 3.125%;
  aspect-ratio: 1;
  margin: 3.125% 2.1875% 3.125% 3.125%;
`;

const ErrorField: FC<{children: string}> = ({children}) => {
  const error = children ? "flex" : "none";
  return (
    <ErrorFieldStyled error={error}>
      <ErrorImage src={require(`../images/warning.svg`).default} alt="Значек предупреждения" />
      {children}
    </ErrorFieldStyled>
  );
};

export default ErrorField;
