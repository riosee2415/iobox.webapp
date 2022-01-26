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
import {
  KEEPBOX_LIST_DETAIL_REQUEST,
  KEEPBOX_LIST_REQUEST,
} from "../../reducers/keepBox";
import { useCountUp, CountUp } from "use-count-up";
import styled from "styled-components";
import MainSlider from "../../components/slide/MainSlider";
import { message, Spin } from "antd";
import { numberWithCommas } from "../../components/commonUtils";

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

  const dataArr = [
    //
    [
      "행거박스",
      "W58 x H100 x D30 (CM)",
      "월",
      19000,
      `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/img-hanger.png`,
    ],
    [
      "행거박스 plus+",
      "W58 x H130 x D60 (CM)",
      "월",
      39000,
      `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/img-hanger-plus.png`,
    ],
    [
      "텐트박스",
      "W100 x H45 x D45 (CM)",
      "월",
      39000,
      `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/img-tent-box.png`,
    ],
    [
      "캠핑박스 plus+",
      "W110 x H50 x D50 (CM)",
      "월",
      59000,
      `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/img-camping-plus.png`,
    ],
  ];

  ////// HOOKS //////
  const router = useRouter();

  ////// REDUX //////
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { keepBoxDetails } = useSelector((state) => state.keepBox);

  ////// USEEFFECT //////
  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: KEEPBOX_LIST_DETAIL_REQUEST,
        data: {
          qs: `?masterId=${router.query.id}`,
        },
      });
    } else {
      router.push("/main");
      return message.error("잘못된 접근입니다.");
    }
  }, [router.query]);

  useEffect(() => {
    if (me && keepBoxDetails) {
      if (me.id !== keepBoxDetails[0].User.id) {
        router.push("/main");
        return message.error("잘못된 접근입니다.");
      }
    } else if (!me) {
      router.push("/main");
      return message.error("잘못된 접근입니다.");
    }
  }, [me, keepBoxDetails]);

  ////// TOGGLE ///////

  ///// HANDLER //////

  ////// DATAVIEW //////
  if (!keepBoxDetails) {
    return <Spin />;
  }

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
              {keepBoxDetails[0].User.nickname}님,{" "}
              <Text>성공적으로 구매가 되었습니다.</Text>
            </Text>
            <RsWrapper
              height={`auto`}
              overflowY={`scroll`}
              wrap={`nowrap`}
              maxHeight={`calc(100vh - 250px)`}
              ju={`flex-start`}
            >
              {keepBoxDetails.map((data) => {
                let info = "";

                if (data.boxcount1) {
                  info = dataArr[0];
                } else if (data.boxcount2) {
                  info = dataArr[1];
                } else if (data.boxcount3) {
                  info = dataArr[2];
                } else {
                  info = dataArr[3];
                }
                return (
                  <Box>
                    <Image src={info[4]} width={`200px`} />
                    <Wrapper
                      width={`calc(100% - 200px)`}
                      padding={`0 0 0 10px`}
                      al={`flex-end`}
                    >
                      <Text bold={true} color={Theme.basicTheme_C}>
                        {info[0]}
                      </Text>
                      <Text>{data.pickWay}</Text>
                      <Text>{data.period}결제</Text>
                      <Text>
                        {data.type === "총알 배송" ? `총알 배송` : ``}
                      </Text>
                      <Text>{numberWithCommas(info[3])}원</Text>
                      {/* <Text>결제현황</Text> */}
                    </Wrapper>
                  </Box>
                );
              })}
            </RsWrapper>

            <RsWrapper al={`flex-end`} height={`auto`} margin={`10px 0 0`}>
              <CommonButton
                radius={`50px`}
                onClick={() => router.push("/locker")}
              >
                나의 보관함
              </CommonButton>
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
