import { Carousel } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Wrapper, Text, Image } from "../commonComponents";
import Theme from "../Theme";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useWidth from "../../hooks/useWidth";
import { current } from "immer";
import { useRouter } from "next/router";

const BoxWrapper = styled(Wrapper)`
  width: calc(100% / 4);
  height: 500px;
  padding: 0 12px;

  &:first-child {
    padding: 0 12px 0 0;
  }

  &:last-child {
    padding: 0 0 0 12px;
  }

  @media (max-width: 1100px) {
    width: calc(100% / 3);
  }
`;

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

const BoxSlider = ({
  datum,
  //
  dots = false,
  arrow = true,
  effect = `scrollx`, // scrollx or fade
  //
  autoplay = false,
  delay = 5000,
  //
  isMix = false, // Row 슬라이드 가로 (false) 세로 (true) 정렬
  //
  row = 1,
  line = 5, // Row 슬라이드 행 수
  //
  setCurrentBox,
  currentBox,
}) => {
  const width = useWidth();

  const [slideDatum, setSlideDatum] = useState(null);

  const slideRef = useRef();
  const router = useRouter();

  // if (!refDatum) {
  //   const tempRef = [];

  //   for (let i = 0; i < line; i++) {
  //     tempRef.push(useRef());
  //   }

  //   refDatum = tempRef;
  // }

  const moveSlideHandler = (isNext) => {
    if (isNext) {
      // if (router.query.type === "iobox") {
      //   router.push(`/iobox?type=hangerBox`);
      // }
      // if (router.query.type === "hangerBox") {
      //   router.push(`/iobox?type=bigBox`);
      // }
      // if (router.query.type === "bigBox") {
      //   router.push(`/iobox?type=tentBox`);
      // }
      // if (router.query.type === "tentBox") {
      //   router.push(`/iobox?type=hangerBox`);
      // }

      for (let i = 0; i < slideDatum.length; i++) {
        // console.log(slideRef.current);
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

  // const change = useCallback(() => {
  //   console.log("sss");
  // }, []);

  return (
    <Wrapper display={`block`} position={`relative`}>
      {arrow && (
        <Wrapper
          position={`absolute`}
          top={`50%`}
          transform={`translateY(-50%)`}
          dr={`row`}
          ju={`space-between`}
          padding={`0 20px`}
          zIndex={`9999`}
          cursor={`pointer`}
        >
          <Wrapper width={`auto`}>
            <ArrowWrapper
              className={`before`}
              onClick={() => moveSlideHandler(false)}
            >
              <LeftOutlined />
            </ArrowWrapper>
          </Wrapper>
          <Wrapper width={`auto`}>
            <ArrowWrapper
              margin={`-15px -35px 0 0`}
              className={`next`}
              onClick={() => moveSlideHandler(true)}
            >
              <RightOutlined />
            </ArrowWrapper>
          </Wrapper>
        </Wrapper>
      )}

      {console.log(currentBox)}

      <Carousel
        // onChange={change}
        effect={effect}
        dots={false}
        slidesToShow={1}
        vertical={true}
        ref={slideRef}
        autoplay={autoplay}
        className={`slide-0`}
        initialSlide={currentBox}
        afterChange={(index) => {
          setCurrentBox(index);
        }}
      >
        {slideDatum.map((slide, idx) => {
          return (
            <Wrapper display={`flex !important`} dr={`row`} key={idx}>
              {idx === 0 ? (
                <Wrapper
                  width={`80%`}
                  height={`150px`}
                  bgColor={Theme.subTheme2_C}
                  key={idx}
                >
                  {slide}io
                </Wrapper>
              ) : idx === 1 ? (
                <Wrapper
                  width={`80%`}
                  height={`150px`}
                  bgColor={Theme.subTheme2_C}
                  key={idx}
                >
                  {slide}han
                </Wrapper>
              ) : idx === 2 ? (
                <Wrapper
                  width={`80%`}
                  height={`150px`}
                  bgColor={Theme.subTheme2_C}
                  key={idx}
                >
                  {slide}big
                </Wrapper>
              ) : (
                <Wrapper
                  width={`80%`}
                  height={`150px`}
                  bgColor={Theme.subTheme2_C}
                  key={idx}
                >
                  {slide}tnt
                </Wrapper>
              )}
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

export default React.memo(BoxSlider);
