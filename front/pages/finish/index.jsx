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
          <IoBoxWrapper height={`100vh`} padding={`20px 0 100px`}>
            <Text bold={true} fontSize={`1.5rem`} margin={`0 0 30px`}>
              000님, 성공적으로 구매가 되었습니다.
            </Text>
            <RsWrapper
              height={`auto`}
              overflowY={`scroll`}
              wrap={`nowrap`}
              maxHeight={`calc(100vh - 250px)`}
              ju={`flex-start`}
            >
              <Box>
                <Image src={`#`} width={`200px`} />
                <Wrapper
                  width={`calc(100% - 200px)`}
                  padding={`0 0 0 10px`}
                  al={`flex-end`}
                >
                  <Text bold={true} color={Theme.basicTheme_C}>
                    Iobox
                  </Text>
                  <Text>정기결제</Text>
                  <Text>택배</Text>
                  <Text>가격</Text>
                  <Text>결제현황</Text>
                </Wrapper>
              </Box>

              <Box>
                <Image src={`#`} width={`200px`} />
                <Wrapper
                  width={`calc(100% - 200px)`}
                  padding={`0 0 0 10px`}
                  al={`flex-end`}
                >
                  <Text bold={true} color={Theme.basicTheme_C}>
                    Iobox
                  </Text>
                  <Text>정기결제</Text>
                  <Text>택배</Text>
                  <Text>가격</Text>
                  <Text>결제현황</Text>
                </Wrapper>
              </Box>

              <Box>
                <Image src={`#`} width={`200px`} />
                <Wrapper
                  width={`calc(100% - 200px)`}
                  padding={`0 0 0 10px`}
                  al={`flex-end`}
                >
                  <Text bold={true} color={Theme.basicTheme_C}>
                    Iobox
                  </Text>
                  <Text>정기결제</Text>
                  <Text>택배</Text>
                  <Text>가격</Text>
                  <Text>결제현황</Text>
                </Wrapper>
              </Box>

              <Box>
                <Image src={`#`} width={`200px`} />
                <Wrapper
                  width={`calc(100% - 200px)`}
                  padding={`0 0 0 10px`}
                  al={`flex-end`}
                >
                  <Text bold={true} color={Theme.basicTheme_C}>
                    Iobox
                  </Text>
                  <Text>정기결제</Text>
                  <Text>택배</Text>
                  <Text>가격</Text>
                  <Text>결제현황</Text>
                </Wrapper>
              </Box>

              <Box>
                <Image src={`#`} width={`200px`} />
                <Wrapper
                  width={`calc(100% - 200px)`}
                  padding={`0 0 0 10px`}
                  al={`flex-end`}
                >
                  <Text bold={true} color={Theme.basicTheme_C}>
                    Iobox
                  </Text>
                  <Text>정기결제</Text>
                  <Text>택배</Text>
                  <Text>가격</Text>
                  <Text>결제현황</Text>
                </Wrapper>
              </Box>

              <Box>
                <Image src={`#`} width={`200px`} />
                <Wrapper
                  width={`calc(100% - 200px)`}
                  padding={`0 0 0 10px`}
                  al={`flex-end`}
                >
                  <Text bold={true} color={Theme.basicTheme_C}>
                    Iobox
                  </Text>
                  <Text>정기결제</Text>
                  <Text>택배</Text>
                  <Text>가격</Text>
                  <Text>결제현황</Text>
                </Wrapper>
              </Box>
            </RsWrapper>

            <RsWrapper al={`flex-end`} height={`auto`} margin={`10px 0 0`}>
              <CommonButton radius={`50px`}>나의 보관함</CommonButton>
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
