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
} from "../../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../../components/ClientLayout";
import useWidth from "../../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { NotificationOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  NOTICE_BEFORE_REQUEST,
  NOTICE_DETAIL_REQUEST,
  NOTICE_NEXT_REQUEST,
} from "../../../../reducers/notice";
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
  const dispatch = useDispatch();

  const { noticeDetail, beforeData, nextData } = useSelector(
    (state) => state.notice
  );

  ////// REDUX //////
  const router = useRouter();

  ////// USEEFFECT //////

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    dispatch({
      type: NOTICE_DETAIL_REQUEST,
      data: {
        noticeId: router.query.id,
      },
    });
  }, [router.query]);

  useEffect(() => {
    dispatch({
      type: NOTICE_NEXT_REQUEST,
      data: {
        noticeId: router.query.id,
      },
    });
  }, [router.query]);
  useEffect(() => {
    dispatch({
      type: NOTICE_BEFORE_REQUEST,
      data: {
        noticeId: router.query.id,
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
      <Wrapper
        width={width < 700 ? `100%` : `500px`}
        minHeight={`100vh`}
        shadow={`0px 0px 10px ${Theme.grey_C}`}
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
              공지사항
            </Text>

            <Wrapper padding={`10px 0`} al={`flex-start`} ju={`flex-start`}>
              {noticeDetail && noticeDetail.content}
              {console.log(noticeDetail)}
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} ju={`space-between`}>
            <CommonButton
              width={`calc(100% / 3 - 10px)`}
              height={`50px`}
              onClick={() => moveLinkHandler(`/center/notice`)}
            >
              목록
            </CommonButton>

            {beforeData && (
              <CommonButton
                width={`calc(100% / 3 - 10px)`}
                height={`50px`}
                kindOf={`white`}
                onClick={() =>
                  moveLinkHandler(`/center/notice/${beforeData.id}`)
                }
              >
                이전
              </CommonButton>
            )}

            {nextData && (
              <CommonButton
                width={`calc(100% / 3 - 10px)`}
                height={`50px`}
                onClick={() => moveLinkHandler(`/center/notice/${nextData.id}`)}
              >
                다음
              </CommonButton>
            )}
          </Wrapper>
        </RsWrapper>
        <Footer />
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
