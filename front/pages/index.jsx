import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import { useRouter } from "next/dist/client/router";

const Home = ({}) => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////
  return (
    <ClientLayout>
      <WholeWrapper
        height={`100vh`}
        bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}
      >
        <Wrapper
          width={width < 700 ? `100%` : `500px`}
          height={`100%`}
          shadow={`0px 0px 10px ${Theme.grey_C}`}
        >
          <Wrapper
            height={`45%`}
            bgColor={Theme.basicTheme_C}
            ju={`flex-start`}
          >
            <RsWrapper ju={`flex-start`} position={`relative`}>
              <Wrapper padding={`10px 0`}>
                <Image src={`#`} alt={`logo`} width={`40px`} />
              </Wrapper>

              <Text
                bold={true}
                color={Theme.white_C}
                fontSize={`3rem`}
                margin={`30px 0 0`}
              >
                맡아줘 내 짐!
              </Text>
              <Wrapper al={`flex-start`} margin={`45px 0 0`}>
                <Text bold={true} color={Theme.white_C}>
                  원할 때 맡겨!
                </Text>
              </Wrapper>

              <Wrapper al={`flex-end`} margin={`35px 0 0`}>
                <Text bold={true} color={Theme.white_C}>
                  원할 때 찾고!
                </Text>
              </Wrapper>

              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/woman.png`}
                position={`absolute`}
                bottom={`0`}
                left={`50%`}
                width={`130px`}
                zIndex={`2`}
                margin={`0 0 0 -65px`}
              />
            </RsWrapper>
          </Wrapper>
          <Wrapper height={`55%`} bgColor={Theme.white_C}>
            <RsWrapper ju={`flex-start`}>
              <Wrapper al={`flex-start`} margin={`50px 0 0`}>
                <Text>3초 만에 내가 맡길 짐 가격 알아보기</Text>

                <Wrapper
                  height={`50px`}
                  padding={`10px`}
                  border={`4px solid ${Theme.grey_C}`}
                  radius={`10px`}
                  margin={`10px 0 0s`}
                  ju={`space-between`}
                  dr={`row`}
                  onClick={() => {
                    moveLinkHandler("/calculate");
                  }}
                  cursor={`pointer`}
                >
                  <Text fontSize={`1.2rem`} bold={true}>
                    내 짐 맡기면 얼마일까 ?
                  </Text>

                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/search.png`}
                    width={`auto`}
                  />
                </Wrapper>
              </Wrapper>

              <Text margin={`40px 0 0`}>보관중인 고객님의 소중한 물건</Text>

              <Wrapper dr={`row`} margin={`5px 0 0`}>
                <Text
                  padding={`0 5px`}
                  bgColor={Theme.grey_C}
                  fontWeight={`700`}
                  fontSize={`1.3rem`}
                >
                  1
                </Text>
                <Text
                  padding={`0 5px`}
                  bgColor={Theme.grey_C}
                  fontWeight={`700`}
                  fontSize={`1.3rem`}
                  margin={`0 3px`}
                >
                  5
                </Text>
                <Text
                  padding={`0 5px`}
                  bgColor={Theme.grey_C}
                  fontWeight={`700`}
                  fontSize={`1.3rem`}
                >
                  7
                </Text>
                <Text
                  padding={`0 5px`}
                  bgColor={Theme.grey_C}
                  fontWeight={`700`}
                  fontSize={`1.3rem`}
                  margin={`0 0 0 3px`}
                >
                  8
                </Text>
                <Text
                  padding={`0 5px`}
                  bgColor={Theme.grey_C}
                  fontWeight={`700`}
                  fontSize={`1.3rem`}
                  margin={`0 0 0 3px`}
                >
                  개
                </Text>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </Wrapper>
      </WholeWrapper>
    </ClientLayout>
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
