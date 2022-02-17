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
  height: 140px;
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
    height: 110px;
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

  const [currentMenu, setCurrentMenu] = useState(0);

  const [activeMenu, setActiveMenu] = useState(0);

  const [activeRightArrow, setActiveRightArrow] = useState(false);
  const [activeLeftArrow, setActiveLeftArrow] = useState(false);

  const ImageBox = styled(Image)`
    &.active {
      animation: ${scaleAnimation} 1.1s infinite;
    }
  `;

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {
    setCurrentMenu(0);
    setActiveMenu(0);
  }, [tab]);

  useEffect(() => {
    setTimeout(() => {
      setActiveRightArrow(false);
      setActiveLeftArrow(false);
    }, [100]);
  }, [currentMenu]);

  useEffect(() => {
    if (activeRightArrow) {
      const menu = activeMenu + 60;
      setActiveMenu(menu);
    } else if (activeLeftArrow) {
      const menu = activeMenu - 60;
      setActiveMenu(menu);
    }
  }, [currentMenu]);

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
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/top_hanger.png",
      "행거박스",
      "각종 의류 구임 없이",
      "걸어서 보관하는",
      "행거형 박스!",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/top_hanger.png",
      "행거박스 plus+",
      "걸수 있는 옷도 ok",
      "개서 보관 할 수 있는 옷도 ok",
      "다용도! 대용량! 의류수납",
      "토탈박스",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/top_tent.png",
      "텐트박스",
      "일반 텐트 1개를",
      "안전하게 보관 할 수",
      "있는 텐트 보관 박스",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/top_tent.png",
      "캠핑박스 Plus+",
      "텐트,각종 캠핑 장비",
      "등을 보관 할 수 있는",
      "대형 강화 박스",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/top_oneday.png",
      "하루 배송",
      "하루배송 가능 지역",
      "의정부/양주/서울",
      "남양주/구리/일산",
      "지역만 가능 합니다.",
    ],
    [
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/top_delivery.png",
      "배송현황",
      "박스 배송부터",
      "내 물건 수거 및 입고까지",
      "실시간 배송 현황을",
      "알아볼 수 있습니다.",
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
                setActiveRightArrow={setActiveRightArrow}
                setActiveLeftArrow={setActiveLeftArrow}
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
                <Wrapper
                  width={`100%`}
                  height={`100%`}
                  radius={`50%`}
                  position={`absolute`}
                  top={`0`}
                  left={`0`}
                  overflow={`hidden`}
                >
                  <Wrapper
                    height={`100%`}
                    position={`relative`}
                    transform={`rotate(${activeMenu}deg)`}
                  >
                    <Wrapper
                      position={`absolute`}
                      top={`0`}
                      left={`0`}
                      width={`0`}
                      hegiht={`0`}
                      border={
                        width < 700
                          ? screen.height / 2 < 390
                            ? `180px solid`
                            : `195px solid`
                          : `255px solid`
                      }
                      radius={`100%`}
                      borderColor={`rgb(201,200,200) rgb(215,215,215)`}
                      transform={`rotate(110deg)`}
                    ></Wrapper>
                    <Wrapper
                      position={`absolute`}
                      top={`0`}
                      left={`0`}
                      width={`0`}
                      hegiht={`0`}
                      border={
                        width < 700
                          ? screen.height / 2 < 390
                            ? `180px solid`
                            : `195px solid`
                          : `255px solid`
                      }
                      radius={`100%`}
                      borderColor={`rgb(201,200,200) transparent rgb(201,200,200) rgb(201,200,200)`}
                      transform={`rotate(-110deg)`}
                    ></Wrapper>
                  </Wrapper>
                </Wrapper>
                <IconBox
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=iobox`);
                  }}
                  top={screen.height / 2 < 390 ? `20px` : `25px`}
                  left={`50%`}
                  margin={width < 700 ? `0 0 0 -52.5px` : `0 0 0 -67px`}
                >
                  <ImageBox
                    className={String(currentMenu) === "0" ? "active" : ""}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/hanger.png`}
                    alt={`icon`}
                    width={width < 700 ? `35px` : `50px`}
                  />
                  <Text
                    fontSize={`1.1rem`}
                    color={
                      currentMenu === 0 ? Theme.white_C : Theme.darkGrey4_C
                    }
                  >
                    행거박스
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
                        : `80px`
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
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/delivery.png`}
                    alt={`icon`}
                    width={width < 700 ? `50px` : `60px`}
                  />
                  <Text
                    fontSize={`1.1rem`}
                    color={
                      currentMenu === 5 ? Theme.white_C : Theme.darkGrey4_C
                    }
                  >
                    배송현황
                  </Text>
                </IconBox>

                <IconBox
                  top={width < 700 ? `70px` : `100px`}
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
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/hanger-plus.png`}
                    alt={`icon`}
                    width={width < 700 ? `35px` : `50px`}
                    className={String(currentMenu) === "1" ? "active" : ""}
                  />
                  <Text
                    margin={`5px 0 0`}
                    fontSize={`1.1rem`}
                    color={
                      currentMenu === 1 ? Theme.white_C : Theme.darkGrey4_C
                    }
                    lineHeight={`1.2`}
                  >
                    행거박스
                  </Text>
                  <Text
                    fontSize={`1.1rem`}
                    color={
                      currentMenu === 1 ? Theme.white_C : Theme.darkGrey4_C
                    }
                  >
                    plus
                  </Text>
                </IconBox>

                <IconBox
                  bottom={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `80px`
                        : `70px`
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
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/oneday.png`}
                    alt={`icon`}
                    width={width < 700 ? `60px` : `70px`}
                  />
                  <Text
                    margin={`5px 0 0`}
                    fontSize={`1.1rem`}
                    color={
                      currentMenu === 4 ? Theme.white_C : Theme.darkGrey4_C
                    }
                  >
                    하루배송
                  </Text>
                </IconBox>

                <IconBox
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=tentBox`);
                  }}
                  bottom={
                    width < 700
                      ? screen.height / 2 < 390
                        ? `80px`
                        : `75px`
                      : `100px`
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
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/tent-box.png`}
                    alt={`icon`}
                    width={width < 700 ? `60px` : `70px`}
                  />
                  <Text
                    fontSize={`1.1rem`}
                    color={
                      currentMenu === 2 ? Theme.white_C : Theme.darkGrey4_C
                    }
                  >
                    텐트박스
                  </Text>
                </IconBox>

                <IconBox
                  onClick={() => {
                    moveLinkHandler(`/iobox?type=bigBox`);
                  }}
                  bottom={screen.height / 2 < 390 ? `20px` : `20px`}
                  left={`50%`}
                  margin={width < 700 ? `0 0 0 -52.5px` : `0 0 0 -63px`}
                >
                  <ImageBox
                    className={String(currentMenu) === "3" ? "active" : ""}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/tent-box-plus.png`}
                    alt={`icon`}
                    width={width < 700 ? `60px` : `70px`}
                  />
                  <Text
                    fontSize={`1.1rem`}
                    lineHeight={`1.2`}
                    color={
                      currentMenu === 3 ? Theme.white_C : Theme.darkGrey4_C
                    }
                  >
                    텐트박스
                  </Text>
                  <Text
                    fontSize={`1.1rem`}
                    color={
                      currentMenu === 3 ? Theme.white_C : Theme.darkGrey4_C
                    }
                  >
                    plus
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
