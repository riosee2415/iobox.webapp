import React from "react";
import {
  RowWrapper,
  ColWrapper,
  Image,
  Wrapper,
  GradientText,
} from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";

const Logo = styled(Image)`
  width: 200px !important;

  @media (max-width: 700px) {
    width: 150px !important;
    margin-top: 10px;
  }
`;

const AppFooter = () => {
  return (
    <Wrapper
      dr={`row`}
      height={`100px`}
      shadow={`0px -3px 10px ${Theme.grey_C}`}
      position={`relative`}
    >
      <Wrapper position={`absolute`} top={`0`} left={`0`}>
        <GradientText>내 물건 맡기기</GradientText>
      </Wrapper>
    </Wrapper>
  );
};

export default AppFooter;
