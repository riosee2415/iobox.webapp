import React, { useCallback, useState } from "react";
import Theme from "../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  IoBoxWrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import Footer from "../../components/Footer";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MASTER_KEEPBOX_LIST_REQUEST } from "../../reducers/keepBox";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(null);

  const [boxes, setBoxes] = useState(null);

  ////// REDUX //////
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { keepBoxes } = useSelector((state) => state.keepBox);

  const statusData = {
    보관예약: 1,
    수거중: 2,
    센터도착: 3,
    보관중: 4,
  };

  ////// USEEFFECT //////
  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    if (me) {
      dispatch({
        type: MASTER_KEEPBOX_LIST_REQUEST,
        data: {
          id: me.id,
        },
      });
    }
  }, [me]);

  useEffect(() => {
    if (keepBoxes) {
      let tempArr = {};
      let tempIndex = {};

      keepBoxes.map((data) => {
        tempIndex = { ...tempIndex, [data.id]: false };

        const index = Object.keys(tempArr).indexOf(
          moment(data.createdAt).format("YY년 MM월 DD일")
        );

        if (index === -1) {
          tempArr = {
            ...tempArr,
            [moment(data.createdAt).format("YY년 MM월 DD일")]: [
              { ...data, tab: false },
            ],
          };
        } else {
          tempArr = {
            ...tempArr,
            [moment(data.createdAt).format("YY년 MM월 DD일")]: [
              ...tempArr[moment(data.createdAt).format("YY년 MM월 DD일")],
              { ...data, tab: false },
            ],
          };
        }

        setTab(tempIndex);
        setBoxes(tempArr);
      });
    }
  }, [keepBoxes]);

  ////// TOGGLE ///////

  ///// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const tabToggle = useCallback(
    (index) => {
      let tempIndex = { ...tab, [index]: !tab[index] };

      // const tempArr = tab.map((data, idx) => {
      //   return index === idx ? !data : data;
      // });
      setTab(tempIndex);
    },
    [tab]
  );

  console.log(tab);

  ////// DATAVIEW //////
  return (
    <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
      <IoBoxWrapper
        height={`100%`}
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
          onClick={() => {
            moveLinkHandler("/");
          }}
          zIndex={`100`}
        >
          <CloseOutlined />
        </Wrapper>
        <Wrapper>
          <RsWrapper
            ju={`flex-start`}
            position={`relative`}
            al={`flex-start`}
            padding={`30px 0`}
            bgColor={Theme.white_C}
            minHeight={`100vh`}
          >
            <Text fontSize={`2rem`} bold={true}>
              내 보관함
            </Text>
            {/* 아무것도 없을 때 */}

            {boxes ? (
              <Wrapper ju={`flex-start`}>
                <Wrapper
                  ju={`space-between`}
                  dr={`row`}
                  margin={`10px 0 0`}
                  padding={`0 0 10px`}
                  borderBottom={`1px solid ${Theme.grey_C}`}
                >
                  <Wrapper width={`auto`} al={`flex-start`}>
                    {/* <Text fontWeight={`700`} fontSize={`1.2rem`}>
                    고객번호
                  </Text>
                  <Text>05466</Text> */}
                  </Wrapper>

                  <CommonButton
                    radius={`30px`}
                    width={`120px`}
                    height={`40px`}
                    onClick={() => {
                      moveLinkHandler("/locker/mylocker");
                    }}
                  >
                    내 보관함
                  </CommonButton>
                </Wrapper>

                {Object.keys(boxes).map((data, idx) => (
                  <Wrapper al={`flex-start`} padding={`30px 0 0`} key={idx}>
                    <Text margin={`0 0 10px`} color={Theme.darkGrey_C}>
                      {data}
                    </Text>

                    {boxes[data].map((info, index) => {
                      const dataArr = [
                        //
                        ["행거박스", "W58 x H100 x D30 (CM)", "월", 19000],
                        [
                          "행거박스 plus+",
                          "W58 x H130 x D60 (CM)",
                          "월",
                          39000,
                        ],
                        ["텐트박스", "W100 x H45 x D45 (CM)", "월", 39000],
                        [
                          "캠핑박스 plus+",
                          "W110 x H50 x D50 (CM)",
                          "월",
                          59000,
                        ],
                      ];

                      const check = [0, 0, 0, 0];
                      for (let i = 0; i < info.KeepBoxes.length; i++) {
                        const tempData = info.KeepBoxes[i];

                        if (tempData.boxcount1) {
                          check[0] = tempData.boxcount1;
                        }
                        if (tempData.boxcount2) {
                          check[1] = tempData.boxcount2;
                        }
                        if (tempData.boxcount3) {
                          check[2] = tempData.boxcount3;
                        }
                        if (tempData.boxcount4) {
                          check[3] = tempData.boxcount4;
                        }
                      }

                      console.log(check);

                      return (
                        <Wrapper
                          margin={`0 0 10px`}
                          border={`1px solid ${Theme.grey_C}`}
                          radius={`5px`}
                          bgColor={Theme.white_C}
                          shadow={`0px 0px 5px ${Theme.grey_C}`}
                          key={index}
                        >
                          <Wrapper
                            dr={`row`}
                            ju={`space-between`}
                            padding={`15px`}
                            onClick={() => tabToggle(info.id)}
                          >
                            <Text fontWeight={`700`} fontSize={`1.3rem`}>
                              보관하기
                            </Text>

                            <Wrapper width={`auto`} cursor={`pointer`}>
                              {tab[info.id] ? <UpOutlined /> : <DownOutlined />}
                            </Wrapper>
                          </Wrapper>

                          {tab[info.id] && (
                            <Wrapper
                              borderTop={`1px solid ${Theme.grey_C}`}
                              padding={`15px`}
                            >
                              <Wrapper dr={`row`} ju={`space-between`}>
                                <Wrapper width={`auto`}>
                                  <Wrapper
                                    width={`10px`}
                                    height={`10px`}
                                    bgColor={
                                      statusData["보관예약"] <=
                                      statusData[info.status]
                                        ? Theme.basicTheme_C
                                        : Theme.grey_C
                                    }
                                    margin={`0 0 5px`}
                                    radius={`50%`}
                                  ></Wrapper>

                                  <Text
                                    color={
                                      statusData["보관예약"] <=
                                      statusData[info.status]
                                        ? Theme.basicTheme_C
                                        : Theme.grey_C
                                    }
                                    fontSize={`0.8rem`}
                                  >
                                    보관예약
                                  </Text>
                                </Wrapper>
                                <Wrapper
                                  width={`15px`}
                                  borderBottom={`1px dashed ${
                                    statusData["보관예약"] <
                                    statusData[info.status]
                                      ? Theme.basicTheme_C
                                      : Theme.grey_C
                                  }`}
                                ></Wrapper>
                                <Wrapper width={`auto`}>
                                  <Wrapper
                                    width={`10px`}
                                    height={`10px`}
                                    bgColor={
                                      statusData["수거중"] <=
                                      statusData[info.status]
                                        ? Theme.basicTheme_C
                                        : Theme.grey_C
                                    }
                                    margin={`0 0 5px`}
                                    radius={`50%`}
                                  ></Wrapper>

                                  <Text
                                    color={
                                      statusData["수거중"] <=
                                      statusData[info.status]
                                        ? Theme.basicTheme_C
                                        : Theme.grey_C
                                    }
                                    fontSize={`0.8rem`}
                                  >
                                    수거중
                                  </Text>
                                </Wrapper>
                                <Wrapper
                                  width={`15px`}
                                  borderBottom={`1px dashed ${
                                    statusData["수거중"] <=
                                    statusData[info.status]
                                      ? Theme.basicTheme_C
                                      : Theme.grey_C
                                  }`}
                                ></Wrapper>
                                <Wrapper width={`auto`}>
                                  <Wrapper
                                    width={`10px`}
                                    height={`10px`}
                                    bgColor={
                                      statusData["센터도착"] <=
                                      statusData[info.status]
                                        ? Theme.basicTheme_C
                                        : Theme.grey_C
                                    }
                                    margin={`0 0 5px`}
                                    radius={`50%`}
                                  ></Wrapper>

                                  <Text
                                    color={
                                      statusData["센터도착"] <=
                                      statusData[info.status]
                                        ? Theme.basicTheme_C
                                        : Theme.grey_C
                                    }
                                    fontSize={`0.8rem`}
                                  >
                                    센터도착
                                  </Text>
                                </Wrapper>
                                <Wrapper
                                  width={`15px`}
                                  borderBottom={`1px dashed ${
                                    statusData["센터도착"] <
                                    statusData[info.status]
                                      ? Theme.basicTheme_C
                                      : Theme.grey_C
                                  }`}
                                ></Wrapper>
                                <Wrapper width={`auto`}>
                                  <Wrapper
                                    width={`10px`}
                                    height={`10px`}
                                    bgColor={
                                      statusData["보관중"] <=
                                      statusData[info.status]
                                        ? Theme.basicTheme_C
                                        : Theme.grey_C
                                    }
                                    margin={`0 0 5px`}
                                    radius={`50%`}
                                  ></Wrapper>

                                  <Text
                                    color={
                                      statusData["보관중"] <=
                                      statusData[info.status]
                                        ? Theme.basicTheme_C
                                        : Theme.grey_C
                                    }
                                    fontSize={`0.8rem`}
                                  >
                                    보관중
                                  </Text>
                                </Wrapper>
                              </Wrapper>

                              <CommonButton
                                radius={`0`}
                                margin={`10px 0`}
                                width={`100%`}
                                fontSize={`0.9rem`}
                              >
                                물건 포장 / 준비 가이드
                              </CommonButton>

                              <Wrapper
                                padding={`0 0 10px`}
                                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                                dr={`row`}
                                ju={`space-between`}
                              >
                                <Text width={`80px`}>보관함</Text>
                                <Text
                                  fontSize={`0.8rem`}
                                  width={`calc(100% - 80px)`}
                                  textAlign={`right`}
                                  isEllipsis={true}
                                  color={Theme.darkGrey2_C}
                                >
                                  {info.KeepBoxes[0].period}보관 -{" "}
                                  {check[0]
                                    ? `${dataArr[0][0]} ${check[0]} `
                                    : ""}
                                  {check[1]
                                    ? `${dataArr[1][0]} ${check[1]} `
                                    : ""}
                                  {check[2]
                                    ? `${dataArr[2][0]} ${check[2]} `
                                    : ""}
                                  {check[3]
                                    ? `${dataArr[3][0]} ${check[3]} `
                                    : ""}
                                </Text>
                              </Wrapper>

                              <Wrapper
                                padding={`10px 0`}
                                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                              >
                                <Wrapper dr={`row`} ju={`space-between`}>
                                  <Text width={`80px`}>픽업 방식</Text>
                                  <Text
                                    fontSize={`0.8rem`}
                                    width={`calc(100% - 80px)`}
                                    textAlign={`right`}
                                    isEllipsis={true}
                                    color={Theme.darkGrey2_C}
                                  >
                                    {info.KeepBoxes[0].pickWay}
                                  </Text>
                                </Wrapper>
                                {/* <Wrapper
                                  al={`flex-end`}
                                  color={Theme.darkGrey2_C}
                                  fontSize={`0.8rem`}
                                >
                                  21년 10월 20일 ~ 21년 10월 22일
                                </Wrapper> */}
                              </Wrapper>

                              <Wrapper
                                padding={`10px 0`}
                                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                              >
                                {info.KeepBoxes[0].isFilming && (
                                  <Wrapper dr={`row`} ju={`space-between`}>
                                    <Text width={`80px`}>선택 서비스</Text>
                                    <Text
                                      fontSize={`0.8rem`}
                                      width={`calc(100% - 80px)`}
                                      textAlign={`right`}
                                      isEllipsis={true}
                                      color={Theme.darkGrey2_C}
                                    >
                                      상자 보관 물건 촬영
                                    </Text>
                                  </Wrapper>
                                )}
                              </Wrapper>

                              <Wrapper
                                padding={`10px 0`}
                                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                              >
                                <Wrapper dr={`row`} ju={`space-between`}>
                                  <Text width={`80px`}>주소</Text>
                                  <Text
                                    fontSize={`0.8rem`}
                                    width={`calc(100% - 80px)`}
                                    textAlign={`right`}
                                    isEllipsis={true}
                                    color={Theme.darkGrey2_C}
                                  >
                                    {info.KeepBoxes[0].address}
                                  </Text>
                                </Wrapper>
                                <Wrapper
                                  al={`flex-end`}
                                  color={Theme.darkGrey2_C}
                                  fontSize={`0.8rem`}
                                >
                                  {info.KeepBoxes[0].detailAddress}
                                </Wrapper>
                              </Wrapper>

                              <Wrapper
                                padding={`10px 0 0`}
                                dr={`row`}
                                ju={`space-between`}
                              >
                                <Text width={`80px`}>쿠폰할인</Text>
                                <Text
                                  width={`calc(100% - 80px)`}
                                  textAlign={`right`}
                                  isEllipsis={true}
                                  color={Theme.black2_C}
                                  fontWeight={`700`}
                                >
                                  0원
                                </Text>
                              </Wrapper>
                            </Wrapper>
                          )}
                        </Wrapper>
                      );
                    })}
                  </Wrapper>
                ))}
              </Wrapper>
            ) : (
              <Wrapper height={`calc(100% - 44px)`} minHeight={`100vh`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/box2.png`}
                  width={`80px`}
                  margin={`0 0 10px`}
                />

                <Text color={Theme.darkGrey_C}>보관중인</Text>
                <Text color={Theme.darkGrey_C}>물품이 없습니다.</Text>

                <CommonButton
                  radius={`20px`}
                  fontWeight={`700`}
                  width={`140px`}
                  height={`40px`}
                  margin={`10px 0 0`}
                  onClick={() => moveLinkHandler(`/iobox`)}
                >
                  보관하기 시작
                </CommonButton>
              </Wrapper>
            )}
          </RsWrapper>
        </Wrapper>
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
