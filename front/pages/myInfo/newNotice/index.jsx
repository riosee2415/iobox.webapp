import React, { useCallback, useEffect, useState } from "react";
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

import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Index = () => {
  const width = useWidth();

  ////// HOOKS //////

  ////// REDUX //////
  const router = useRouter();
  const { me } = useSelector((state) => state.user);

  ////// USEEFFECT //////
  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    if (!me) {
      router.push("/");

      return LoadNotification("로그인 후 이용해주세요.");
    }
  }, [me]);

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

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
