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
import {
  INFORMATION_BEFORE_REQUEST,
  INFORMATION_DETAIL_REQUEST,
  INFORMATION_NEXT_REQUEST,
} from "../../../../reducers/info";
import { useDispatch, useSelector } from "react-redux";

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
  const router = useRouter();
  const dispatch = useDispatch();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);
  const { nextData, beforeData, infoDetail } = useSelector(
    (state) => state.info
  );

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {
    console.log(router.query.id);
    if (router.query.id) {
      dispatch({
        type: INFORMATION_DETAIL_REQUEST,
        data: {
          guideId: router.query.id,
        },
      });
      dispatch({
        type: INFORMATION_NEXT_REQUEST,
        data: {
          guideId: router.query.id,
        },
      });
      dispatch({
        type: INFORMATION_BEFORE_REQUEST,
        data: {
          guideId: router.query.id,
        },
      });
    }
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
              <Wrapper bold={true} dr={`row`}>
                <Wrapper fontSize={`2rem`} width={`auto`}>
                  [{infoDetail && infoDetail.GuideType.value}]
                </Wrapper>

                <Wrapper fontSize={`2rem`} width={`auto`}>
                  {infoDetail && infoDetail.title}
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Image src={infoDetail && infoDetail.imagePath} width={`150px`} />
            <Wrapper padding={`10px 0`} al={`flex-start`} ju={`flex-start`}>
              {infoDetail && infoDetail.content}
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} ju={`space-between`}>
            <CommonButton
              width={`calc(100% / 3 - 10px)`}
              height={`50px`}
              onClick={() => moveLinkHandler(`/center/information`)}
            >
              목록
            </CommonButton>

            {beforeData && (
              <CommonButton
                width={`calc(100% / 3 - 10px)`}
                height={`50px`}
                kindOf={`white`}
                onClick={() =>
                  moveLinkHandler(`/center/information/${beforeData.id}`)
                }
              >
                이전
              </CommonButton>
            )}

            {nextData && (
              <CommonButton
                width={`calc(100% / 3 - 10px)`}
                height={`50px`}
                onClick={() =>
                  moveLinkHandler(`/center/information/${nextData.id}`)
                }
              >
                다음
              </CommonButton>
            )}
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
