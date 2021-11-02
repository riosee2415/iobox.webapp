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
import { RightOutlined } from "@ant-design/icons";
import { Switch } from "antd";

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
    <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
      <Wrapper
        width={width < 700 ? `100%` : `500px`}
        height={`100%`}
        shadow={`0px 0px 10px ${Theme.grey_C}`}
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
            height={`auto`}
          >
            <Text fontSize={`2rem`} bold={true} margin={`0 0 20px`}>
              내 정보
            </Text>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`0 0 15px`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Wrapper width={`auto`} al={`flex-start`}>
                <Text>김우현</Text>
                <Text bold={true} color={Theme.basicTheme_C}>
                  kakao
                </Text>
              </Wrapper>

              <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                <RightOutlined />
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>전화번호</Text>

              <Wrapper dr={`row`} width={`auto`}>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  margin={`0 5px 0 0`}
                >
                  01099999999
                </Text>
                <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                  <RightOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>결제카드</Text>

              <Wrapper dr={`row`} width={`auto`}>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  margin={`0 5px 0 0`}
                >
                  215156282****3333/3333
                </Text>
                <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                  <RightOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>멤버십</Text>

              <Wrapper dr={`row`} width={`auto`}>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  margin={`0 5px 0 0`}
                >
                  멤버십 가입 혜택 알아보기
                </Text>
                <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                  <RightOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>쿠폰</Text>

              <Wrapper dr={`row`} width={`auto`}>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  margin={`0 5px 0 0`}
                >
                  0개
                </Text>
                <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                  <RightOutlined />
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>알림</Text>

              <Wrapper dr={`row`} width={`auto`}>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  margin={`0 5px 0 0`}
                >
                  1개
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} padding={`15px 0 0`}>
              <Wrapper width={`auto`} al={`flex-start`}>
                <Text>혜택 및 마케팅 정보 수신 동의</Text>
                <Text fontSize={`0.8rem`} color={Theme.grey_C}>
                  미동의
                </Text>
              </Wrapper>

              <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                <Switch />
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          <Wrapper
            padding={`10px 50px`}
            bgColor={Theme.lightGrey_C}
            al={`flex-start`}
          >
            고객센터
          </Wrapper>

          <RsWrapper height={`auto`}>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>1:1 상담</Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>공지사항</Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>이용안내</Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`15px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text>자주 묻는 질문</Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} padding={`15px 0`}>
              <Text>이벤트</Text>
            </Wrapper>
          </RsWrapper>

          <Wrapper height={`10px`} bgColor={Theme.lightGrey_C}></Wrapper>

          <RsWrapper padding={`15px 50px`} al={`flex-start`}>
            이용약관 &#38; 개인정보 처리방침
          </RsWrapper>

          <Wrapper height={`10px`} bgColor={Theme.lightGrey_C}></Wrapper>

          <Wrapper padding={`15px 50px`} al={`flex-start`}>
            로그아웃
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
