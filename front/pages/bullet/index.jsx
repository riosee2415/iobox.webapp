import React, { useCallback, useEffect, useState } from "react";
import Theme from "../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
  GradientText,
} from "../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import useWidth from "../../hooks/useWidth";
import moment from "moment";
import {
  CloseOutlined,
  DownOutlined,
  MinusOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import {
  Checkbox,
  Radio,
  Select,
  Calendar,
  Typography,
  Row,
  Col,
  DatePicker,
  Modal,
  Input,
} from "antd";
import locale from "antd/lib/locale/zh_CN";
import ElevatorSlider from "../../components/slide/ElevatorSlider";

const TextHover = styled(Wrapper)`
  width: 80px;
  color: ${Theme.basicTheme_C};
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: ${Theme.subTheme3_C};
  }
`;

const RangePicker = styled(DatePicker.RangePicker)`
  & .ant-picker-range-separator {
    display: none;
  }
  &.ant-picker-range {
    display: flex !important;
    flex-direction: column !important;
    padding: 0;
    height: 140px;
  }
  & .ant-picker-input {
    height: 70px;
  }
  & .ant-picker-panels {
    display: flex !important;
    flex-direction: column !important;
  }

  & .ant-picker-active-bar,
  & .ant-picker-suffix,
  & .ant-picker-clear {
    display: none;
  }
`;

const CustomInput = styled(Input)`
  width: 100%;
  & .ant-input-affix-wrapper > input.ant-input {
    height: auto;
  }

  height: ${(props) => props.height} !important;

  border: none;
  outline: none;
  height: 80px;
  padding: 10px 20px;
  & .ant-input {
    &::placeholder {
      font-size: 1.3rem;
      color: ${(props) => props.theme.grey_C};
      @media (max-width: 700px) {
        font-size: 1rem;
      }
      line-height: 1.6;
      color: ${(props) => props.theme.grey_C};
    }
    font-size: 1.3rem;
    @media (max-width: 700px) {
      font-size: 1rem;
    }
  }
`;

const GreyCheckbox = styled(Checkbox)`
  width: 22px;
  & .ant-checkbox-inner {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border-color: ${Theme.grey_C} !important;
    border-radius: 50%;
  }
  & .ant-checkbox-checked::after {
    border: none !important;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${Theme.grey_C};
    border-color: ${Theme.grey_C};
  }
  & .ant-checkbox-inner:hover {
    border-color: ${Theme.grey_C} !important;
    border-radius: 50%;
  }

  & .ant-checkbox:hover .ant-checkbox-inner {
    border: 1px solid ${Theme.grey_C};
  }

  & .ant-checkbox-inner::after {
    top: 49%;
    left: 21%;
    width: 7px;
    height: 11px;
    border: 3px solid #fff;
    border-top: 0;
    border-left: 0;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
  }
`;

const RightOutlinedAbsol = styled(RightOutlined)`
  & .ant-picker-input > input {
    font-size: 20px;
  }
  /* position: absolute;
  top: 7px;
  right: 10px; */
`;

const FocusInput = styled(TextInput)`
  width: ${(props) => props.width || `calc(100% / 4)`};
  height: 40px;
  padding: 10px;
  border: none !important;
`;

const CustomRadio = styled(Radio)`
  margin: ${(props) => props.margin};
`;
const CustomRadioGroup = styled(Radio.Group)`
  width: 100%;
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [tab, setTab] = useState(false);

  const [cardInput, setCardInput] = useState(false);
  const [dayInput, setDayInput] = useState(false);

  const [currentHanger, setCurrentHanger] = useState(0);
  const [currentIo, setCurrentIo] = useState(0);
  const [currentBig, setCurrentBig] = useState(0);
  const [currentTent, setCurrentTent] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [floorModal, setFloorModal] = useState(false);

  const [datePickerOpen1, setDatePickerOpen1] = useState(false);
  const [datePickerOpen2, setDatePickerOpen2] = useState(false);

  const [radioValue, setRadioValue] = useState(0);
  // const [floorModal, setFloorModal] = useState(false);

  const [currentTab, setCurrentTab] = useState(0);

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {
    const now = new Date();
    const oneWeekLater = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 7
    ); //일주일 후

    const oneMonthLater = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    ); //한달 후

    setStartDate(moment(now).format(`YYYY-MM-DD`)); //현재
    setEndDate(moment(oneWeekLater).format("YYYY-MM-DD"));

    if (radioValue === 1) {
      setEndDate(moment(oneMonthLater).format("YYYY-MM-DD"));
      console.log(startDate, radioValue);
      console.log(endDate, radioValue);
    }
  }, [radioValue, router.query]);

  ////// DATE //////////
  const now = new Date();
  const currentDate = new Date();
  //일주일 후
  //한달 후

  ////// TOGGLE ///////

  const currentHangerHandler = useCallback(
    (pm) => {
      if (pm === `plus`) {
        setCurrentHanger(currentHanger + 1);
      } else if (pm === `minus`) {
        if (currentHanger <= 0) {
          return;
        }
        setCurrentHanger(currentHanger - 1);
      }
    },
    [currentHanger]
  );
  const currentIoHandler = useCallback(
    (pm) => {
      if (pm === `plus`) {
        setCurrentIo(currentIo + 1);
      } else if (pm === `minus`) {
        if (currentIo <= 0) {
          return;
        }
        setCurrentIo(currentIo - 1);
      }
    },
    [currentIo]
  );
  const currentBigHandler = useCallback(
    (pm) => {
      if (pm === `plus`) {
        setCurrentBig(currentBig + 1);
      } else if (pm === `minus`) {
        if (currentBig <= 0) {
          return;
        }
        setCurrentBig(currentBig - 1);
      }
    },
    [currentBig]
  );
  const currentTentHandler = useCallback(
    (pm) => {
      if (pm === `plus`) {
        setCurrentTent(currentTent + 1);
      } else if (pm === `minus`) {
        if (currentTent <= 0) {
          return;
        }
        setCurrentTent(currentTent - 1);
      }
    },
    [currentTent]
  );

  const deleteAllBoxHandler = useCallback(() => {
    setCurrentHanger(0);
    setCurrentIo(0);
    setCurrentBig(0);
    setCurrentTent(0);
  }, [currentHanger, currentIo, currentBig, currentTent]);

  const cardInputToggle = useCallback(() => {
    setCardInput(true);
  }, [cardInput]);

  const dayInputToggle = useCallback(() => {
    setDayInput(true);
  }, [dayInput]);

  const dateChangeHandler = useCallback(
    (e) => {
      console.log(e.target);
    },
    [startDate, endDate]
  );

  ///// HANDLER //////

  // const onChange1 = (date, dateString) => {
  //   setStartDate(dateString);
  // };
  // const onChange2 = (date, dateString) => {
  //   setEndDate(dateString);
  // };

  const radioChangeHandler = useCallback(
    (e) => {
      const oneWeekLater = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 7
      ); //일주일 후

      const oneMonthLater = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      ); //한달 후

      setRadioValue(e.target.value);
      if (radioValue === 0) {
        setEndDate(moment(oneWeekLater).format("YYYY-MM-DD"));
      } else if (radioValue === 1) {
        setEndDate(moment(oneMonthLater).format("YYYY-MM-DD"));
        console.log(startDate, radioValue);
        console.log(endDate, radioValue);
      }
    },
    [radioValue, startDate, endDate]
  );

  const blurHandler = useCallback(() => {
    setCardInput(false);
    setDayInput(false);
  }, [cardInput]);

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
      {currentTab === 0 && (
        <>
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
              ju={`flex-start`}
              position={`relative`}
              al={`flex-start`}
              padding={`30px 0`}
              bgColor={Theme.white_C}
              height={`100vh`}
            >
              <Wrapper ju={`flex-end`} height={`100%`} margin={`0 0 80px`}>
                <Image
                  width={width < 700 ? `150px` : `180px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/bullet/map.png`}
                  alt={`map`}
                  margin={width < 700 ? `0 0 20px` : `0 0 30px`}
                />
                <Wrapper margin={width < 700 ? `0 0 30px` : `0 0 50px`}>
                  <Text
                    fontSize={width < 700 ? `1.6rem` : `1.8rem`}
                    color={Theme.basicTheme_C}
                    lineHeight={`1.2`}
                    fontWeight={`700`}
                  >
                    총알배송은
                  </Text>
                  <Text
                    fontSize={width < 700 ? `1.6rem` : `1.8rem`}
                    color={Theme.basicTheme_C}
                    lineHeight={`1.2`}
                    fontWeight={`700`}
                  >
                    의정부시/양주시/서울 일부
                  </Text>
                  <Text
                    fontSize={width < 700 ? `1.6rem` : `1.8rem`}
                    color={Theme.basicTheme_C}
                    lineHeight={`1.2`}
                    fontWeight={`700`}
                  >
                    지역만 가능합니다.
                  </Text>
                </Wrapper>
                <Wrapper margin={width < 700 ? `0 0 15px` : `0 0 25px`}>
                  <Text
                    fontSize={width < 700 ? `0.9rem` : `1.1rem`}
                    color={Theme.darkGrey_C}
                    lineHeight={`1.2`}
                  >
                    견적 확인 및 예약 요청을 해주세요.
                  </Text>
                  <Text
                    fontSize={width < 700 ? `0.9rem` : `1.1rem`}
                    color={Theme.darkGrey_C}
                    lineHeight={`1.2`}
                  >
                    고객센터에서 24시간 내 확인 연락드립니다
                  </Text>
                  <Text
                    fontSize={width < 700 ? `0.9rem` : `1.1rem`}
                    color={Theme.darkGrey_C}
                    lineHeight={`1.2`}
                  >
                    (평일 기준)
                  </Text>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`60px`}
                  radius={`12px`}
                  onClick={() => setCurrentTab(1)}
                >
                  확인
                </CommonButton>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </>
      )}
      {currentTab === 1 && (
        <>
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
              ju={`flex-start`}
              position={`relative`}
              al={`flex-start`}
              padding={`30px 0`}
              bgColor={Theme.white_C}
            >
              <Wrapper
                dr={`row`}
                al={`flex-start`}
                ju={`flex-start`}
                margin={`0 0 20px`}
              >
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/bullet/bullet.png`}
                  alt={`bullet_image`}
                  width={`70px`}
                  margin={`0 20px 0 0`}
                />
                <Wrapper width={`auto`} al={`flex-start`}>
                  <GradientText
                    fontSize={`2rem`}
                    lineHeight={`1`}
                    margin={`0 0 10px`}
                    padding={`10px 0 0`}
                  >
                    총알배송
                  </GradientText>
                  <Text fontSize={`1.1rem`} fontWeight={`700`}>
                    요청완료시 다음날 도착
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`} ju={`flex-start`}>
                <Wrapper
                  dr={`row`}
                  al={`center`}
                  ju={`space-between`}
                  height={`100px`}
                  borderBottom={`3px solid ${Theme.lightGrey_C}`}
                >
                  <Text fontSize={`1.4rem`} fontWeight={`700`}>
                    월 00,000원
                  </Text>
                  <QuestionCircleOutlined
                    style={{ fontSize: "1.6rem", color: Theme.darkGrey3_C }}
                  />
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  height={`70px`}
                  borderBottom={`3px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                >
                  <Text fontSize={`1rem`} fontWeight={`700`}>
                    상자 총{" "}
                    {currentHanger + currentIo + currentBig + currentTent}개
                  </Text>
                  <Wrapper width={`auto`} dr={`row`}>
                    <Text
                      color={Theme.red_C}
                      onClick={deleteAllBoxHandler}
                      cursor={`pointer`}
                      margin={`0 10px 0 0`}
                    >
                      전체삭제
                    </Text>
                    <Image
                      src={`https://via.placeholder.com/100x100`}
                      alt={``}
                      width={`1.5rem`}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 40px`}>
                    <Wrapper dr={`row`} width={`auto`}>
                      <Image
                        src={`https://via.placeholder.com/100x100`}
                        alt={`hanger_image`}
                        width={width < 700 ? `40px` : `60px`}
                        margin={width < 700 ? `0 15px 0 0` : `0 30px 0 0`}
                      />
                      <Text fontSize={`1,2rem`}>행거박스(의류용)</Text>
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `100px` : `150px`}
                      height={width < 700 ? `45px` : `60px`}
                      radius={`35px`}
                      padding={`0 15px`}
                      dr={`row`}
                      촘
                      ju={`space-between`}
                      bgColor={Theme.lightGrey_C}
                    >
                      <MinusOutlined
                        style={
                          currentHanger === 0
                            ? { color: "GrayText" }
                            : { color: "black" }
                        }
                        onClick={() => {
                          currentHangerHandler(`minus`);
                        }}
                      />
                      <Text>{currentHanger}</Text>
                      <PlusOutlined
                        onClick={() => {
                          currentHangerHandler(`plus`);
                        }}
                      />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 40px`}>
                    <Wrapper dr={`row`} width={`auto`}>
                      <Image
                        src={`https://via.placeholder.com/100x100`}
                        alt={`iobox_image`}
                        width={width < 700 ? `40px` : `60px`}
                        margin={width < 700 ? `0 15px 0 0` : `0 30px 0 0`}
                      />
                      <Text fontSize={`1,2rem`}>io박스</Text>
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `100px` : `150px`}
                      height={width < 700 ? `45px` : `60px`}
                      radius={`35px`}
                      padding={`0 15px`}
                      dr={`row`}
                      ju={`space-between`}
                      bgColor={Theme.lightGrey_C}
                    >
                      <MinusOutlined
                        style={
                          currentIo === 0
                            ? { color: "GrayText" }
                            : { color: "black" }
                        }
                        onClick={() => {
                          currentIoHandler(`minus`);
                        }}
                      />
                      <Text>{currentIo}</Text>
                      <PlusOutlined
                        onClick={() => {
                          currentIoHandler(`plus`);
                        }}
                      />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 40px`}>
                    <Wrapper dr={`row`} width={`auto`}>
                      <Image
                        src={`https://via.placeholder.com/100x100`}
                        alt={`bigbox_image`}
                        width={width < 700 ? `40px` : `60px`}
                        margin={width < 700 ? `0 15px 0 0` : `0 30px 0 0`}
                      />
                      <Text fontSize={`1,2rem`}>대형박스</Text>
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `100px` : `150px`}
                      height={width < 700 ? `45px` : `60px`}
                      radius={`35px`}
                      padding={`0 15px`}
                      dr={`row`}
                      ju={`space-between`}
                      bgColor={Theme.lightGrey_C}
                    >
                      <MinusOutlined
                        style={
                          currentBig === 0
                            ? { color: "GrayText" }
                            : { color: "black" }
                        }
                        onClick={() => {
                          currentBigHandler(`minus`);
                        }}
                      />
                      <Text>{currentBig}</Text>
                      <PlusOutlined
                        onClick={() => {
                          currentBigHandler(`plus`);
                        }}
                      />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 40px`}>
                    <Wrapper dr={`row`} width={`auto`}>
                      <Image
                        src={`https://via.placeholder.com/100x100`}
                        alt={`tentbox_image`}
                        width={width < 700 ? `40px` : `60px`}
                        margin={width < 700 ? `0 15px 0 0` : `0 30px 0 0`}
                      />
                      <Text fontSize={`1,2rem`}>텐트박스(캠핑용품)</Text>
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `100px` : `150px`}
                      height={width < 700 ? `45px` : `60px`}
                      radius={`35px`}
                      padding={`0 15px`}
                      dr={`row`}
                      ju={`space-between`}
                      bgColor={Theme.lightGrey_C}
                    >
                      <MinusOutlined
                        style={
                          currentTent === 0
                            ? { color: "GrayText" }
                            : { color: "black" }
                        }
                        onClick={() => {
                          currentTentHandler(`minus`);
                        }}
                      />
                      <Text>{currentTent}</Text>
                      <PlusOutlined
                        onClick={() => {
                          currentTentHandler(`plus`);
                        }}
                      />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper margin={`0 0 60px`}>
                  <Wrapper dr={`row`} margin={`0 0 50px`} ju={`flex-start`}>
                    <Text fontSize={`1.7rem`}>보관할 때</Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    margin={`0 0 20px 0`}
                  >
                    <Text fontSize={`1.3rem`}>출발지 주소</Text>

                    <Wrapper
                      width={`20px`}
                      height={`20px`}
                      radius={`50%`}
                      border={`1px solid ${Theme.grey_C}`}
                      color={Theme.grey_C}
                      cursor={`pointer`}
                      margin={`0 0 0 10px`}
                    >
                      <Text margin={`1px 0 0 2px`}>?</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    borderLeft={`2px solid ${Theme.lightGrey_C}`}
                    borderTop={`2px solid ${Theme.lightGrey_C}`}
                    borderRight={`2px solid ${Theme.lightGrey_C}`}
                    padding={`0 10px`}
                  >
                    <TextInput
                      className={`bulletInput`}
                      width={`calc(100% - 2rem )`}
                      height={width < 700 ? `50px` : `80px`}
                      placeholder={`기본 주소`}
                      border={`none`}
                    />
                    <SearchOutlined style={{ fontSize: `2rem` }} />
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    border={`2px solid ${Theme.lightGrey_C}`}
                  >
                    <CustomInput
                      width={`calc(100% - 2rem )`}
                      className={`bulletInput`}
                      height={width < 700 ? `50px` : `80px`}
                      placeholder={`상세 주소 입력(필수/20자이내)`}
                      border={`none`}
                      allowClear={true}
                    />
                    {/* <SearchOutlined style={{ fontSize: `2rem` }} /> */}
                  </Wrapper>
                </Wrapper>
                <Wrapper margin={`0 0 50px`}>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
                    <Text fontSize={`1.2rem`}>층</Text>
                    <Wrapper dr={`row`} width={`auto`} ju={`space-between`}>
                      <GreyCheckbox />
                      <Text margin={`0 0 0 10px`} fontSize={`1.2rem`}>
                        엘리베이터 있음
                      </Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    width={`95%`}
                    height={width < 700 ? `50px` : `70px`}
                    border={`2px solid ${Theme.lightGrey_C}`}
                    onClick={() => setFloorModal(true)}
                  ></Wrapper>
                </Wrapper>
                <Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    height={`60px`}
                    al={`flex-start`}
                    borderBottom={`2px solid ${Theme.lightGrey_C}`}
                  >
                    <Text fontSize={`1.3rem`}>보관 기간</Text>

                    <Wrapper
                      width={`20px`}
                      height={`20px`}
                      radius={`50%`}
                      border={`1px solid ${Theme.grey_C}`}
                      color={Theme.grey_C}
                      cursor={`pointer`}
                      margin={`0 0 0 10px`}
                    >
                      <Text margin={`1px 0 0 2px`}>?</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`35px 0 0 0`}>
                    <CustomRadioGroup
                      value={radioValue}
                      onChange={radioChangeHandler}
                    >
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        borderBottom={`2px solid ${Theme.lightGrey_C}`}
                        padding={`0 0 35px 0`}
                      >
                        <Radio value={0} />
                        <Wrapper
                          width={`auto`}
                          al={`flex-start`}
                          margin={width < 700 ? `0 0 0 10px` : `0 0 0 20px`}
                        >
                          <Text
                            fontSize={width < 700 ? `1.3rem` : `1.5rem`}
                            fontWeight={`700`}
                            color={
                              radioValue === 0 ? Theme.black_C : Theme.grey_C
                            }
                          >
                            선 결재 방식
                          </Text>
                          <Text
                            fontSize={width < 700 ? `1.1rem` : `1.5rem`}
                            fontWeight={`700`}
                            color={
                              radioValue === 0 ? Theme.black_C : Theme.grey_C
                            }
                          >
                            (기간을 정해놓고 보관할래요)
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        height={`130px`}
                        margin={`0 0 50px 0`}
                      >
                        <Radio value={1} />
                        <Wrapper
                          width={`auto`}
                          al={`flex-start`}
                          margin={width < 700 ? `0 0 0 10px` : `0 0 0 20px`}
                        >
                          <Text
                            fontSize={width < 700 ? `1.3rem` : `1.5rem`}
                            fontWeight={`700`}
                            color={
                              radioValue === 1 ? Theme.black_C : Theme.grey_C
                            }
                          >
                            매월 결재 방식
                          </Text>
                          <Text
                            fontSize={width < 700 ? `1.1rem` : `1.5rem`}
                            fontWeight={`700`}
                            color={
                              radioValue === 1 ? Theme.black_C : Theme.grey_C
                            }
                          >
                            (얼마나 보관할지 잘 모르겠어요)
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    </CustomRadioGroup>
                  </Wrapper>
                  <Wrapper
                    margin={`0 0 50px`}
                    opacity={radioValue === 1 ? `0.3` : `1`}
                    dr={`row`}
                    ju={`space-between`}
                  >
                    <Wrapper height={`140px`} width={`auto`}>
                      <Wrapper
                        width={`auto`}
                        color={Theme.subTheme5_C}
                        fontSize={`1.2rem`}
                        fontWeight={`700`}
                        ju={`center`}
                        height={`70px`}
                      >
                        보관 시작
                      </Wrapper>
                      <Wrapper
                        width={`auto`}
                        color={Theme.subTheme5_C}
                        fontSize={`1.2rem`}
                        fontWeight={`700`}
                        ju={`center`}
                        height={`70px`}
                      >
                        보관 종료
                      </Wrapper>
                    </Wrapper>

                    <Wrapper
                      ju={`space-between`}
                      height={`140px`}
                      width={`auto`}
                    >
                      {/* <Wrapper width={`auto`} dr={`row`}>
                        <DatePicker
                          onClick={() =>
                            radioValue === 0
                              ? setDatePickerOpen2((prev) => !prev)
                              : {}
                          }
                          open={radioValue === 1 ? false : datePickerOpen2}
                          onChange={onChange2}
                          format="YYYY-MM-DD"
                          placeholder={`123`}
                          inputReadOnly={radioValue === 1 ? true : false}
                        />
                        <RightOutlined
                          style={{ color: Theme.grey_C }}
                          onClick={() =>
                            radioValue === 0
                              ? setDatePickerOpen2((prev) => !prev)
                              : {}
                          }
                        />
                      </Wrapper> */}
                      {/* <Wrapper width={`auto`} dr={`row`}>
                        <DatePicker
                          onClick={() =>
                            radioValue === 0
                              ? setDatePickerOpen1((prev) => !prev)
                              : {}
                          }
                          open={radioValue === 1 ? false : datePickerOpen1}
                          onChange={onChange1}
                          format="YYYY-MM-DD"
                          placeholder={`123`}
                          inputReadOnly={radioValue === 1 ? true : false}
                        />
                        <RightOutlined
                          style={{ color: Theme.grey_C }}
                          onClick={() =>
                            radioValue === 0
                              ? setDatePickerOpen1((prev) => !prev)
                              : {}
                          }
                        />
                      </Wrapper> */}
                      <RangePicker
                        onChange={dateChangeHandler}
                        separator={true}
                        value={
                          radioValue === 1
                            ? [
                                moment(new Date(), "YYYY-MM-DD"),
                                moment(
                                  new Date(
                                    now.getFullYear(),
                                    now.getMonth(),
                                    now.getDate() + 7
                                  ),
                                  "YYYY-MM-DD"
                                ),
                              ]
                            : [
                                moment(`2021-03-24`, `YYYY-MM-DD`),
                                moment(`2021-03-24`, `YYYY-MM-DD`),
                              ]
                        }
                      />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 20px `}>
                    <Text fontSize={`1.3rem`}>도착지 주소</Text>

                    <Wrapper
                      width={`20px`}
                      height={`20px`}
                      radius={`50%`}
                      border={`1px solid ${Theme.grey_C}`}
                      color={Theme.grey_C}
                      cursor={`pointer`}
                      margin={`0 0 0 10px`}
                    >
                      <Text margin={`1px 0 0 2px`}>?</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    borderLeft={`2px solid ${Theme.lightGrey_C}`}
                    borderTop={`2px solid ${Theme.lightGrey_C}`}
                    borderRight={`2px solid ${Theme.lightGrey_C}`}
                    padding={`0 10px`}
                  >
                    <TextInput
                      className={`bulletInput`}
                      width={`calc(100% - 2rem )`}
                      height={width < 700 ? `50px` : `80px`}
                      placeholder={`기본 주소`}
                      border={`none`}
                    />

                    <SearchOutlined style={{ fontSize: `2rem` }} />
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    border={`2px solid ${Theme.lightGrey_C}`}
                  >
                    <CustomInput
                      width={`calc(100% - 2rem )`}
                      className={`bulletInput`}
                      height={width < 700 ? `50px` : `80px`}
                      placeholder={`상세 주소 입력(필수/20자이내)`}
                      border={`none`}
                      allowClear={true}
                    />
                  </Wrapper>

                  <Wrapper margin={`50px 0`}>
                    <Wrapper
                      dr={`row`}
                      ju={`space-between`}
                      margin={`0 0 30px`}
                    >
                      <Text fontSize={`1.3rem`} color={Theme.darkGrey3_C}>
                        층
                      </Text>
                      <Wrapper dr={`row`} width={`auto`} ju={`space-between`}>
                        <GreyCheckbox />
                        <Text
                          margin={`0 0 0 10px`}
                          fontSize={`1.3rem`}
                          color={Theme.darkGrey3_C}
                        >
                          엘리베이터 있음
                        </Text>
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      width={`95%`}
                      height={width < 700 ? `50px` : `70px`}
                      border={`2px solid ${Theme.lightGrey_C}`}
                      onClick={() => setFloorModal(true)}
                    ></Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
          <Wrapper
            zIndex={`1`}
            position={`sticky`}
            bottom={`0`}
            left={`0`}
            padding={`20px 0`}
            borderTop={`1px solid ${Theme.grey_C}`}
            bgColor={Theme.white_C}
            width={width < 700 ? `100%` : `500px`}
          >
            <RsWrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`auto`}>
                <Text
                  color={Theme.basicTheme_C}
                  cursor={`pointer`}
                  borderBottom={`1px solid ${Theme.basicTheme_C}`}
                >
                  견적 상세 보기
                </Text>
              </Wrapper>
              <CommonButton
                color={Theme.darkGrey_C}
                width={`130px`}
                height={`50px`}
                kindOf={`grey`}
              >
                다음
              </CommonButton>
            </RsWrapper>
          </Wrapper>
        </>
      )}
      <Modal visible={floorModal} closable={false} footer={null}>
        <Wrapper>
          <Wrapper width={`30%`} ju={`flex-start`}>
            <ElevatorSlider />
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-end`} padding={`30px 0`}>
            <TextHover onClick={() => setFloorModal(false)}>취소</TextHover>
            <TextHover onClick={() => setFloorModal(false)}>확인</TextHover>
          </Wrapper>
        </Wrapper>
      </Modal>
    </WholeWrapper>
  );
};

export default Index;
