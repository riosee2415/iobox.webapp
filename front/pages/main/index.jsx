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
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { KEEPBOX_LIST_REQUEST } from "../../reducers/keepBox";
import { useCountUp, CountUp } from "use-count-up";
import styled from "styled-components";

const FirstWrapper = styled(Wrapper)`
  width: 100%;
  height: 100vh;
`;

const FirstDisplay = styled(Wrapper)`
  width: 500px;
  height: 100vh;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Home = () => {
  const width = useWidth();
  const router = useRouter();

  const [main, setMain] = useState(true);
  const [mainOpacity, setMainOpacity] = useState(`1`);
  const [mainZIndex, setMainZIndex] = useState(`1001`);

  const [lengthData1, setLengthData1] = useState(`0`);
  const [lengthData2, setLengthData2] = useState(`0`);
  const [lengthData3, setLengthData3] = useState(`0`);
  const [lengthData4, setLengthData4] = useState(`0`);
  const [firstRender, setFirstRender] = useState(`0`);

  ////// HOOKS //////

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setMainZIndex(`-10`);
      setMainOpacity(`0`);
      reset();
      reset2();
    }, [1000]);

    setTimeout(() => {
      sessionStorage.setItem("KJAKJ&&DJ%K#ASD", "true");
      // setTimout 2000이 아쉽네요 - 재완 -
    }, [2000]);
  }, [main]);

  useEffect(() => {
    dispatch({
      type: KEEPBOX_LIST_REQUEST,
      data: { qs: "" },
    });
    setFirstRender(sessionStorage.getItem("KJAKJ&&DJ%K#ASD"));

    router.push("/main");
  }, []);

  const { value, reset } = useCountUp({
    isCounting: true,
    start: 0,
    end: 15,
    duration: 3,
  });
  const { value: value2, reset: reset2 } = useCountUp({
    isCounting: true,
    start: 0,
    end: 78,
    duration: 3,
  });

  const { keepBoxes } = useSelector((state) => state.keepBox);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  ///// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    setLengthData1(0);
    setLengthData2(0);

    // 코드가 2번 도는 느낌이 드는데 제가 코드를 제대로 본건 아니라 잘 모르겠네요 - 재완 -
    if (String(value).length === 1) {
      setLengthData1(0);
      setLengthData2(String(value)[0]);
    } else if (String(value).length === 2) {
      setLengthData1(new String(value.substring(0, 2))[0]);
      setLengthData2(new String(value.substring(0, 2))[1]);
    }

    if (String(value2).length === 1) {
      setLengthData3(0);
      setLengthData4(String(value2)[0]);
    } else if (String(value2).length === 2) {
      setLengthData3(new String(value2.substring(0, 2))[0]);
      setLengthData4(new String(value2.substring(0, 2))[1]);
    }
  }, [value, value2]);

  useEffect(() => {
    if (!mainOpacity) {
    }
  }, [main]);

  ////// DATAVIEW //////
  return (
    <>
      {firstRender !== "true" && (
        <FirstWrapper
          position={`fixed`}
          className={main ? `main` : `notMain`}
          transition={`0.5s`}
          opacity={mainOpacity}
          zIndex={mainZIndex}
          height={`100vh`}
        >
          <FirstDisplay bgColor={Theme.basicTheme_C} transition={`0.5s`}>
            <Image
              width={`100px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
            />
          </FirstDisplay>
        </FirstWrapper>
      )}

      <ClientLayout>
        <WholeWrapper
          overflow={`hidden`}
          height={`90vh`}
          bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}
        >
          <Wrapper
            width={width < 700 ? `100%` : `500px`}
            height={`100%`}
            shadow={`0px 0px 10px ${Theme.grey_C}`}
          >
            <Wrapper
              height={`40%`}
              bgColor={Theme.basicTheme_C}
              ju={`flex-start`}
            >
              <RsWrapper ju={`flex-start`} position={`relative`}>
                <Wrapper padding={`10px 0`}>
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
                    alt={`logo`}
                    width={`40px`}
                  />
                </Wrapper>

                <Text
                  bold={true}
                  color={Theme.white_C}
                  fontSize={`3rem`}
                  margin={width < 700 ? `0` : `30px 0 0`}
                >
                  맡아줘 내 짐!
                </Text>
                <Wrapper
                  al={`flex-start`}
                  margin={width < 700 ? `20px 0 0` : `45px 0 0`}
                >
                  <Text bold={true} color={Theme.white_C}>
                    원할 때 맡겨!
                  </Text>
                </Wrapper>

                <Wrapper
                  al={`flex-end`}
                  margin={width < 700 ? `20px 0 0` : `35px 0 0`}
                >
                  <Text bold={true} color={Theme.white_C}>
                    원할 때 찾고!
                  </Text>
                </Wrapper>

                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/woman.png`}
                  position={`absolute`}
                  bottom={`0`}
                  left={`50%`}
                  width={`100px`}
                  zIndex={`2`}
                  margin={`0 0 0 -50px`}
                />
              </RsWrapper>
            </Wrapper>
            <Wrapper height={`60%`} bgColor={Theme.white_C}>
              <RsWrapper ju={`flex-start`}>
                <Wrapper
                  al={`flex-start`}
                  margin={width < 700 ? `30px 0 0` : `50px 0 0`}
                >
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
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/search.png`}
                      width={`20px`}
                      margin={`0 0 3px`}
                    />
                  </Wrapper>
                </Wrapper>

                <Text margin={width < 700 ? `30px 0 0` : `40px 0 0`}>
                  보관중인 고객님의 소중한 물건
                </Text>

                <Wrapper dr={`row`} margin={`5px 0 0`}>
                  <Text
                    padding={`0 5px`}
                    bgColor={Theme.grey_C}
                    fontWeight={`700`}
                    fontSize={`1.3rem`}
                  >
                    {lengthData1 ? lengthData1 : `0`}
                  </Text>
                  <Text
                    padding={`0 5px`}
                    bgColor={Theme.grey_C}
                    fontWeight={`700`}
                    fontSize={`1.3rem`}
                    margin={`0 3px`}
                  >
                    {lengthData2}
                  </Text>
                  <Text
                    padding={`0 5px`}
                    bgColor={Theme.grey_C}
                    fontWeight={`700`}
                    fontSize={`1.3rem`}
                  >
                    {lengthData3}
                  </Text>
                  <Text
                    padding={`0 5px`}
                    bgColor={Theme.grey_C}
                    fontWeight={`700`}
                    fontSize={`1.3rem`}
                    margin={`0 3px`}
                  >
                    {lengthData4}
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
