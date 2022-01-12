import React, { useCallback, useEffect, useState } from "react";
import Theme from "../../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
  IoBoxWrapper,
} from "../../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../../components/ClientLayout";
import useWidth from "../../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { NotificationOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  FAQ_BEFORE_REQUEST,
  FAQ_DETAIL_REQUEST,
  FAQ_NEXT_REQUEST,
} from "../../../../reducers/faq";
import Footer from "../../../../components/Footer";

const TableWrapper = styled(Wrapper)`
  border-bottom: 1px solid ${Theme.lightGrey_C};
  padding: 10px 0;
  flex-direction: row;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }
`;

const Index = () => {
  const width = useWidth();

  ////// HOOKS //////
  const { faqDetail, beforeData, nextData } = useSelector((state) => state.faq);

  ////// REDUX //////
  const router = useRouter();
  const dispatch = useDispatch();

  ////// USEEFFECT //////

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    dispatch({
      type: FAQ_DETAIL_REQUEST,
      data: {
        faqId: router.query.id,
      },
    });
  }, [router.query]);

  useEffect(() => {
    dispatch({
      type: FAQ_NEXT_REQUEST,
      data: {
        faqId: router.query.id,
      },
    });
  }, [router.query]);
  useEffect(() => {
    dispatch({
      type: FAQ_BEFORE_REQUEST,
      data: {
        faqId: router.query.id,
      },
    });
  }, [router.query]);

  ////// TOGGLE ///////

  ///// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
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
        <RsWrapper
          ju={`space-between`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
          minHeight={`100vh`}
        >
          <Wrapper al={`flex-start`}>
            <Text bold={true} fontSize={`2rem`} margin={`0 0 10px`}>
              자주 묻는 질문
            </Text>

            <Wrapper padding={`10px 0`} ju={`flex-start`} dr={`row`}>
              <Wrapper
                fontSize={`1.4rem`}
                bold={true}
                color={Theme.basicTheme_C}
                margin={`0 5px 0 0`}
                width={`30px`}
              >
                Q
              </Wrapper>
              <Wrapper width={`calc(100% - 30px - 5px)`} al={`flex-start`}>
                {faqDetail && faqDetail.question}
              </Wrapper>
            </Wrapper>

            <Wrapper padding={`10px 0`} dr={`row`} ju={`flex-start`}>
              <Wrapper
                fontSize={`1.4rem`}
                bold={true}
                color={Theme.basicTheme_C}
                margin={`0 5px 0 0`}
                width={`30px`}
              >
                A
              </Wrapper>
              <Wrapper width={`calc(100% - 30px - 5px)`} al={`flex-start`}>
                {faqDetail && faqDetail.question}
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} ju={`space-between`}>
            <CommonButton
              width={`calc(100% / 3 - 10px)`}
              height={`50px`}
              onClick={() => moveLinkHandler(`/center/faq`)}
            >
              목록
            </CommonButton>

            {beforeData && (
              <CommonButton
                width={`calc(100% / 3 - 10px)`}
                height={`50px`}
                kindOf={`white`}
                onClick={() => moveLinkHandler(`/center/faq/${beforeData.id}`)}
              >
                이전
              </CommonButton>
            )}

            {nextData && (
              <CommonButton
                width={`calc(100% / 3 - 10px)`}
                height={`50px`}
                onClick={() => moveLinkHandler(`/center/faq/${nextData.id}`)}
              >
                다음
              </CommonButton>
            )}
          </Wrapper>
        </RsWrapper>
        <Footer />
      </IoBoxWrapper>
    </WholeWrapper>
  );
};

export default Index;
