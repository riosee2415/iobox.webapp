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
  IoBoxWrapper,
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import Footer from "../../../components/Footer";

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////
  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  ////// DATAVIEW //////
  return (
    <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
      <IoBoxWrapper
        minHeight={`100vh`}
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
          ju={`flex-start`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
          minHeight={`100vh`}
        >
          <Wrapper al={`flex-start`} margin={`0 0 10px`}>
            <Text bold={true} fontSize={`2rem`}>
              알림
            </Text>

            <Wrapper
              al={`flex-start`}
              padding={`20px`}
              minHeight={`100px`}
              shadow={`0px 0px 10px ${Theme.lightGrey_C}`}
              ju={`space-between`}
              margin={`0 0 10px`}
            >
              <Text>
                내용이 들어올 곳 입니다. 내용이 들어올 곳 입니다.내용이 들어올
                곳 입니다.내용이 들어올 곳 입니다.내용이 들어올 곳 입니다.내용이
                들어올 곳 입니다.내용이 들어올 곳 입니다.내용이 들어올 곳
                입니다.내용이 들어올 곳 입니다.내용이 들어올 곳 입니다.
              </Text>
              <Wrapper al={`flex-end`} margin={`5px 0 0`}>
                <Text color={Theme.grey_C} fontSize={`0.7rem`}>
                  날짜가 들어올 곳 입니다.
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              padding={`20px`}
              minHeight={`100px`}
              shadow={`0px 0px 10px ${Theme.lightGrey_C}`}
              ju={`space-between`}
              margin={`0 0 10px`}
            >
              <Text>
                내용이 들어올 곳 입니다. 내용이 들어올 곳 입니다.내용이 들어올
                곳 입니다.내용이 들어올 곳 입니다.내용이 들어올 곳 입니다.내용이
                들어올 곳 입니다.내용이 들어올 곳 입니다.내용이 들어올 곳
                입니다.내용이 들어올 곳 입니다.내용이 들어올 곳 입니다.
              </Text>
              <Wrapper al={`flex-end`} margin={`5px 0 0`}>
                <Text color={Theme.grey_C} fontSize={`0.7rem`}>
                  날짜가 들어올 곳 입니다.
                </Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </IoBoxWrapper>
      <Footer />
    </WholeWrapper>
  );
};

export default Index;
