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
import useOnlyNumberInput from "../../../hooks/useOnlyNumberInput";
import {
  LOAD_MY_INFO_REQUEST,
  USER_CARD_CREATE_REQUEST,
} from "../../../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";

import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";

const FocusInput = styled(TextInput)`
  width: ${(props) => props.width || `calc(100% / 4)`};
  height: 40px;
  padding: 10px;
  border: none !important;
`;

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
  const [tab, setTab] = useState(false);

  const [cardInput, setCardInput] = useState(false);
  const [dayInput, setDayInput] = useState(false);

  const inputCardNum1 = useOnlyNumberInput(``);
  const inputCardNum2 = useOnlyNumberInput(``);
  const inputCardNum3 = useOnlyNumberInput(``);
  const inputCardNum4 = useOnlyNumberInput(``);
  const inputCardPeriodMM = useOnlyNumberInput(``);
  const inputCardPeriodYY = useOnlyNumberInput(``);
  const inputCardIden = useOnlyNumberInput(``);
  const inputCardNumPassword = useOnlyNumberInput(``);

  ////// REDUX //////

  const dispatch = useDispatch();
  const router = useRouter();

  const { me, st_userCardCreateDone, st_userCardCreateError } = useSelector(
    (state) => state.user
  );

  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      router.push("/");

      return LoadNotification("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    if (me && me.cardNum) {
      inputCardNum1.setValue(me.cardNum.substring(0, 4));
      inputCardNum2.setValue(me.cardNum.substring(4, 8));
      inputCardNum3.setValue(me.cardNum.substring(8, 12));
      inputCardNum4.setValue(me.cardNum.substring(12, 16));

      inputCardPeriodMM.setValue(me.cardPeriod.substring(5, 7));
      inputCardPeriodYY.setValue(me.cardPeriod.substring(2, 4));
      inputCardIden.setValue(me.cardIden);
      inputCardNumPassword.setValue(me.cardPassword);
    }
  }, [me]);

  useEffect(() => {
    if (st_userCardCreateError) {
      return LoadNotification(st_userCardCreateError);
    }
  }, [st_userCardCreateError]);

  useEffect(() => {
    if (st_userCardCreateDone) {
      router.back();
      return LoadNotification("카드정보가 등록되었습니다.");
    }
  }, [st_userCardCreateDone]);

  ////// TOGGLE ///////
  const cardInputToggle = useCallback(() => {
    setCardInput(true);
  }, [cardInput]);

  const dayInputToggle = useCallback(() => {
    setDayInput(true);
  }, [dayInput]);

  ///// HANDLER //////

  const blurHandler = useCallback(() => {
    setCardInput(false);
    setDayInput(false);
  }, [cardInput]);

  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const tabToggle = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  const cardInfoHandler = useCallback(() => {
    console.log(
      inputCardNum1.value +
        "-" +
        inputCardNum2.value +
        "-" +
        inputCardNum3.value +
        "-" +
        inputCardNum4.value
    );

    console.log(
      inputCardNum1.value,
      inputCardNum2.value,
      inputCardNum3.value,
      inputCardNum4.value,
      inputCardPeriodMM.value,
      inputCardPeriodYY.value,
      inputCardIden.value,
      inputCardNumPassword.value
    );
    dispatch({
      type: USER_CARD_CREATE_REQUEST,
      data: {
        cardNum:
          inputCardNum1.value +
          inputCardNum2.value +
          inputCardNum3.value +
          inputCardNum4.value,
        cardPeriod:
          "20" + inputCardPeriodYY.value + "-" + inputCardPeriodMM.value,
        cardIden: inputCardIden.value,
        cardPassword: inputCardNumPassword.value,
      },
    });
  }, [
    inputCardNum1,
    inputCardNum2,
    inputCardNum3,
    inputCardNum4,
    inputCardPeriodMM,
    inputCardPeriodYY,
    inputCardIden,
    inputCardNumPassword,
  ]);

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
              카드 등록/변경
            </Text>

            <Wrapper al={`flex-start`} margin={`30px 0 0`}>
              <Text>카드번호</Text>
              <Wrapper
                dr={`row`}
                border={
                  cardInput === true
                    ? `1px solid ${Theme.basicTheme_C}`
                    : `1px solid ${Theme.grey_C}`
                }
                margin={`10px 0 0`}
              >
                <FocusInput
                  onBlur={blurHandler}
                  onClick={cardInputToggle}
                  placeholder="0000"
                  maxLength={4}
                  {...inputCardNum1}
                />
                <FocusInput
                  onBlur={blurHandler}
                  onClick={cardInputToggle}
                  placeholder="0000"
                  maxLength={4}
                  {...inputCardNum2}
                />
                <FocusInput
                  onBlur={blurHandler}
                  onClick={cardInputToggle}
                  placeholder="0000"
                  maxLength={4}
                  {...inputCardNum3}
                />
                <FocusInput
                  onBlur={blurHandler}
                  onClick={cardInputToggle}
                  placeholder="0000"
                  maxLength={4}
                  {...inputCardNum4}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`30px 0 0`}>
              <Text>유효기간</Text>
              <Wrapper
                dr={`row`}
                border={
                  dayInput === true
                    ? `1px solid ${Theme.basicTheme_C}`
                    : `1px solid ${Theme.grey_C}`
                }
                margin={`10px 0 0`}
                ju={`flex-start`}
              >
                <FocusInput
                  width={`calc(100% / 6)`}
                  onBlur={blurHandler}
                  onClick={dayInputToggle}
                  placeholder="MM"
                  maxLength={2}
                  {...inputCardPeriodMM}
                />
                <Text>/</Text>
                <FocusInput
                  width={`calc(100% / 6)`}
                  onBlur={blurHandler}
                  onClick={dayInputToggle}
                  placeholder="YY"
                  maxLength={2}
                  {...inputCardPeriodYY}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`30px 0 0`}>
              <Text>주민번호 앞 6자리 (또는 사업자번호 10자리)</Text>

              <TextInput
                width={`100%`}
                margin={`10px 0 0`}
                border={`1px solid ${Theme.grey_C}`}
                placeholder="주민번호 또는 사업자번호"
                maxLength={10}
                {...inputCardIden}
              />
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`30px 0 0`}>
              <Text>비밀번호 앞 2자리</Text>

              <TextInput
                width={`100%`}
                margin={`10px 0 0`}
                border={`1px solid ${Theme.grey_C}`}
                placeholder="00"
                maxLength={2}
                {...inputCardNumPassword}
              />
            </Wrapper>
          </Wrapper>

          <CommonButton
            onClick={cardInfoHandler}
            radius={`0`}
            width={`100%`}
            height={`50px`}
          >
            저장하기
          </CommonButton>
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
