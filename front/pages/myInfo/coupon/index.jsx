import React, { useCallback, useState } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";

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
        minHeight={`100vh`}
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
        <RsWrapper
          height={`100vh`}
          ju={`space-between`}
          position={`relative`}
          al={`flex-start`}
          padding={`30px 0`}
          bgColor={Theme.white_C}
        >
          <Wrapper al={`flex-start`}>
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

          {/* 쿠폰이 없을 때 */}
          {/* <Wrapper height={`calc(100% - 135px)`}>
            <Image src={`#`} alt={`image`} width={`auto`} />
            <Text color={Theme.grey_C} fontSize={`1.2rem`} margin={`10px 0 0`}>
              사용 가능한 쿠폰이 없습니다.
            </Text>
          </Wrapper> */}
        </RsWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Index;
