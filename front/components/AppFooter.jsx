import React, { useCallback, useState } from "react";
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

const IconBox = styled(Wrapper)`
  width: 200px;
  cursor: pointer;

  ${Image} {
    transition: 0.5s;
    margin: 0 0 5px;
  }

  &:hover ${Image} {
    width: 50px;
  }

  @media (max-width: 700px) {
    width: 130px;
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
  top: -300px;
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

  const [drawar, setDrawar] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE ///////

  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  });
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
      >
        <Wrapper
          dr={`row`}
          height={`100px`}
          shadow={`0px -3px 10px ${Theme.grey_C}`}
          position={`relative`}
        >
          <ButtonWrapper>
            <GradientText className="gradient" bold={true}>
              내 물건 맡기기
            </GradientText>

            <Planet
              orbitStyle={(defaultStyle) => ({
                ...defaultStyle,
                border: "none",
                background: "rgba(255,255,255,0.7)",
                zIndex: "10",
              })}
              centerContent={
                <>
                  <Wrapper
                    width={`100px`}
                    height={`100px`}
                    radius={`50%`}
                    zIndex={`1000`}
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
                </>
              }
              open
              autoClose
            >
              <Wrapper
                style={{
                  height: 70,
                  width: 70,
                }}
              ></Wrapper>
              <Wrapper
                style={{
                  height: 70,
                  width: 70,
                }}
              ></Wrapper>
            </Planet>

            {/* <Planet
              open
              autoClose
              centerContent={
  
              }
            ></Planet> */}
          </ButtonWrapper>

          <Wrapper dr={`row`} ju={`space-around`}>
            <TextWrapper width={`auto`} onClick={drawarToggle}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/menu_home.png`}
                alt={`menuIcon`}
                width={`30px`}
                margin={`0 0 5px`}
              />

              <GradientText fontSize={`0.8rem`} bold={true} padding={`0`}>
                메 뉴
              </GradientText>
            </TextWrapper>
            <TextWrapper width={`auto`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/menu_box.png`}
                alt={`menuIcon`}
                width={`30px`}
                margin={`0 0 5px`}
              />
              <GradientText
                fontSize={`0.8rem`}
                bold={true}
                padding={`0`}
                onClick={() => {
                  moveLinkHandler("/locker");
                }}
              >
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

                <Wrapper height={`calc()`}>
                  <Wrapper al={`flex-start`}>
                    <Wrapper
                      padding={`0 30px`}
                      dr={`row`}
                      ju={`space-between`}
                      height={width < 700 ? `50px` : `70px`}
                      margin={`0 0 5px`}
                      bgColor={Theme.lightGrey_C}
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
                    {/* { !asdf && */}
                    <Text display={`flex`} margin={`0 10px 0 0`}>
                      로그인
                    </Text>
                    {/* } */}
                    <Text>고객센터</Text>
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
