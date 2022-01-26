import React, { useCallback, useEffect, useState } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
  IoBoxWrapper,
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import Footer from "../../../components/Footer";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";

import axios from "axios";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import { notification } from "antd";
import { useSelector } from "react-redux";

const CouponWrapper = styled(Wrapper)`
  height: 150px;
  border-radius: 20px;
  margin: 0 0 15px;
  box-shadow: 0px 0px 10px ${Theme.grey_C};
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px ${Theme.basicTheme_C};
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
  const { me } = useSelector((state) => state.user);

  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      router.push("/");

      return LoadNotification("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  ////// TOGGLE ///////

  ///// HANDLER //////
  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  ////// DATAVIEW //////
  return (
    <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
      <IoBoxWrapper
        minHeight={`100vh`}
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
        <RsWrapper
          ju={`flex-start`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
          minHeight={`100vh`}
        >
          <Wrapper al={`flex-start`} margin={`0 0 10px`}>
            <Text bold={true} fontSize={`2rem`}>
              쿠폰
            </Text>

            <Wrapper dr={`row`} margin={`10px 0 0`}>
              <TextInput
                width={`80%`}
                border={`1px solid ${Theme.grey_C}`}
                placeholder="쿠폰 코드를 입력해주세요."
              />
              <CommonButton width={`20%`} radius={`0`} height={`40px`}>
                등록
              </CommonButton>
            </Wrapper>

            <Text fontSize={`0.7rem`} color={Theme.grey_C} margin={`10px 0 0`}>
              쿠폰은 이용료 결제시 자동으로 할인되며, 다수의 쿠폰을 보유하신
              경우 가장 할인 혜택이 높은 쿠폰으로 적용됩니다.
            </Text>
          </Wrapper>

          <CouponWrapper>
            <Wrapper width={`85%`} padding={`20px`} al={`flex-start`}>
              <Text fontSize={`1.3rem`} fontWeight={`700`}>
                쿠폰이름
              </Text>
              <Text fontSize={`0.8rem`} color={Theme.grey_C}>
                2021년 02월 10일 ~ 2022년 02월 10일
              </Text>

              <Text fontSize={`2rem`} bold={true} margin={`10px 0 0`}>
                10% 할인
              </Text>
            </Wrapper>
            <Wrapper
              width={`15%`}
              height={`100%`}
              radius={`0 20px 20px 0`}
              bgColor={Theme.basicTheme_C}
              ju={`flex-end`}
              padding={`10px 5px`}
              border={`1px solid  ${Theme.basicTheme_C}`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
                alt={`logo`}
                width={`30px`}
              />
            </Wrapper>
          </CouponWrapper>

          <CouponWrapper>
            <Wrapper width={`85%`} padding={`20px`} al={`flex-start`}>
              <Text fontSize={`1.3rem`} fontWeight={`700`}>
                쿠폰이름
              </Text>
              <Text fontSize={`0.8rem`} color={Theme.grey_C}>
                2021년 02월 10일 ~ 2022년 02월 10일
              </Text>

              <Text fontSize={`2rem`} bold={true} margin={`10px 0 0`}>
                10% 할인
              </Text>
            </Wrapper>
            <Wrapper
              width={`15%`}
              height={`100%`}
              radius={`0 20px 20px 0`}
              bgColor={Theme.basicTheme_C}
              ju={`flex-end`}
              padding={`10px 5px`}
              border={`1px solid  ${Theme.basicTheme_C}`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
                alt={`logo`}
                width={`30px`}
              />
            </Wrapper>
          </CouponWrapper>

          <CouponWrapper>
            <Wrapper width={`85%`} padding={`20px`} al={`flex-start`}>
              <Text fontSize={`1.3rem`} fontWeight={`700`}>
                쿠폰이름
              </Text>
              <Text fontSize={`0.8rem`} color={Theme.grey_C}>
                2021년 02월 10일 ~ 2022년 02월 10일
              </Text>

              <Text fontSize={`2rem`} bold={true} margin={`10px 0 0`}>
                10% 할인
              </Text>
            </Wrapper>
            <Wrapper
              width={`15%`}
              height={`100%`}
              radius={`0 20px 20px 0`}
              bgColor={Theme.basicTheme_C}
              ju={`flex-end`}
              padding={`10px 5px`}
              border={`1px solid  ${Theme.basicTheme_C}`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
                alt={`logo`}
                width={`30px`}
              />
            </Wrapper>
          </CouponWrapper>

          <CouponWrapper>
            <Wrapper width={`85%`} padding={`20px`} al={`flex-start`}>
              <Text fontSize={`1.3rem`} fontWeight={`700`}>
                쿠폰이름
              </Text>
              <Text fontSize={`0.8rem`} color={Theme.grey_C}>
                2021년 02월 10일 ~ 2022년 02월 10일
              </Text>

              <Text fontSize={`2rem`} bold={true} margin={`10px 0 0`}>
                10% 할인
              </Text>
            </Wrapper>
            <Wrapper
              width={`15%`}
              height={`100%`}
              radius={`0 20px 20px 0`}
              bgColor={Theme.basicTheme_C}
              ju={`flex-end`}
              padding={`10px 5px`}
              border={`1px solid  ${Theme.basicTheme_C}`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
                alt={`logo`}
                width={`30px`}
              />
            </Wrapper>
          </CouponWrapper>

          <CouponWrapper>
            <Wrapper width={`85%`} padding={`20px`} al={`flex-start`}>
              <Text fontSize={`1.3rem`} fontWeight={`700`}>
                쿠폰이름
              </Text>
              <Text fontSize={`0.8rem`} color={Theme.grey_C}>
                2021년 02월 10일 ~ 2022년 02월 10일
              </Text>

              <Text fontSize={`2rem`} bold={true} margin={`10px 0 0`}>
                10% 할인
              </Text>
            </Wrapper>
            <Wrapper
              width={`15%`}
              height={`100%`}
              radius={`0 20px 20px 0`}
              bgColor={Theme.basicTheme_C}
              ju={`flex-end`}
              padding={`10px 5px`}
              border={`1px solid  ${Theme.basicTheme_C}`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO_W.png`}
                alt={`logo`}
                width={`30px`}
              />
            </Wrapper>
          </CouponWrapper>

          {/* 쿠폰이 없을 때 */}
          {/* <Wrapper height={`calc(100vh - 300px)`}>
            <Image src={`#`} alt={`image`} width={`auto`} />
            <Text color={Theme.grey_C} fontSize={`1.2rem`} margin={`10px 0 0`}>
              사용 가능한 쿠폰이 없습니다.
            </Text>
          </Wrapper> */}
        </RsWrapper>
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
