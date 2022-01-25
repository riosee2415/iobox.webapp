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
import styled, { ThemeContext } from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import {
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import Footer from "../../../components/Footer";
import useInput from "../../../hooks/useInput";
import {
  LOAD_MY_INFO_REQUEST,
  USER_PHONE_CHECK_REQUEST,
  USER_PHONE_REQUEST,
} from "../../../reducers/user";
import { message } from "antd";
import { useSelector } from "react-redux";
import wrapper from "../../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

const Button = styled(CommonButton)`
  width: 100%;
  height: 50px;
  background: ${(props) => props.bgColor || Theme.grey_C};
  color: ${Theme.white_C};
  border: ${(props) => props.border || `1px solid ${Theme.grey_C}`};

  &:hover {
    background: ${(props) => props.hoverBgColor || Theme.grey_C};
    color: ${(props) => props.hoverColor || Theme.white_C};
    border: ${(props) => props.border || `1px solid ${Theme.grey_C}`};
  }
`;

const TextButton = styled(Text)`
  color: ${Theme.grey_C};
  border-bottom: 1px solid ${Theme.grey_C};
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    color: ${Theme.black_C};
    border-bottom: 1px solid ${Theme.black_C};
  }
`;

const Index = () => {
  const width = useWidth();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);
  const [reqTab, setReqTab] = useState(0);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const dispatch = useDispatch();

  const inputMobile = useInput("");
  const inputSecret = useInput("");

  ////// REDUX //////
  const router = useRouter();

  const {
    me,
    st_userPhoneDone,
    st_userPhoneError,
    st_userPhoneCheckDone,
    st_userPhoneCheckError,
  } = useSelector((state) => state.user);

  console.log(me);

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_userPhoneDone) {
      setReqTab(1);
    }
  }, [st_userPhoneDone]);

  useEffect(() => {
    if (st_userPhoneError) {
      return message.error(st_userPhoneError);
    }
  }, [st_userPhoneError]);
  useEffect(() => {
    if (st_userPhoneCheckDone) {
      moveBackHandler("/myinfo");
      return message.success("휴대폰 인증에 성공하였습니다.");
    }
  }, [st_userPhoneCheckDone]);

  useEffect(() => {
    if (st_userPhoneCheckError) {
      return message.error(st_userPhoneCheckError);
    }
  }, [st_userPhoneCheckError]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  ////// TOGGLE ///////

  ///// HANDLER //////
  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  const reqHandler = useCallback(() => {
    if (inputMobile.value.length !== 11) {
      return message.error("연락처를 제대로 입력해주세요.");
    }
    dispatch({
      type: USER_PHONE_REQUEST,
      data: {
        phoneNum: inputMobile.value,
        id: me.id,
      },
    });
  }, [inputMobile, me]);

  const checkCodeHandler = useCallback(() => {
    if (inputSecret.value.length !== 6) {
      return message.error("인증번호는 6자입니다.");
    }

    dispatch({
      type: USER_PHONE_CHECK_REQUEST,
      data: {
        id: me.id,
        code: inputSecret.value,
      },
    });
  }, [inputSecret, me]);

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
          height={`100vh`}
          ju={`space-between`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
        >
          <Wrapper al={`flex-start`}>
            <Text bold={true} fontSize={`2rem`}>
              전화번호
            </Text>

            {/* 인증요청 누르기 전 text */}
            {reqTab === 0 ? (
              <Text>전화번호를 입력 후 인증요청 버튼을 눌러주세요.</Text>
            ) : (
              //  인증요청 누르기 후 text
              <Text fontSize={`0.9rem`}>
                {inputMobile.value}로 전송된 6자리 코드를 입력해주세요.
              </Text>
            )}

            {/* 인증요청 누른 후 나타남 */}
            {reqTab === 1 && (
              <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 0`}>
                <TextButton onClick={() => setReqTab(0)}>
                  전화번호 재입력
                </TextButton>

                <CommonButton
                  width={`auto`}
                  radius={`30px`}
                  hieght={`25px`}
                  fontSize={`0.8rem`}
                  onClick={reqHandler}
                >
                  인증번호 재요청
                </CommonButton>
              </Wrapper>
            )}
            {/* 인증요청 버튼 누르기 전 */}
            {reqTab === 0 && (
              <TextInput
                type="number"
                width={`100%`}
                height={`50px`}
                margin={`10px 0 0`}
                placeholder="(-) 없이 전화번호 입력해주세요."
                {...inputMobile}
              />
            )}

            {/* 인증요청 버튼 누른 후 나타남 */}
            {reqTab === 1 && (
              <>
                <TextInput
                  width={`100%`}
                  height={`50px`}
                  margin={`10px 0 0`}
                  placeholder="인증번호 6자리를 입력해주세요."
                  {...inputSecret}
                />

                {/* 인증시간
                <Wrapper al={`flex-start`} margin={`5px 0 0`}>
                  <Text fontSize={`0.8rem`}>0:00</Text>
                </Wrapper> */}
              </>
            )}

            {/* 인증시간 초과했을 때 */}
            {isTimeOut === true && (
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={`5px 0 0`}
                color={Theme.red_C}
              >
                <IssuesCloseOutlined />
                <Wrapper width={`auto`} al={`flex-start`} margin={`0 0 0 5px`}>
                  <Text fontSize={`0.8rem`} color={Theme.red_C}>
                    입력시간이 초과되었습니다.
                  </Text>
                  <Text fontSize={`0.8rem`} color={Theme.red_C}>
                    재요청을 눌러 새 인증번호를 입력하세요.
                  </Text>
                </Wrapper>
              </Wrapper>
            )}
          </Wrapper>

          <Button
            radius={`0`}
            width={`100%`}
            height={`50px`}
            // bgColor={`${Theme.grey_C} !important`}
            onClick={() => (reqTab === 0 ? reqHandler() : checkCodeHandler())}
            bgColor={inputMobile.value ? Theme.basicTheme_C : `initial`}
            hoverBgColor={inputMobile.value ? Theme.basicTheme_C : `initial`}
            border={inputMobile.value ? Theme.basicTheme_C : `initial`}
          >
            {reqTab === 0 ? `인증 요청` : `인증`}
          </Button>
        </RsWrapper>

        <Footer />
      </IoBoxWrapper>
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
