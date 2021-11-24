import React, { useCallback, useState, useEffect } from "react";
import {
  Image,
  Wrapper,
  Text,
  GradientText,
  WholeWrapper,
  RsWrapper,
} from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import { Drawer } from "antd";
import useWidth from "../hooks/useWidth";
import { useRouter } from "next/dist/client/router";
import { Planet } from "react-planet";
import { MenuOutlined } from "@ant-design/icons";

const IconBox = styled(Wrapper)`
  width: ${(props) => props.width || `130px`};
  cursor: pointer;

  ${Image} {
    transition: 0.5s;
    margin: 0 0 5px;
  }

  &:hover ${Image} {
    width: 50px;
  }

  @media (max-width: 700px) {
    width: auto;
  }
`;

const CircleWrapper = styled(Wrapper)`
  cursor: pointer;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 700px) {
    width: 110px;
    height: 110px;
  }
`;

const ButtonWrapper = styled(Wrapper)`
  position: absolute;

  left: 50%;
  cursor: pointer;
  width: auto;
  margin: 0 0 0 -76px;

  &:hover {
    .circle {
      width: 30px;
      height: 30px;
    }
  }

  @media (max-width: 700px) {
    margin: 0 0 0 -60px;
  }
`;

const TextWrapper = styled(Wrapper)`
  width: auto;
  cursor: pointer;
  transition: 0.5s;

  & h2 {
    color: ${Theme.darkGrey_C} !important;
    background: initial;
    -webkit-text-fill-color: initial !important;
    -webkit-background-clip: initial !important;

    transition: 0.5s;
  }

  &:hover h2 {
    background: linear-gradient(
      90deg,
      rgb(249, 2, 80),
      rgb(247, 141, 150),
      rgb(242, 146, 98),
      rgb(241, 115, 80)
    );

    -webkit-text-fill-color: transparent !important;
    -webkit-background-clip: text !important;
  }
`;

const Logo = styled(Image)`
  width: 200px !important;

  @media (max-width: 700px) {
    width: 150px !important;
    margin-top: 10px;
  }
`;

const AppFooter = () => {
  const width = useWidth();
  const router = useRouter();
  ////// HOOKS //////

  const [tab, setTab] = useState(false);

  const [top, setTop] = useState(0);

  const [drawar, setDrawar] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  const tabToggle = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  }, [drawar]);
  ///// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////
  return (
    <>
      <Wrapper
        position={`absolute`}
        bottom={`0`}
        left={width < 700 ? `0` : `50%`}
        margin={width < 700 ? `0` : `0 0 0 -250px`}
        width={width < 700 ? `100%` : `500px`}
        height={tab ? `100vh` : `auto`}
        bgColor={tab ? `rgba(0,0,0,0.8)` : ``}
        zIndex={`1000`}
        overflow={tab ? `hidden` : ``}
      >
        <Wrapper
          width={`auto`}
          al={`flex-start`}
          display={tab ? `flex` : `none`}
          margin={`0 0 150px`}
        >
          <Image
            width={`60px`}
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/circle7.png`}
          />

          <GradientText bold={true} fontSize={`2rem`} margin={`10px 0 0`}>
            종이박스 배송
          </GradientText>

          <Text
            color={Theme.white_C}
            bold={true}
            fontSize={`1.5rem`}
            margin={`15px 0`}
          >
            의류,물건,서류,책
          </Text>
          <Text color={Theme.white_C} bold={true} fontSize={`1.5rem`}>
            각종 내 방안의 짐
          </Text>
          <Text
            color={Theme.white_C}
            bold={true}
            fontSize={`1.5rem`}
            margin={`15px 0 0`}
          >
            원할 때 맡기고 원할 때 찾기
          </Text>
        </Wrapper>

        <Wrapper
          dr={`row`}
          height={`100px`}
          shadow={tab ? `none` : `0px -3px 10px ${Theme.grey_C}`}
        >
          <ButtonWrapper bottom={tab ? `300px` : `150px`} transition={`0.5s`}>
            <GradientText
              className="gradient"
              bold={true}
              opacity={tab ? `0` : `1`}
            >
              내 물건 맡기기
            </GradientText>

            <Wrapper margin={`0 0 0 -100px`} transition={`0.5s`} zIndex={`100`}>
              <Planet
                tension={200}
                centerContent={
                  <Wrapper
                    width={`100px`}
                    height={`100px`}
                    radius={`50%`}
                    bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
                  >
                    <Wrapper
                      width={`45px`}
                      height={`45px`}
                      radius={`50%`}
                      bgColor={Theme.white_C}
                      className="circle"
                    ></Wrapper>
                  </Wrapper>
                }
                bounce={false}
                friction={0}
                orbitStyle={(defaultStyle) => ({
                  ...defaultStyle,
                  borderWidth: 0,
                  background: "rgba(255,255,255,0.8)",
                })}
                open={tab}
                onClick={tabToggle}
                autoClose
                orbitRadius={width < 700 ? 170 : 200}
                rotation={-30}
              >
                <IconBox
                  display={tab ? `flex` : `none`}
                  margin={`-70px 0 0`}
                  width={width < 700 ? `100px !important` : `130px`}
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=tentBox`);
                  }}
                >
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `60px` : `70px`}
                  />
                  <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                    텐트보관 박스
                  </Text>
                </IconBox>

                <IconBox
                  display={tab ? `flex` : `none`}
                  margin={`-30px 0 0 100px`}
                  onClick={() => {
                    moveLinkHandler("/bullet");
                  }}
                >
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/bullet_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `60px` : `70px`}
                  />
                  <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                    총알배송
                  </Text>
                </IconBox>

                <IconBox
                  display={tab ? `flex` : `none`}
                  margin={`50px 0 0 100px`}
                  onClick={() => {
                    moveLinkHandler(`/locker`);
                  }}
                >
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/truck_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `40px` : `50px`}
                  />
                  <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                    배송현황
                  </Text>
                </IconBox>

                <IconBox
                  display={tab ? `flex` : `none`}
                  margin={`70px 0 0`}
                  width={width < 700 ? `100px !important` : `130px`}
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=iobox`);
                  }}
                >
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/iobox_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `40px` : `50px`}
                  />
                  <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                    아이오 박스
                  </Text>
                </IconBox>

                <IconBox
                  display={tab ? `flex` : `none`}
                  margin={width < 700 ? `50px 0 0 -80px` : `50px 100px 0 0`}
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=hangerBox`);
                  }}
                >
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/hagner_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `40px` : `50px`}
                  />
                  <Text fontSize={width < 700 ? `0.8rem` : `1rem`}>
                    행거박스
                  </Text>
                </IconBox>

                <IconBox
                  display={tab ? `flex` : `none`}
                  margin={width < 700 ? `-30px 0 0 -80px` : `-30px 100px 0 0`}
                >
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/large_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `40px` : `50px`}
                  />
                  <Text
                    fontSize={width < 700 ? `0.8rem` : `1rem`}
                    onClick={() => {
                      moveLinkHandler(`/iobox?type=bigBox`);
                    }}
                  >
                    대용량 박스
                  </Text>
                </IconBox>
              </Planet>
            </Wrapper>
          </ButtonWrapper>

          <Wrapper
            dr={`row`}
            ju={`space-around`}
            display={tab ? `none` : `flex`}
          >
            <TextWrapper width={`auto`} onClick={drawarToggle}>
              <MenuOutlined
                style={{
                  fontSize: `30px`,
                  margin: `0 0 5px`,
                  color: `rgb(224,222,222)`,
                }}
              />

              <GradientText fontSize={`0.8rem`} bold={true} padding={`0`}>
                메 뉴
              </GradientText>
            </TextWrapper>
            <TextWrapper
              width={`auto`}
              onClick={() => {
                moveLinkHandler("/locker");
              }}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/grey_box.png`}
                alt={`menuIcon`}
                width={`30px`}
                margin={`0 0 5px`}
              />
              <GradientText fontSize={`0.8rem`} bold={true} padding={`0`}>
                내 보관함
              </GradientText>
            </TextWrapper>
          </Wrapper>

          {drawar && (
            <Drawer
              placement="left"
              closable={true}
              onClose={drawarToggle}
              // visible={drawarToggle}
              visible={true}
              getContainer={false}
            >
              <Image
                src={`https://via.placeholder.com/100x100`}
                margin={width < 1350 ? `30px 0 60px 40px` : `50px 0 60px 40px`}
                width={width < 1350 ? `80px` : `100px`}
                alt={`logo`}
              />
              <Wrapper
                height={
                  width < 1350 ? `calc(100vh - 170px)` : `calc(100vh - 210px)`
                }
                ju={`space-between`}
              >
                <RsWrapper
                  ju={`flex-start`}
                  al={`flex-start`}
                  height={width < 700 ? `100px` : `auto`}
                >
                  <Wrapper ju={`flex-start`} al={`flex-start`}>
                    <Wrapper al={`flex-start`}>
                      <Text
                        fontSize={
                          width < 1350
                            ? width < 700
                              ? `1rem`
                              : `1.2rem`
                            : `1.4rem`
                        }
                        margin={
                          width < 1350
                            ? width < 700
                              ? `0 0 20px 0`
                              : `0 0 25px`
                            : `0 0 35px`
                        }
                      >
                        아이오 박스란?
                      </Text>
                    </Wrapper>
                    <Wrapper al={`flex-start`}>
                      <Text
                        fontSize={
                          width < 1350
                            ? width < 700
                              ? `1rem`
                              : `1.2rem`
                            : `1.4rem`
                        }
                        margin={
                          width < 1350
                            ? width < 700
                              ? `0 0 20px 0`
                              : `0 0 25px`
                            : `0 0 35px`
                        }
                      >
                        서비스 이용방법
                      </Text>
                    </Wrapper>
                    <Wrapper al={`flex-start`}>
                      <Text
                        fontSize={
                          width < 1350
                            ? width < 700
                              ? `1rem`
                              : `1.2rem`
                            : `1.4rem`
                        }
                        margin={
                          width < 1350
                            ? width < 700
                              ? `0 0 20px 0`
                              : `0 0 25px`
                            : `0 0 35px`
                        }
                      >
                        서비스 이용료
                      </Text>
                    </Wrapper>
                    <Wrapper al={`flex-start`}>
                      <Text
                        fontSize={
                          width < 1350
                            ? width < 700
                              ? `1rem`
                              : `1.2rem`
                            : `1.4rem`
                        }
                        margin={
                          width < 1350
                            ? width < 700
                              ? `0 0 20px 0`
                              : `0 0 25px`
                            : `0 0 35px`
                        }
                        // onClick={() => moveLinkHandler(``)}
                      >
                        IO박스 보관센터
                      </Text>
                    </Wrapper>
                    <Wrapper al={`flex-start`}>
                      <Text
                        fontSize={
                          width < 1350
                            ? width < 700
                              ? `1rem`
                              : `1.2rem`
                            : `1.4rem`
                        }
                        margin={
                          width < 1350
                            ? width < 700
                              ? `0 0 20px 0`
                              : `0 0 25px`
                            : `0 0 35px`
                        }
                        onClick={() => {
                          moveLinkHandler(`/locker`);
                        }}
                      >
                        배송현황
                      </Text>
                    </Wrapper>
                    <Wrapper al={`flex-start`}>
                      <Text
                        fontSize={
                          width < 1350
                            ? width < 700
                              ? `1rem`
                              : `1.2rem`
                            : `1.4rem`
                        }
                        margin={width < 700 ? `0 0 20px 0` : `0`}
                      >
                        내 물건 찾기
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </RsWrapper>

                <Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Wrapper
                      padding={`0 30px`}
                      dr={`row`}
                      ju={`space-between`}
                      height={width < 700 ? `50px` : `70px`}
                      margin={`0 0 5px`}
                      bgColor={Theme.lightGrey_C}
                      cursor={`pointer`}
                      onClick={() => moveLinkHandler(`/center/event`)}
                    >
                      <Text>io박스 이벤트 보기</Text>
                      <Image
                        width={width < 700 ? `30px` : `40px`}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/event.png`}
                        alt={`event_image`}
                      />
                    </Wrapper>
                    <Wrapper
                      padding={`0 30px`}
                      dr={`row`}
                      ju={`space-between`}
                      height={width < 700 ? `50px` : `70px`}
                      margin={`0 0 5px`}
                      bgColor={Theme.lightGrey_C}
                      onClick={() => moveLinkHandler(`/calculate`)}
                      cursor={`pointer`}
                    >
                      <Text>1초만에 보관료 계산하기</Text>
                      <Image
                        width={width < 700 ? `30px` : `40px`}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/calculator.png`}
                        alt={`calculate_image`}
                      />
                    </Wrapper>
                    <Wrapper
                      padding={`0 30px`}
                      dr={`row`}
                      ju={`space-between`}
                      height={width < 700 ? `50px` : `70px`}
                      margin={`0 0 5px`}
                      bgColor={Theme.lightGrey_C}
                      cursor={`pointer`}
                    >
                      <Text>실시간 카톡문의</Text>
                      <Image
                        width={width < 700 ? `30px` : `40px`}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/kakao.png`}
                        alt={`kakao_image`}
                      />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} ju={`flex-end`} padding={`10px`}>
                    {/* 로그인 안되있을 때 */}
                    <Text
                      cursor={`pointer`}
                      display={`flex`}
                      margin={`0 10px 0 0`}
                      onClick={() => moveLinkHandler(`/login`)}
                    >
                      로그인
                    </Text>

                    {/* 로그인 되어 있을 때 */}
                    {/* <Text
                        cursor={`pointer`}
                        margin={`0 10px 0 0`}
                        onClick={() => moveLinkHandler(`/myInfo`)}
                      >
                        내 정보
                      </Text>
                      <Text cursor={`pointer`} margin={`0 10px 0 0`}>
                        로그아웃
                      </Text> */}

                    {/* 공통 */}
                    <Text
                      cursor={`pointer`}
                      onClick={() => moveLinkHandler(`/center`)}
                    >
                      고객센터
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Drawer>
          )}
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default AppFooter;
