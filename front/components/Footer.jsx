import React from "react";
import useWidth from "../hooks/useWidth";
import { WholeWrapper, Wrapper, Image, Text } from "./commonComponents";
import Theme from "./Theme";

const Index = () => {
  const width = useWidth();
  return (
    <Wrapper
      width={width < 700 ? `100%` : `500px`}
      height={`100%`}
      shadow={`0px 0px 10px ${Theme.grey_C}`}
      bgColor={Theme.white_C}
      al={`flex-start`}
      ju={`flex-start`}
      position={`fixed`}
      bottom={`0`}
      left={`0`}
      position={`relative`}
    >
      <Wrapper
        bgColor={Theme.basicTheme_C}
        padding={`50px`}
        color={Theme.white_C}
        dr={`row`}
        ju={`space-between`}
      >
        <Image
          width={`50px`}
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
        />

        <Wrapper width={`auto`} al={`flex-start`}>
          <Text>상호명 : io박스</Text>
          <Text>사업자등록번호 : 0000000</Text>
          <Text>대표자명 : io박스</Text>
          <Text>주소 : io박스</Text>
          <Text>대표번호 : io박스</Text>
          <Text>통신판매업번호 : io박스</Text>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default Index;
