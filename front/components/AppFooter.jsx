import React, { useCallback, useState, useEffect } from "react";
import {
  Image,
  Wrapper,
  Text,
  GradientText,
  WholeWrapper,
  RsWrapper,
  IoBoxWrapper,
} from "./commonComponents";
import Theme from "./Theme";
import styled, { ThemeContext } from "styled-components";
import { Drawer, notification } from "antd";
import useWidth from "../hooks/useWidth";
import { useRouter } from "next/dist/client/router";
import { Planet } from "react-planet";
import { MenuOutlined } from "@ant-design/icons";
import { LOAD_MY_INFO_REQUEST, LOGOUT_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Footer from "./Footer";

import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import MenuSlider from "./slide/MenuSlider";
import { scaleAnimation } from "./AnimationCommon";

const BoxWrapper = styled(Wrapper)`
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  margin: 0 0 5px;
  background: ${Theme.lightGrey_C};
  cursor: pointer;
  &:hover {
    background: ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  }
  @media (max-width: 700px) {
    height: 50px;
  }
`;

const TextHover = styled(Text)`
  font-size: 1.4rem;
  margin: 0 0 15px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${Theme.basicTheme_C};
    transition: 0.5s;
  }

  &:hover {
    font-weight: 700;
    &:before {
      width: 100%;
    }
  }

  @media (max-width: 1350px) {
    font-size: 1.2rem;
    margin: 0 0 25px;
  }

  @media (max-width: 700px) {
    font-size: 1rem;
    margin: 0 0 20px;
  }
`;

const IconBox = styled(Wrapper)`
  width: 130px;
  height: 130px;
  cursor: pointer;
  position: absolute;

  border-radius: 50%;

  ${Image} {
    transition: 0.5s;
    margin: 0 0 5px;
  }

  &:hover ${Image} {
    transform: scale(1.2);
  }

  @media (max-width: 700px) {
    width: 105px;
    height: 105px;
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
  bottom: 50px;
  cursor: pointer;
  width: auto;
  margin: 0 0 0 -65px;

  &:hover {
    .circle2 {
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

  .hoverIcon {
    display: none;
  }

  &:hover {
    .noHoverIcon {
      display: none;
    }

    .hoverIcon {
      display: flex;
    }

    h2 {
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
  }
`;

const Logo = styled(Image)`
  width: 200px !important;

  @media (max-width: 700px) {
    width: 150px !important;
    margin-top: 10px;
  }
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const AppFooter = () => {
  const width = useWidth();
  const router = useRouter();
  const Vue = router.Vue;

  ////// HOOKS //////

  const [tab, setTab] = useState(false);

  const [top, setTop] = useState(0);

  const [drawar, setDrawar] = useState(false);

  const { me, st_logoutDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [rotate, setRotate] = useState(0);
  const [currentMenu, setCurrentMenu] = useState(0);

  const ImageBox = styled(Image)`
    &.active {
      animation: ${scaleAnimation} 1.5s infinite;
    }
  `;

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {
    setDrawar(false);
  }, [router.asPath]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_logoutDone) {
      LoadNotification;

      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      router.push("/");

      return LoadNotification("LOGOUT SUCCESS", "로그아웃 되었습니다.");
    }
  }, [st_logoutDone]);

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

  const logoutHandler = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);

  ////// DATAVIEW //////
  if (!width) {
    return null;
  }

  const menuDatum = [
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png",
      "종이박스 배송",
      "의류,물건,서류,책",
      "각종 내 방안의 짐",
      "원할때 맡기고 원할때 찾기",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png",
      "22 배송",
      "의류,물건,서류,책",
      "각종 내 방안의 짐",
      "원할때 맡기고 원할때 찾기",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png",
      "33 배송",
      "의류,물건,서류,책",
      "각종 내 방안의 짐",
      "원할때 맡기고 원할때 찾기",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png",
      "44 배송",
      "의류,물건,서류,책",
      "각종 내 방안의 짐",
      "원할때 맡기고 원할때 찾기",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png",
      "55 배송",
      "의류,물건,서류,책",
      "각종 내 방안의 짐",
      "원할때 맡기고 원할때 찾기",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png",
      "66 배송",
      "의류,물건,서류,책",
      "각종 내 방안의 짐",
      "원할때 맡기고 원할때 찾기",
    ],
  ];

  return (
    <>
      <Wrapper
        bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}
        zIndex={`1000`}
      >
        <IoBoxWrapper
          height={tab ? `100vh` : `auto`}
          position={tab ? `fixed` : `relative`}
          top={`0`}
          zIndex={`1000`}
          bgColor={tab ? `rgba(0,0,0,0.8)` : Theme.white_C}
          overflow={tab ? `hidden` : ``}
          ju={`flex-end`}
          padding={tab ? `0` : `15px 0`}
        >
          <Wrapper
            height={`50%`}
            ju={screen.height / 2 < 390 ? `flex-start` : `flex-end`}
            padding={
              width < 700
                ? screen.height / 2 < 390
                  ? `10px 0 0`
                  : `0 0 20px`
                : `0 0 50px`
            }
            display={tab ? `flex` : `none`}
          >
            {tab && (
              <MenuSlider
                datum={menuDatum}
                tab={tab}
                setCurrentMenu={setCurrentMenu}
                currentMenu={currentMenu}
              />
            )}
          </Wrapper>

          <Wrapper position={tab ? `relative` : ``} height={`50%`}>
            {/* 안 나타났을 때 */}
            <ButtonWrapper display={tab ? `none` : `flex`}>
              <GradientText
                className="gradient"
                fontWeight={`900`}
                padding={`0`}
              >
                내 물건 맡기기
              </GradientText>

              <Wrapper
                width={tab ? (width < 700 ? `120px` : `130px`) : `100px`}
                height={tab ? (width < 700 ? `120px` : `130px`) : `100px`}
                radius={`50%`}
                onClick={tabToggle}
                zIndex={`1000`}
                bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
              >
                <Wrapper
                  width={tab ? (width < 700 ? `50px` : `60px`) : `45px`}
                  height={tab ? (width < 700 ? `50px` : `60px`) : `45px`}
                  radius={`50%`}
                  bgColor={tab ? `rgba(255,255,255,0.5)` : Theme.white_C}
                  className="circle"
                ></Wrapper>
              </Wrapper>
            </ButtonWrapper>

            {/* 나타났을때 (tab) */}
            <Wrapper
              width={
                tab
                  ? width < 700
                    ? screen.height / 2 < 390
                      ? `360px`
                      : `390px`
                    : `510px`
                  : `auto`
              }
              height={
                tab
                  ? width < 700
                    ? screen.height / 2 < 390
                      ? `360px`
                      : `390px`
                    : `510px`
                  : `auto`
              }
              bgColor={`rgba(255,255,255,0.6)`}
              position={`absolute`}
              bottom={`-10px`}
              left={`50%`}
              margin={
                width < 700
                  ? screen.height / 2 < 390
                    ? `0 0 0 -180px`
                    : `0 0 0 -195px`
                  : `0 0 0 -255px`
              }
              radius={`50%`}
              display={tab ? `flex` : `none`}
            >
              <Wrapper position={`relative`} height={`100%`}>
                <IconBox
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=iobox`);
                  }}
                  top={screen.height / 2 < 390 ? `20px` : `25px`}
                  left={`50%`}
                  margin={width < 700 ? `0 0 0 -52.5px` : `0 0 0 -65px`}
                >
                  <ImageBox
                    className={String(currentMenu) === "0" ? "active" : ""}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/iobox_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `50px` : `60px`}
                  />
                  <Text fontSize={width < 700 ? `1.1rem` : `1.3rem`}>
                    아이오 박스
                  </Text>
                </IconBox>

                <IconBox
                  onClick={() => {
                    moveLinkHandler(`/locker`);
                  }}
                  top={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `70px`
                        : `90px`
                      : `110px`
                  }
                  left={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `25px`
                        : `30px`
                      : `50px`
                  }
                >
                  <ImageBox
                    className={String(currentMenu) === "5" ? "active" : ""}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/truck_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `50px` : `60px`}
                  />
                  <Text fontSize={width < 700 ? `1.1rem` : `1.3rem`}>
                    배송현황
                  </Text>
                </IconBox>

                <IconBox
                  top={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `70px`
                        : `90px`
                      : `110px`
                  }
                  right={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `25px`
                        : `30px`
                      : `50px`
                  }
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=hangerBox`);
                  }}
                >
                  <ImageBox
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/hagner_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `40px` : `50px`}
                    className={String(currentMenu) === "1" ? "active" : ""}
                  />
                  <Text fontSize={width < 700 ? `1.1rem` : `1.3rem`}>
                    행거박스
                  </Text>
                </IconBox>

                <IconBox
                  bottom={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `80px`
                        : `90px`
                      : `110px`
                  }
                  left={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `25px`
                        : `30px`
                      : `50px`
                  }
                  onClick={() => {
                    moveLinkHandler("/bullet");
                  }}
                >
                  <ImageBox
                    className={String(currentMenu) === "4" ? "active" : ""}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/bullet_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `60px` : `70px`}
                  />
                  <Text fontSize={width < 700 ? `1.1rem` : `1.3rem`}>
                    총알배송
                  </Text>
                </IconBox>

                <IconBox
                  bottom={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `80px`
                        : `90px`
                      : `110px`
                  }
                  right={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `25px`
                        : `30px`
                      : `50px`
                  }
                >
                  <ImageBox
                    className={String(currentMenu) === "2" ? "active" : ""}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/large_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `40px` : `50px`}
                  />
                  <Text
                    fontSize={width < 700 ? `1.1rem` : `1.3rem`}
                    onClick={() => {
                      moveLinkHandler(`/iobox?type=bigBox`);
                    }}
                  >
                    대용량 박스
                  </Text>
                </IconBox>

                <IconBox
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=tentBox`);
                  }}
                  bottom={screen.height / 2 < 390 ? `20px` : `25px`}
                  left={`50%`}
                  margin={width < 700 ? `0 0 0 -52.5px` : `0 0 0 -65px`}
                >
                  <ImageBox
                    className={String(currentMenu) === "3" ? "active" : ""}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                    alt={`icon`}
                    width={width < 700 ? `60px` : `70px`}
                  />
                  <Text fontSize={width < 700 ? `1.1rem` : `1.3rem`}>
                    텐트보관 박스
                  </Text>
                </IconBox>

                <Wrapper
                  width={tab ? (width < 700 ? `120px` : `140px`) : `100px`}
                  height={tab ? (width < 700 ? `120px` : `140px`) : `100px`}
                  radius={`50%`}
                  onClick={tabToggle}
                  zIndex={`1000`}
                  cursor={`pointer`}
                  bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
                >
                  <Wrapper
                    width={tab ? `50px` : `45px`}
                    height={tab ? `50px` : `45px`}
                    radius={`50%`}
                    bgColor={tab ? `rgba(255,255,255,0.5)` : Theme.white_C}
                    className="circle"
                  ></Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`space-around`}
            display={tab ? `none` : `flex`}
          >
            <TextWrapper width={`auto`} onClick={drawarToggle}>
              <Wrapper
                fontSize={`30px`}
                width={`auto`}
                margin={`0 0 5px`}
                color={`rgb(224,222,222)`}
                height={`35px`}
                className="noHoverIcon"
              >
                <MenuOutlined />
              </Wrapper>

              <Image
                margin={`0 0 5px`}
                height={`35px`}
                width={`30px`}
                objectFit={`contain`}
                className="hoverIcon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/menu_gra.png`}
              />

              <GradientText fontSize={`0.8rem`} padding={`0`}>
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
                className="noHoverIcon"
                height={`30px`}
                width={`auto`}
                margin={`0 0 11px`}
              />
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/iobox_dial.png`}
                alt={`menuIcon`}
                className="hoverIcon"
                height={`30px`}
                width={`auto`}
                margin={`0 0 11px`}
              />
              <GradientText fontSize={`0.8rem`} padding={`0`}>
                내 보관함
              </GradientText>
            </TextWrapper>
          </Wrapper>
        </IoBoxWrapper>

        {drawar && (
          <Drawer
            placement="left"
            closable={true}
            onClose={drawarToggle}
            visible={true}
            getContainer={false}
          >
            <Wrapper
              height={`100vh !important`}
              ju={`space-between`}
              overflowX={`hidden`}
            >
              <RsWrapper
                al={`flex-start`}
                height={`auto`}
                margin={width < 700 ? `50px 0 0` : `20px 0 0`}
              >
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_BOX.png`}
                  width={width < 1350 ? `80px` : `100px`}
                  alt={`logo`}
                  margin={`0 0 20px`}
                />

                <Wrapper ju={`flex-start`} al={`flex-start`}>
                  <Wrapper al={`flex-start`}>
                    <TextHover
                      onClick={() => {
                        moveLinkHandler("/guide?type=iobox");
                      }}
                    >
                      아이오 박스란?
                    </TextHover>
                  </Wrapper>

                  <Wrapper al={`flex-start`}>
                    <TextHover
                      onClick={() => {
                        moveLinkHandler("/guide?type=way");
                      }}
                    >
                      서비스 이용방법
                    </TextHover>
                  </Wrapper>

                  <Wrapper al={`flex-start`}>
                    <TextHover
                      onClick={() => {
                        moveLinkHandler("/guide?type=pay");
                      }}
                    >
                      서비스 이용료
                    </TextHover>
                  </Wrapper>

                  <Wrapper al={`flex-start`}>
                    <TextHover
                      onClick={() => {
                        moveLinkHandler("/guide?type=center");
                      }}
                    >
                      IO박스 보관센터
                    </TextHover>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <TextHover
                      onClick={() => {
                        moveLinkHandler(`/locker`);
                      }}
                    >
                      배송현황
                    </TextHover>
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <TextHover
                      onClick={() => {
                        moveLinkHandler(`/locker/mylocker`);
                      }}
                    >
                      내 물건 찾기
                    </TextHover>
                  </Wrapper>
                </Wrapper>
              </RsWrapper>

              <Wrapper>
                <Wrapper al={`flex-start`}>
                  <BoxWrapper onClick={() => moveLinkHandler(`/center/event`)}>
                    <Text>io박스 이벤트 보기</Text>
                    <Image
                      width={width < 700 ? `30px` : `40px`}
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/event.png`}
                      alt={`event_image`}
                    />
                  </BoxWrapper>
                  <BoxWrapper onClick={() => moveLinkHandler(`/calculate`)}>
                    <Text>1초만에 보관료 계산하기</Text>
                    <Image
                      width={width < 700 ? `30px` : `40px`}
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/calculator.png`}
                      alt={`calculate_image`}
                    />
                  </BoxWrapper>
                  <BoxWrapper>
                    <Text>실시간 카톡문의</Text>
                    <Image
                      width={width < 700 ? `30px` : `40px`}
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/sidemenu/kakao.png`}
                      alt={`kakao_image`}
                    />
                  </BoxWrapper>
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-end`} padding={`10px`}>
                  {!me ? (
                    <Text
                      cursor={`pointer`}
                      display={`flex`}
                      margin={`0 10px 0 0`}
                      onClick={() => moveLinkHandler(`/login`)}
                    >
                      로그인
                    </Text>
                  ) : (
                    <>
                      <Text
                        cursor={`pointer`}
                        margin={`0 10px 0 0`}
                        onClick={() => moveLinkHandler(`/myInfo`)}
                      >
                        내 정보
                      </Text>
                      <Text
                        onClick={logoutHandler}
                        cursor={`pointer`}
                        margin={`0 10px 0 0`}
                      >
                        로그아웃
                      </Text>
                    </>
                  )}

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
        <Wrapper display={tab ? `none` : `flex`}>
          <Footer />
        </Wrapper>
      </Wrapper>

      {/* <Wrapper
        bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}
        zIndex={`1000`}
      >
        <Wrapper
          position={tab ? `fixed` : ``}
          top={`0`}
          zIndex={`1000`}
          width={width < 700 ? `100%` : `500px`}
          height={tab ? `100vh` : `auto`}
          bgColor={tab ? `rgba(0,0,0,0.8)` : Theme.white_C}
          overflow={tab ? `hidden` : ``}
          ju={`flex-end`}
        >
     

          <Wrapper
            dr={`row`}
            height={tab ? `50%` : `100px`}
            shadow={tab ? `none` : `0px -3px 10px ${Theme.grey_C}`}
            position={`relative`}
          >
            <ButtonWrapper bottom={tab ? `0` : `50px`} transition={`0.5s`}>
              <GradientText
                className="gradient"
                fontWeight={`900`}
                opacity={tab ? `0` : `1`}
                padding={`0`}
              >
                내 물건 맡기기
              </GradientText>

              <Wrapper
                position={`absolute`}
                top={`50%`}
                left={`50%`}
                margin={`-185px 0 0 -185px`}
                width={`370px`}
                height={`370px`}
                bgColor={`rgba(255,255,255,0.5)`}
                radius={`50%`}
              >
                <Wrapper
                  width={tab ? (width < 700 ? `120px` : `130px`) : `100px`}
                  height={tab ? (width < 700 ? `120px` : `130px`) : `100px`}
                  radius={`50%`}
                  onClick={tabToggle}
                  bgColor={`linear-gradient(90deg,rgb(249, 2, 80),rgb(247, 141, 150),rgb(242, 146, 98),rgb(241, 115, 80))`}
                >
                  <Wrapper
                    width={tab ? (width < 700 ? `50px` : `60px`) : `45px`}
                    height={tab ? (width < 700 ? `50px` : `60px`) : `45px`}
                    radius={`50%`}
                    bgColor={tab ? `rgba(255,255,255,0.5)` : Theme.white_C}
                    className="circle"
                  ></Wrapper>
                </Wrapper>
              </Wrapper>
            </ButtonWrapper>

       

          
          </Wrapper>
        </Wrapper>
      </Wrapper> */}
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

export default AppFooter;
