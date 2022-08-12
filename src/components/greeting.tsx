import {FC} from "react";
import {useNavigate} from "react-router-dom";
import styled, {css} from "styled-components";
import {IUser} from "../utils/types";

const FontStyled = css`
  font: normal 400 40px/48px "HN", Arial, sans-serif;
`;

const ParaStyle = styled.p`
  ${FontStyled}
  margin: 0;
  margin-block-end: 2.6041vw;
`;

const LoginStyled = styled.span`
  ${FontStyled};
  font-weight: 700;
`;

const ButtonStyled = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  width: 10.4166vw;
  aspect-ratio: 10/3;
  ${FontStyled};
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  background: #f5f5f5;
`;

const Greeting: FC<IUser> = ({login}) => {
  const navigate = useNavigate();
  return (
    <>
      <ParaStyle>
        Здравствуйте<LoginStyled>, {login}</LoginStyled>
      </ParaStyle>
      <ButtonStyled onClick={() => navigate("/", {replace: true})}>Выйти</ButtonStyled>
    </>
  );
};

export default Greeting;
