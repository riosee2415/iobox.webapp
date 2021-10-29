import React, { useCallback, useState } from "react";
import {
  Image,
  Wrapper,
  Text,
  GradientText,
  WholeWrapper,
} from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import { Drawer } from "antd";
import useWidth from "../hooks/useWidth";

const TextWrapper = styled(Wrapper)`
  width: auto;
  cursor: pointer;

  & h2 {
    color: ${Theme.lightGrey_C};
    background: initial;
    -webkit-text-fill-color: initial !important;
    -webkit-background-clip: initial !important;

    transition: 0.5s;
  }

  &:hover h2 {
    background: linear-gradient(
      90deg,
      rgb(249, 2, 80),
      rgb(247, 141, 150),
      rgb(242, 146, 98),
      rgb(241, 115, 80)
    );

    -webkit-text-fill-color: transparent !important;
    -webkit-background-clip: text !important;
  }
`;

const Logo = styled(Image)`
  width: 200px !important;

  @media (max-width: 700px) {
    width: 150px !important;
    margin-top: 10px;
  }
`;

const AppFooter = () => {
  const width = useWidth();
  ////// HOOKS //////

  const [drawar, setDrawar] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////
  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  });

  ////// DATAVIEW //////
  return (
    <Wrapper
      position={`absolute`}
      bottom={`0`}
      left={width < 700 ? `0` : `50%`}
      margin={width < 700 ? `0` : `0 0 0 -250px`}
      width={width < 700 ? `100%` : `500px`}
    >
      <Wrapper
        dr={`row`}
        height={`100px`}
        shadow={`0px -3px 10px ${Theme.grey_C}`}
        position={`relative`}
      >
        <Wrapper position={`absolute`} top={`-90px`} left={`0`}>
          <GradientText bold={true}>내 물건 맡기기</GradientText>

          <Wrapper
            width={`100px`}
            height={`100px`}
            radius={`50%`}
            bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
          >
            <Wrapper
              width={`45px`}
              height={`45px`}
              radius={`50%`}
              bgColor={Theme.white_C}
            ></Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} ju={`space-around`}>
          <TextWrapper width={`auto`} onClick={drawarToggle}>
            <Image src={`#`} alt={`menuIcon`} width={`27px`} />

            <GradientText fontSize={`0.8rem`} bold={true}>
              메 뉴
            </GradientText>
          </TextWrapper>
          <TextWrapper width={`auto`}>
            <Image src={`#`} alt={`menuIcon`} width={`27px`} />
            <GradientText fontSize={`0.8rem`} bold={true}>
              내 보관함
            </GradientText>
          </TextWrapper>
        </Wrapper>

        {drawar && (
          <Drawer
            placement="right"
            closable={true}
            onClose={drawarToggle}
            visible={drawarToggle}
            getContainer={false}
          ></Drawer>
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default AppFooter;
