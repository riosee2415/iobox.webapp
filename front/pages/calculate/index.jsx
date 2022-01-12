import React, { useCallback, useEffect, useState } from "react";
import Theme from "../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  IoBoxWrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";

const Box = styled(Wrapper)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${Theme.darkGrey2_C};
  cursor: pointer;

  &:hover {
    background: ${Theme.darkGrey2_C};
    color: ${Theme.white_C};
  }
`;

const Index = () => {
  const width = useWidth();

  ////// HOOKS //////

  const [currentBox, setCurrentBox] = useState(0);
  const [currentBuy, setCurrentBuy] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  ////// REDUX //////
  const router = useRouter();

  ////// USEEFFECT //////
  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  ////// TOGGLE ///////

  ///// HANDLER //////
  const numberHandler = useCallback(
    (value) => {
      let tempArr = currentBuy.map((data, idx) => {
        return idx === currentBox
          ? data + value < 0
            ? 0
            : data + value
          : data;
      });

      console.log(tempArr);

      setCurrentBuy(tempArr);

      // if (number + value >= 0) setNumber(number + value);
    },
    [currentBox, currentBuy]
  );

  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

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
            minHeight={`100vh`}
          >
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/logo/LOGO.png`}
              width={`50px`}
              alt={`LOGO`}
            />

            <Wrapper dr={`row`} ju={`space-between`} margin={`50px 0 0`}>
              <Text>장기보관(6개월이상)</Text>
              <Text fontWeight={`700`}>0원</Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 50px`}>
              <Text>단기보관</Text>
              <Text fontWeight={`700`}>0원</Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`auto`} dr={`row`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox_dial.png`}
                  alt={`icon`}
                  width={`25px`}
                />
                <Text fontWeight={`700`} margin={`0 5px`} fontSize={`0.9rem`}>
                  박스
                </Text>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  fontSize={`0.9rem`}
                >
                  0
                </Text>
              </Wrapper>

              <Wrapper width={`auto`} dr={`row`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/hanger.png`}
                  alt={`icon`}
                  width={`30px`}
                />
                <Text fontWeight={`700`} margin={`0 5px`} fontSize={`0.9rem`}>
                  행거
                </Text>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  fontSize={`0.9rem`}
                >
                  0
                </Text>
              </Wrapper>

              <Wrapper width={`auto`} dr={`row`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/box_dial.png`}
                  alt={`icon`}
                  width={`35px`}
                />
                <Text fontWeight={`700`} margin={`0 5px`} fontSize={`0.9rem`}>
                  텐트박스
                </Text>
                <Text
                  color={Theme.basicTheme_C}
                  fontWeight={`700`}
                  fontSize={`0.9rem`}
                >
                  0
                </Text>
              </Wrapper>
            </Wrapper>

            <Text margin={`10px 0`} fontWeight={`700`}>
              보관할 물건을 선택해주세요.
            </Text>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/tee.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                티셔츠
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(0);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[0]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(0);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/knit.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                니트류
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(1);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[1]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(1);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/onepiece.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                원피스
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(2);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[2]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(2);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/shirt.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                셔츠
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(3);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[3]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(3);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/bag.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                텐트
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(4);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[4]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(4);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/luxury.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                신발/가방
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(5);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[5]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(5);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/book.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                책
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(6);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[6]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(6);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/coat.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                코트
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(7);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[7]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(7);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              padding={`10px`}
              border={`1px solid ${Theme.grey_C}`}
              margin={`0 0 10px`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/padding.png`}
                alt={`thumbnail`}
                width={`30%`}
              />
              <Wrapper
                width={`30%`}
                padding={`0 10px`}
                al={`flex-start`}
                fontSize={`0.8rem`}
                fontWeight={`700`}
              >
                두터운 패딩
              </Wrapper>
              <Wrapper width={`40%`} dr={`row`} ju={`space-between`}>
                <Box
                  onClick={() => {
                    setCurrentBox(8);
                    numberHandler(-1);
                  }}
                >
                  <MinusOutlined />
                </Box>
                <Text fontWeight={`700`}>{currentBuy[8]}</Text>
                <Box
                  onClick={() => {
                    setCurrentBox(8);
                    numberHandler(+1);
                  }}
                >
                  <PlusOutlined />
                </Box>
              </Wrapper>
            </Wrapper>

            <Text fontSize={`1.2rem`} fontWeight={`700`} margin={`10px 0`}>
              예상 보관함 수량
            </Text>

            <Wrapper dr={`row`} ju={`flex-start`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/paperbox.png`}
                alt={`thumbnail`}
                width={`auto`}
                margin={`0 10px 0 0`}
                width={`40px`}
              />
              <Text fontSize={`1.1rem`} fontWeight={`700`}>
                박스
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`10px 0`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/hagner.png`}
                alt={`thumbnail`}
                width={`40px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`1.1rem`} fontWeight={`700`}>
                행거박스
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon/box.png`}
                alt={`thumbnail`}
                width={`40px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`1.1rem`} fontWeight={`700`}>
                텐트박스
              </Text>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
        <Footer />
      </IoBoxWrapper>
    </WholeWrapper>
  );
};

export default Index;
