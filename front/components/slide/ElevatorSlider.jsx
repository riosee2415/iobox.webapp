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

const ElevatorSlider = ({ setValue }) => {
  const width = useWidth();

  const dataArr = [
    "지하 2층",
    "지하 1층",
    "1층",
    "2층",
    "3층",
    "4층",
    "5층",
    "6층",
    "직접 입력",
  ];

  const ref = useRef();

  const [widthI1, setWidthI1] = useState("0");
  const [widthI2, setWidthI2] = useState("0");

  const settings = {
    className: "center",
    centerMode: true,
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
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
    <SlideWrapper>
      <Slider
        {...settings}
        ref={ref}
        afterChange={(to, from) => {
          setValue(dataArr[to]);
        }}
      >
        {dataArr.map((data, idx) => {
          return (
            <Wrapper
              key={idx}
              display={`flex !important`}
              al={`center`}
              cursor={`pointer`}
              height={`50px`}
              className="active"
            >
              {data}
            </Wrapper>
          );
        })}
      </Slider>
    </SlideWrapper>
  );
};

export default ElevatorSlider;
