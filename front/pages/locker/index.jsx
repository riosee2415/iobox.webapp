import React, { useCallback, useState } from "react";
import Theme from "../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

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

  ////// DATAVIEW //////
  return (
    <WholeWrapper
      height={`100vh`}
      bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}
    >
      <Wrapper
        width={width < 700 ? `100%` : `500px`}
        height={`100%`}
        shadow={`0px 0px 10px ${Theme.grey_C}`}
        bgColor={Theme.white_C}
        overflowY={`scroll`}
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
        <Wrapper>
          <RsWrapper
            ju={`flex-start`}
            position={`relative`}
            al={`flex-start`}
            padding={`30px 0`}
            bgColor={Theme.white_C}
          >
            <Text fontSize={`2rem`} bold={true}>
              내 보관함
            </Text>
            {/* 아무것도 없을 때 */}
            {/* <Wrapper height={`calc(100% - 44px)`}>
            <Image src={`#`} width={`auto`} margin={`0 0 10px`} />

            <Text color={Theme.darkGrey_C}>보관중인</Text>
            <Text color={Theme.darkGrey_C}>물품이 없습니다.</Text>

            <CommonButton
              radius={`20px`}
              fontWeight={`700`}
              width={`140px`}
              height={`40px`}
              margin={`10px 0 0`}
            >
              보관하기 시작
            </CommonButton>
          </Wrapper> */}

            <Wrapper ju={`flex-start`}>
              <Wrapper
                ju={`space-between`}
                dr={`row`}
                margin={`10px 0 0`}
                padding={`0 0 10px`}
                borderBottom={`1px solid ${Theme.grey_C}`}
              >
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text fontWeight={`700`} fontSize={`1.2rem`}>
                    고객번호
                  </Text>
                  <Text>05466</Text>
                </Wrapper>

                <CommonButton radius={`30px`} width={`120px`} height={`40px`}>
                  내 보관함
                </CommonButton>
              </Wrapper>

              <Wrapper al={`flex-start`} padding={`30px 0 0`}>
                <Text margin={`0 0 10px`} color={Theme.darkGrey_C}>
                  21년 10월 14일
                </Text>

                <Wrapper
                  margin={`0 0 10px`}
                  border={`1px solid ${Theme.grey_C}`}
                  radius={`5px`}
                  bgColor={Theme.white_C}
                  shadow={`0px 0px 5px ${Theme.grey_C}`}
                >
                  <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                    <Text fontWeight={`700`} fontSize={`1.3rem`}>
                      보관하기
                    </Text>

                    <Wrapper
                      width={`auto`}
                      onClick={tabToggle}
                      cursor={`pointer`}
                    >
                      {tab ? <UpOutlined /> : <DownOutlined />}
                    </Wrapper>
                  </Wrapper>

                  {tab && (
                    <Wrapper
                      borderTop={`1px solid ${Theme.grey_C}`}
                      padding={`15px`}
                    >
                      <Wrapper dr={`row`} ju={`space-between`}>
                        <Wrapper width={`auto`}>
                          <Wrapper
                            width={`10px`}
                            height={`10px`}
                            bgColor={Theme.basicTheme_C}
                            margin={`0 0 5px`}
                            radius={`50%`}
                          ></Wrapper>

                          <Text color={Theme.basicTheme_C} fontSize={`0.8rem`}>
                            보관예약
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={`15px`}
                          borderBottom={`1px dashed ${Theme.basicTheme_C}`}
                        ></Wrapper>
                        <Wrapper width={`auto`}>
                          <Wrapper
                            width={`10px`}
                            height={`10px`}
                            bgColor={Theme.basicTheme_C}
                            margin={`0 0 5px`}
                            radius={`50%`}
                          ></Wrapper>

                          <Text color={Theme.basicTheme_C} fontSize={`0.8rem`}>
                            수거중
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={`15px`}
                          borderBottom={`1px dashed ${Theme.grey_C}`}
                        ></Wrapper>
                        <Wrapper width={`auto`}>
                          <Wrapper
                            width={`10px`}
                            height={`10px`}
                            bgColor={Theme.grey_C}
                            margin={`0 0 5px`}
                            radius={`50%`}
                          ></Wrapper>

                          <Text color={Theme.grey_C} fontSize={`0.8rem`}>
                            센터도착
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={`15px`}
                          borderBottom={`1px dashed ${Theme.grey_C}`}
                        ></Wrapper>
                        <Wrapper width={`auto`}>
                          <Wrapper
                            width={`10px`}
                            height={`10px`}
                            bgColor={Theme.grey_C}
                            margin={`0 0 5px`}
                            radius={`50%`}
                          ></Wrapper>

                          <Text color={Theme.grey_C} fontSize={`0.8rem`}>
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
                          단기보관 - 상자 1 행거 1
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
                            방문택배
                          </Text>
                        </Wrapper>
                        <Wrapper
                          al={`flex-end`}
                          color={Theme.darkGrey2_C}
                          fontSize={`0.8rem`}
                        >
                          21년 10월 20일 ~ 21년 10월 22일
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        padding={`10px 0`}
                        borderBottom={`1px solid ${Theme.lightGrey_C}`}
                      >
                        <Wrapper dr={`row`} ju={`space-between`}>
                          <Text width={`80px`}>선택 서비스</Text>
                          <Text
                            fontSize={`0.8rem`}
                            width={`calc(100% - 80px)`}
                            textAlign={`right`}
                            isEllipsis={true}
                            color={Theme.darkGrey2_C}
                          >
                            행거 보관 물건 촬영
                          </Text>
                        </Wrapper>
                        <Wrapper
                          al={`flex-end`}
                          color={Theme.darkGrey2_C}
                          fontSize={`0.8rem`}
                        >
                          상자 보관 물건 촬영
                        </Wrapper>
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
                            경기 의정부시
                          </Text>
                        </Wrapper>
                        <Wrapper
                          al={`flex-end`}
                          color={Theme.darkGrey2_C}
                          fontSize={`0.8rem`}
                        >
                          오목로 205번길 1
                        </Wrapper>
                        <Wrapper
                          al={`flex-end`}
                          color={Theme.darkGrey2_C}
                          fontSize={`0.8rem`}
                        >
                          (민락동) 예스타워 6층
                        </Wrapper>
                        <Wrapper
                          al={`flex-end`}
                          color={Theme.darkGrey2_C}
                          fontSize={`0.8rem`}
                        >
                          이본홀딩스 (정성본사)
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
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                margin={`10px 0 0`}
                padding={`30px 0 0`}
                borderTop={`1px solid ${Theme.grey_C}`}
              >
                <Text margin={`0 0 10px`} color={Theme.darkGrey_C}>
                  21년 10월 10일
                </Text>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                margin={`10px 0 0`}
                padding={`30px 0 0`}
                borderTop={`1px solid ${Theme.grey_C}`}
              >
                <Text margin={`0 0 10px`} color={Theme.darkGrey_C}>
                  21년 10월 8일
                </Text>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                margin={`0 0 10px`}
                border={`1px solid ${Theme.grey_C}`}
                radius={`5px`}
                bgColor={Theme.white_C}
                shadow={`0px 0px 5px ${Theme.grey_C}`}
              >
                <Wrapper dr={`row`} ju={`space-between`} padding={`15px`}>
                  <Text fontWeight={`700`} fontSize={`1.3rem`}>
                    보관하기
                  </Text>

                  <Wrapper width={`auto`} cursor={`pointer`}>
                    <DownOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
