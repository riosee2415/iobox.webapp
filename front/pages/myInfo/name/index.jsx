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
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import Footer from "../../../components/Footer";
import useInput from "../../../hooks/useInput";
import {
  LOAD_MY_INFO_REQUEST,
  USER_NICKNAME_UPDATE_REQUEST,
} from "../../../reducers/user";
import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  const inputName = useInput(``);

  ////// REDUX //////
  const { me, st_userNickNameUpdateDone, st_userNickNameUpdateError } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_userNickNameUpdateError) {
    }
  }, [st_userNickNameUpdateError]);

  useEffect(() => {
    if (st_userNickNameUpdateError) {
      return LoadNotification(st_userNickNameUpdateError);
    }
  }, [st_userNickNameUpdateError]);

  useEffect(() => {
    if (st_userNickNameUpdateDone) {
      return LoadNotification("닉네임이 변경되었습니다.");
    }
  }, [st_userNickNameUpdateDone]);

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

  const nickNameUpdateHandler = useCallback(() => {
    if (me) {
      dispatch({
        type: USER_NICKNAME_UPDATE_REQUEST,
        data: {
          id: me.id,
          nickname: inputName.value,
        },
      });
    }
    inputName.setValue(``);
    router.push(`/myInfo`);
  }, [inputName, me]);

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
          height={`100vh`}
          ju={`space-between`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
        >
          <Wrapper al={`flex-start`}>
            <Text bold={true} fontSize={`2rem`}>
              이름 변경
            </Text>

            <TextInput
              width={`100%`}
              margin={`30px 0 0`}
              height={`50px`}
              placeholder="이름을 적어주세요."
              {...inputName}
            />
          </Wrapper>

          <CommonButton
            radius={`0`}
            width={`100%`}
            height={`50px`}
            onClick={nickNameUpdateHandler}
          >
            저장하기
          </CommonButton>
        </RsWrapper>
      </Wrapper>
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
