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
  EVENT_BEFORE_REQUEST,
  EVENT_DETAIL_REQUEST,
  EVENT_NEXT_REQUEST,
} from "../../../../reducers/event";
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

const ImageBox = styled(Wrapper)`
  height: 150px;
  background: ${Theme.grey_C};
  margin: 0 0 20px;
  cursor: pointer;
  overflow: hidden;

  ${Image} {
    transition: 0.5s;
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);
  const dispatch = useDispatch();

  const { nextData, beforeData, eventDetail } = useSelector(
    (state) => state.event
  );
  ////// REDUX //////
  console.log(eventDetail);
  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: EVENT_DETAIL_REQUEST,
      data: {
        eventId: router.query.id,
      },
    });
  }, [router.query]);

  useEffect(() => {
    dispatch({
      type: EVENT_NEXT_REQUEST,
      data: {
        eventId: router.query.id,
      },
    });
  }, [router.query]);
  useEffect(() => {
    dispatch({
      type: EVENT_BEFORE_REQUEST,
      data: {
        eventId: router.query.id,
      },
    });
  }, [router.query]);

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
            <Wrapper
              position={`sticky`}
              top={`0`}
              left={width < 700 ? `50px` : `50%`}
              width={width < 700 ? `100%` : `400px`}
              margin={width < 700 ? `0` : `0 0 0 -200px`}
              padding={`10px 0`}
              al={`flex-start`}
              bgColor={Theme.white_C}
            >
              <Text bold={true} fontSize={`1.2rem`}>
                {eventDetail && eventDetail.title}
              </Text>
            </Wrapper>
            {/* <Wrapper padding={`10px 0`} al={`flex-start`} ju={`flex-start`}>
              {eventDetail && eventDetail.content}
            </Wrapper> */}
            <ImageBox>
              <Image
                src={eventDetail && eventDetail.imagePath}
                width={`400px`}
              />
            </ImageBox>
          </Wrapper>

          <Wrapper dr={`row`} ju={`space-between`}>
            <CommonButton
              width={`calc(100% / 3 - 10px)`}
              height={`50px`}
              onClick={() => moveLinkHandler(`/center/event`)}
            >
              목록
            </CommonButton>

            {beforeData && (
              <CommonButton
                width={`calc(100% / 3 - 10px)`}
                height={`50px`}
                kindOf={`white`}
                onClick={() =>
                  moveLinkHandler(`/center/event/${beforeData.id}`)
                }
              >
                이전
              </CommonButton>
            )}

            {nextData && (
              <CommonButton
                width={`calc(100% / 3 - 10px)`}
                height={`50px`}
                onClick={() => moveLinkHandler(`/center/event/${nextData.id}`)}
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
