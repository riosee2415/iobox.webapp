import React, { useCallback, useState } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { QuestionCircleOutlined } from "@ant-design/icons";

const ImageBox = styled(Wrapper)`
  height: 150px;
  background: ${Theme.grey_C};
  margin: 0 0 20px;
  cursor: pointer;
  overflow: hidden;

  ${Image} {
    transition: 0.5s;
  }

  &:hover ${Image} {
    transform: scale(1.1);
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////
  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const tabToggle = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  ////// DATAVIEW //////
  return (
    <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
      <Wrapper
        width={width < 700 ? `100%` : `500px`}
        minHeight={`100vh`}
        shadow={`0px 0px 10px ${Theme.grey_C}`}
        bgColor={Theme.white_C}
        al={`flex-start`}
        ju={`flex-start`}
        position={`relative`}
      >
        <Wrapper
          padding={`5px`}
          width={`auto`}
          position={`absolute`}
          top={`30px`}
          right={`30px`}
          fontSize={`20px`}
          cursor={`pointer`}
          onClick={moveBackHandler}
          zIndex={`100`}
        >
          <CloseOutlined />
        </Wrapper>
        <RsWrapper
          ju={`space-between`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
          minHeight={`100vh`}
        >
          <Wrapper al={`flex-start`}>
            <Text bold={true} fontSize={`2rem`} margin={`0 0 10px`}>
              이벤트
            </Text>

            <ImageBox>
              <Image src={`#`} alt={`thumbnail`} />
            </ImageBox>

            <ImageBox>
              <Image src={`#`} alt={`thumbnail`} />
            </ImageBox>

            <ImageBox>
              <Image src={`#`} alt={`thumbnail`} />
            </ImageBox>

            <ImageBox>
              <Image src={`#`} alt={`thumbnail`} />
            </ImageBox>

            <ImageBox>
              <Image src={`#`} alt={`thumbnail`} />
            </ImageBox>

            <ImageBox>
              <Image src={`#`} alt={`thumbnail`} />
            </ImageBox>

            <ImageBox>
              <Image src={`#`} alt={`thumbnail`} />
            </ImageBox>

            <ImageBox>
              <Image src={`#`} alt={`thumbnail`} />
            </ImageBox>
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
