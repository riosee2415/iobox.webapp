import { Carousel } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Wrapper, Text, Image, GradientText } from "../commonComponents";
import Theme from "../Theme";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const ArrowWrapper = styled(Wrapper)`
  width: 35px;

  height: 35px;

  border-radius: 20px;

  margin: ${(props) => props.margin || `-15px 0 0 -35px`};

  transition: 0.5s;

  & svg {
    font-size: 30px;

    color: ${Theme.darkGrey_C};

    transition: 0.5s;
  }

  &:hover {
    & svg {
      color: ${Theme.basicTheme_C};
    }
  }
`;

const MainSlider = ({
  datum,
  //
  dots = false,
  arrow = false,
  effect = `scrollx`, // scrollx or fade
  //
  autoplay = true,
  delay = 5000,
  //
  isMix = false, // Row 슬라이드 가로 (false) 세로 (true) 정렬
  //
  row = 1,
  line = 1, // Row 슬라이드 행 수
  //
  setCurrentMenu,
  setActiveRightArrow,
  setActiveLeftArrow,
  //
  tab,
}) => {
  const width = useWidth();

  const [slideDatum, setSlideDatum] = useState(null);

  const slideRef = useRef();

  const router = useRouter();

  const moveSlideHandler = (isNext) => {
    if (isNext) {
      for (let i = 0; i < slideDatum.length; i++) {
        if (slideRef.current) {
          slideRef.current.next();
        }
      }
    } else {
      for (let i = 0; i < slideDatum.length; i++) {
        if (slideRef.current) {
          slideRef.current.prev();
        }
      }
    }
  };

  const movePageHandler = (idx) => {
    for (let i = 0; i < slideDatum.length; i++) {
      slideRef.current.goTo(idx);
    }
  };

  useEffect(() => {
    if (datum) {
      let tempArr = [];

      let totalArr = [];

      for (let i = 0; i < datum.length; i++) {
        tempArr.push(datum[i]);

        if (tempArr.length === row * line) {
          totalArr.push(tempArr);

          tempArr = [];
        }
      }

      if (tempArr.length !== 0) {
        let index = tempArr.length;

        for (let i = 0; i < row * line - index; i++) {
          tempArr.push("");
        }

        totalArr.push(tempArr);
      }

      setSlideDatum(totalArr);
    }
  }, [datum]);

  useEffect(() => {
    if (slideDatum && arrow) {
      const beforeButton = document.querySelector(".before");

      const nextButton = document.querySelector(".next");

      beforeButton.addEventListener(`click`, () => moveSlideHandler(false));

      nextButton.addEventListener(`click`, () => moveSlideHandler(true));
    }
  }, [slideDatum, arrow, line, slideDatum]);

  if (!slideDatum) {
    return null;
  }

  return (
    <Wrapper display={`block`} position={`relative`} width={`80% !important`}>
      {arrow && (
        <Wrapper
          position={`absolute`}
          bottom={`0`}
          // transform={`translateY(-50%)`}
          top={`0`}
          dr={`row`}
          ju={`space-between`}
          zIndex={`9999`}
          cursor={`pointer`}
        >
          <Wrapper
            width={`auto`}
            onClick={() => {
              setActiveLeftArrow(true);
            }}
          >
            <ArrowWrapper
              className={`before`}
              onClick={() => moveSlideHandler(false)}
            >
              <LeftOutlined />
            </ArrowWrapper>
          </Wrapper>

          <Wrapper
            width={`auto`}
            onClick={() => {
              setActiveRightArrow(true);
            }}
          >
            <ArrowWrapper
              margin={`0 -35px 0 0`}
              className={`next`}
              onClick={() => moveSlideHandler(false)}
            >
              <RightOutlined />
            </ArrowWrapper>
          </Wrapper>
        </Wrapper>
      )}

      <Carousel
        className="one-slide"
        effect={effect}
        dots={false}
        slidesToShow={1} // 한 화면에 몇개의 슬라이드가 보여지는지 결정
        vertical={false}
        ref={slideRef}
        autoplay={autoplay}
        centerMode={false} // 양쪽에 겹쳐서 보이는 디자인
        centerPadding={`30px`} // 얼만큼 겹쳐 보일건지 결정
        fade={false} // fade or slide
        initialSlide={0} // 초기에 몇번째 슬라이드를 보여줄 것인지 결정
        variableWidth={false} // 각각 다른 크기를 지정할 수 있음
        vartical={true}
        verticalSwiping={true}
      >
        {slideDatum.map((slide, idx) => {
          return (
            <Wrapper display={`flex !important`} dr={`row`} key={idx}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/main/woman.png`}
                width={width < 700 ? `110px` : `180px`}
                zIndex={`2`}
              />
            </Wrapper>
          );
        })}
      </Carousel>

      {dots && (
        <Wrapper
          dr={`row`}
          position={`absolute`}
          bottom={`10px`}
          className={`dots`}
        >
          {slideDatum.map((_, idx) => {
            return (
              <Wrapper
                key={idx}
                width={`auto`}
                margin={`0 10px`}
                cursor={`pointer`}
                onClick={() => {
                  movePageHandler(idx);
                }}
              >
                {idx + 1}
              </Wrapper>
            );
          })}
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default React.memo(MainSlider);
