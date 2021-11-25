import { Carousel } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Text, Image, RowWrapper } from "../commonComponents";
import Theme from "../Theme";
import styled, { keyframes } from "styled-components";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useWidth from "../../hooks/useWidth";

const SlideWrapper = styled(Wrapper)`
  overflow: hidden;
  height: 126px;

  .slick-vertical {
    width: 100%;
  }
`;

const widthAni = keyframes`
0%{
  width: 0%;
}
100%{
  width : 100%;
}
`;

const CustomWrapper = styled(Wrapper)`
  animation: ${widthAni} 5s infinite;
`;

const ElevatorSlider = ({}) => {
  const width = useWidth();

  const ref = useRef();

  const [widthI1, setWidthI1] = useState("0");
  const [widthI2, setWidthI2] = useState("0");

  const settings = {
    className: "center",
    centerMode: true,
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    vertical: true,
    cneterMode: false,
    // autoplay: true,
    verticalSwiping: true,
  };

  if (width === 0) {
    return null;
  }

  return (
    <>
      <SlideWrapper>
        <Slider {...settings} ref={ref}>
          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            지하 2층
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            지하 1층
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            1층
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            2층
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            3층
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            4층
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            5층
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            6층
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            직접 입력
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            -
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            -
          </Wrapper>

          <Wrapper
            display={`flex !important`}
            al={`center`}
            cursor={`pointer`}
            height={`50px`}
            className="active"
          >
            -
          </Wrapper>
        </Slider>
      </SlideWrapper>
    </>
  );
};

export default ElevatorSlider;
