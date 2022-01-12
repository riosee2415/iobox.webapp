import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";

import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

import { Image, Wrapper, IoBoxWrapper } from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import { useRouter } from "next/dist/client/router";
import { KEEPBOX_LIST_REQUEST } from "../reducers/keepBox";
import { useCountUp, CountUp } from "use-count-up";
import styled from "styled-components";

const FirstWrapper = styled(Wrapper)`
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
      <FirstWrapper
        position={`fixed`}
        className={main ? `main` : `notMain`}
        transition={`0.5s`}
        opacity={mainOpacity}
        zIndex={mainZIndex}
        height={`100vh`}
      >
        <IoBoxWrapper
          height={`100vh`}
          bgColor={Theme.basicTheme_C}
          transition={`0.5s`}
        >
          <Image
            width={`100px`}
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/icon.png`}
          />
        </IoBoxWrapper>
      </FirstWrapper>
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
