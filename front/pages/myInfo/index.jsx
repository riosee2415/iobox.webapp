import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Theme from "../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  IoBoxWrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { RightOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import {
  LOGOUT_REQUEST,
  LOAD_MY_INFO_REQUEST,
  USERLIST_REQUEST,
} from "../../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import Footer from "../../components/Footer";

import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";

const TableWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.padding || `15px 0`};
  border-bottom: ${(props) =>
    props.borderBottom || `1px solid ${Theme.grey_C}`};
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid ${Theme.basicTheme_C};

    &:last-child {
      border: none;
    }
  }
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Index = () => {
  const width = useWidth();

  ////// HOOKS //////

  ////// REDUX //////
  const router = useRouter();

  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  ////// USEEFFECT //////

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [router.query]);

  useEffect(() => {
    if (!me) {
      router.push("/");

      return LoadNotification("로그인 후 이용해주세요.");
    }
  }, [me]);

  ////// TOGGLE ///////

  ///// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    router.push(`/`);
  }, []);

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
            moveLinkHandler("/main");
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
            height={`auto`}
          >
            <Text fontSize={`2rem`} bold={true} margin={`0 0 20px`}>
              내 정보
            </Text>

            <TableWrapper
              padding={`0 0 15px`}
              onClick={() => {
                moveLinkHandler("myInfo/name");
              }}
            >
              <Wrapper width={`auto`} al={`flex-start`}>
                <Text>{me && me.nickname}</Text>
                <Text bold={true} color={Theme.basicTheme_C}>
                  {/* {me && me.userId.split("_")[0]} */}
                  {me && me.userId && me.userId.split("_")[0]}
                  {/* {console.log(me)} */}
                </Text>
              </Wrapper>

              <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                <RightOutlined />
              </Wrapper>
            </TableWrapper>

            <TableWrapper
              onClick={() => {
                moveLinkHandler("myInfo/phone");
              }}
            >
              <Text>전화번호</Text>

              <Wrapper dr={`row`} width={`auto`}>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  margin={`0 5px 0 0`}
                >
                  {me && me.level > 1
                    ? me.mobile
                    : `휴대폰인증을 완료해주세요.`}
                </Text>
                <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                  <RightOutlined />
                </Wrapper>
              </Wrapper>
            </TableWrapper>

            <TableWrapper
              onClick={() => {
                moveLinkHandler("myInfo/card");
              }}
            >
              <Text>결제카드</Text>

              <Wrapper dr={`row`} width={`auto`}>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  margin={`0 5px 0 0`}
                >
                  {me && me.cardNum
                    ? me.cardNum.substring(0, 4) +
                      me.cardNum.substring(4, 8) +
                      me.cardNum.substring(8, 12) +
                      "****"
                    : `결제카드를 입력해주세요.`}
                </Text>
                <Wrapper width={`auto`} color={Theme.darkGrey_C}>
                  <RightOutlined />
                </Wrapper>
              </Wrapper>
            </TableWrapper>

            <TableWrapper
              onClick={() => {
                moveLinkHandler("myInfo/membership");
              }}
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
            </TableWrapper>

            <TableWrapper
              onClick={() => {
                moveLinkHandler("myInfo/coupon");
              }}
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
            </TableWrapper>

            <TableWrapper
              onClick={() => {
                moveLinkHandler("myInfo/newNotice");
              }}
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
            </TableWrapper>

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
            padding={width < 700 ? `10px 20px` : `10px 30px`}
            bgColor={Theme.lightGrey_C}
            al={`flex-start`}
          >
            고객센터
          </Wrapper>

          <RsWrapper height={`auto`}>
            <TableWrapper
              onClick={() => {
                moveLinkHandler("center");
              }}
            >
              <Text>1:1 상담</Text>
            </TableWrapper>

            <TableWrapper
              onClick={() => {
                moveLinkHandler("center/notice");
              }}
            >
              <Text>공지사항</Text>
            </TableWrapper>

            <TableWrapper
              onClick={() => {
                moveLinkHandler("center/information");
              }}
            >
              <Text>이용안내</Text>
            </TableWrapper>

            <TableWrapper
              onClick={() => {
                moveLinkHandler("center/faq");
              }}
            >
              <Text>자주 묻는 질문</Text>
            </TableWrapper>

            <TableWrapper
              borderBottom={`none`}
              onClick={() => {
                moveLinkHandler("center/event");
              }}
            >
              <Text>이벤트</Text>
            </TableWrapper>
          </RsWrapper>

          <Wrapper height={`10px`} bgColor={Theme.lightGrey_C}></Wrapper>

          <RsWrapper padding={`15px 50px`} al={`flex-start`}>
            이용약관 &#38; 개인정보 처리방침
          </RsWrapper>

          <Wrapper height={`10px`} bgColor={Theme.lightGrey_C}></Wrapper>

          <RsWrapper>
            <Wrapper
              padding={`15px 50px 15px 0`}
              al={`flex-start`}
              onClick={logoutHandler}
              cursor={`pointer`}
            >
              로그아웃
            </Wrapper>
          </RsWrapper>
        </Wrapper>
      </IoBoxWrapper>
      <Footer />
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
