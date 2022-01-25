import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../../reducers/user";
import useInput from "../../hooks/useInput";
import ClientLayout from "../../components/ClientLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  IoBoxWrapper,
  CommonButton,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";

import { useRouter } from "next/dist/client/router";
import { KEEPBOX_LIST_REQUEST } from "../../reducers/keepBox";
import { useCountUp, CountUp } from "use-count-up";
import styled from "styled-components";
import MainSlider from "../../components/slide/MainSlider";

const Box = styled(Wrapper)`
  border-top: 1px solid ${Theme.basicTheme_C};
  flex-direction: row;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: ${Theme.lightBaiscTheme_C};
  }
`;

const Home = () => {
  const width = useWidth();

  ////// HOOKS //////

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////

  ////// DATAVIEW //////

  return (
    <>
      <ClientLayout>
        <WholeWrapper
          overflow={`hidden`}
          minHeight={`100vh`}
          bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}
        >
          <IoBoxWrapper
            height={`100vh`}
            padding={`20px 0 100px`}
            bgColor={Theme.white_C}
          >
            <RsWrapper>
              <Image
                width={`50px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO.png`}
                margin={`0 0 10px`}
              />

              <Text bold={true} fontSize={`1.5rem`} color={Theme.basicTheme_C}>
                무통장 입금 안내
              </Text>

              <Text
                margin={`30px 0`}
                fontSize={`1.2rem`}
                color={Theme.basicTheme_C}
              >
                박마루 카카오뱅크 3333-3333-333333
              </Text>
              <Text>
                {width < 700
                  ? `무통장 입금은 09:00 ~ 18:00에 입금하셔야`
                  : `무통장 입금은 09:00 ~ 18:00에 입금하셔야 당일 확인이 가능합니다.`}
              </Text>
              <Text>{width < 700 ? `당일 확인이 가능합니다.` : ``}</Text>
              <Text>이후에 입금하신 분은 다음날 입금 확인이 되며,</Text>
              <Text>입금 확인 후에 배송이 시작됩니다.</Text>
            </RsWrapper>
          </IoBoxWrapper>
        </WholeWrapper>
      </ClientLayout>
    </>
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
export default Home;
