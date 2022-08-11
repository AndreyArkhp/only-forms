import styled from "styled-components";

const HeaderEl = styled.header`
  max-width: 1920px;
  margin: 0 auto;
  padding-block-start: 40px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  font: normal 700 64px/78px Arial, sans-serif;
`;

const Header = () => {
  return (
    <HeaderEl>
      <Title>ONLY.</Title>
    </HeaderEl>
  );
};

export default Header;
