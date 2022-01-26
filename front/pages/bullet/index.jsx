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
  Question,
  IoBoxWrapper,
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
  DeleteOutlined,
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
  message,
} from "antd";
import locale from "antd/lib/locale/zh_CN";
import ElevatorSlider from "../../components/slide/ElevatorSlider";
import Footer from "../../components/Footer";
import { numberWithCommas } from "../../components/commonUtils";
import PostCode from "../../components/postCode/PostCode";
import useInput from "../../hooks/useInput";

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

  const dataArr = [
    //
    [
      "행거박스",
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/img-hanger.png",
      "월",
      19000,
    ],
    [
      "행거박스 plus+",
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/img-hanger-plus.png",
      "월",
      39000,
    ],
    [
      "텐트박스",
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/img-tent-box.png",
      "월",
      39000,
    ],
    [
      "텐트박스 plus+",
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/icon2/img-camping-plus.png",
      "월",
      59000,
    ],
  ];

  const CHECK_ADDRESS = ["의정부", "서울", "양주"];

  ////// HOOKS //////

  const [price, setPrice] = useState(0);
  const [currentBuy, setCurrentBuy] = useState([0, 0, 0, 0]);

  const [cardInput, setCardInput] = useState(false);
  const [dayInput, setDayInput] = useState(false);

  const [currentHanger, setCurrentHanger] = useState(0);
  const [currentIo, setCurrentIo] = useState(0);
  const [currentBig, setCurrentBig] = useState(0);
  const [currentTent, setCurrentTent] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [floorModal, setFloorModal] = useState(false);

  const [startFloor, setStartFloor] = useState(false);
  const [endFloor, setEndFloor] = useState(false);

  const [datePickerOpen1, setDatePickerOpen1] = useState(false);
  const [datePickerOpen2, setDatePickerOpen2] = useState(false);

  const [radioValue, setRadioValue] = useState(1);

  const [isPostCode, setIsPostCode] = useState(false);

  const [address, setAddress] = useState(null);

  const inputStartAddress = useInput("");
  const inputStartZoneCode = useInput("");
  const inputStartDetail = useInput("");

  const inputEndAddress = useInput("");
  const inputEndZoneCode = useInput("");
  const inputEndDetail = useInput("");

  // const [floorModal, setFloorModal] = useState(false);

  const [currentTab, setCurrentTab] = useState(0);

  ////// REDUX //////
  const router = useRouter();

  ////// USEEFFECT //////
  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    let currentPay = 0;

    currentBuy.map((data, idx) => {
      currentPay += data * dataArr[idx][3];
    });

    setPrice(currentPay);
  }, [currentBuy]);

  ////// DATE //////////
  const now = new Date();
  const currentDate = new Date();
  //일주일 후
  //한달 후

  ////// TOGGLE ///////
  const togglePostCodeDialogHandler = () => {
    setIsPostCode(!isPostCode);
  };

  const currentHangerHandler = useCallback(
    (pm, index) => {
      const tempArr = currentBuy.map((data, idx) => {
        return idx === index ? (data + pm * 1 >= 0 ? data + pm * 1 : 0) : data;
      });
      setCurrentBuy(tempArr);
    },
    [currentBuy]
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

  const deleteAllBoxHandler = useCallback(() => {
    setCurrentBuy([0, 0, 0, 0]);
  }, []);

  const dateChangeHandler = useCallback(
    (e) => {
      console.log(e);
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
      setRadioValue(e.target.value);
    },
    [radioValue]
  );

  const blurHandler = useCallback(() => {
    setCardInput(false);
    setDayInput(false);
  }, [cardInput]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const nextStepHandler = useCallback(() => {
    console.log(
      currentBuy,
      startDate,
      endDate,
      startFloor,
      endFloor,
      inputStartAddress,
      inputStartZoneCode,
      inputStartDetail,
      inputEndAddress,
      inputEndZoneCode,
      inputEndDetail
    );
  }, [
    currentBuy,
    startDate,
    endDate,
    startFloor,
    endFloor,
    inputStartAddress,
    inputStartZoneCode,
    inputStartDetail,
    inputEndAddress,
    inputEndZoneCode,
    inputEndDetail,
  ]);

  ////// DATAVIEW //////
  return (
    <WholeWrapper bgColor={width < 700 ? Theme.white_C : Theme.lightGrey_C}>
      {currentTab === 0 && (
        <>
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
              onClick={() => {
                moveLinkHandler("/");
              }}
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
                    하루배송은
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
            <Footer />
          </IoBoxWrapper>
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
              onClick={() => moveLinkHandler(`main`)}
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
                    월 {numberWithCommas(price)}원
                  </Text>

                  <Question>
                    <Text margin={`1px 0 0 2px`}>?</Text>
                  </Question>
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
                    {currentBuy[0] +
                      currentBuy[1] +
                      currentBuy[2] +
                      currentBuy[3]}
                    개
                  </Text>
                  <Wrapper width={`auto`} dr={`row`} color={Theme.red_C}>
                    <Text
                      onClick={deleteAllBoxHandler}
                      cursor={`pointer`}
                      margin={`0 10px 0 0`}
                    >
                      전체삭제
                    </Text>
                    <DeleteOutlined />
                  </Wrapper>
                </Wrapper>

                <Wrapper>
                  {dataArr.map((data, idx) => {
                    return (
                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        margin={`0 0 40px`}
                      >
                        <Wrapper dr={`row`} width={`auto`}>
                          <Image
                            src={data[1]}
                            alt={`hanger_image`}
                            width={width < 700 ? `40px` : `60px`}
                            margin={width < 700 ? `0 15px 0 0` : `0 30px 0 0`}
                          />
                          <Text fontSize={`1,2rem`}>{data[0]}</Text>
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
                              currentHangerHandler(-1, idx);
                            }}
                          />
                          <Text>{currentBuy[idx]}</Text>
                          <PlusOutlined
                            onClick={() => {
                              currentHangerHandler(+1, idx);
                            }}
                          />
                        </Wrapper>
                      </Wrapper>
                    );
                  })}
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

                    <Question>
                      <Text margin={`1px 0 0 2px`}>?</Text>
                    </Question>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    borderLeft={`2px solid ${Theme.lightGrey_C}`}
                    borderTop={`2px solid ${Theme.lightGrey_C}`}
                    borderRight={`2px solid ${Theme.lightGrey_C}`}
                    position={`relative`}
                    height={width < 700 ? `50px` : `80px`}
                  >
                    <TextInput
                      className={`bulletInput`}
                      width={`100%`}
                      height={`100%`}
                      placeholder={`기본 주소`}
                      border={`none`}
                      readOnly
                      value={inputStartAddress.value}
                    />

                    <Wrapper
                      width={`auto`}
                      position={`absolute`}
                      top={`0`}
                      right={`5px`}
                      height={`100%`}
                    >
                      <SearchOutlined
                        style={{ fontSize: `2rem` }}
                        onClick={() => {
                          setIsPostCode(true);
                          setAddress("start");
                        }}
                      />
                    </Wrapper>
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
                      {...inputStartDetail}
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
                    onClick={() => {
                      setFloorModal("start");
                    }}
                    cursor={`pointer`}
                  >
                    {startFloor}
                  </Wrapper>
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

                    <Question>
                      <Text margin={`1px 0 0 2px`}>?</Text>
                    </Question>
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
                      {radioValue === 0 && (
                        <RangePicker
                          onChange={dateChangeHandler}
                          separator={true}
                          defaultValue={[
                            moment(new Date(), "YYYY-MM-DD"),
                            moment(
                              new Date(
                                now.getFullYear(),
                                now.getMonth(),
                                now.getDate() + 7
                              ),
                              "YYYY-MM-DD"
                            ),
                          ]}
                        />
                      )}
                      {radioValue === 1 && (
                        <RangePicker
                          // onChange={dateChangeHandler}
                          open={false}
                          readOnly={true}
                          separator={true}
                          defaultValue={
                            radioValue === 0 && [
                              moment(new Date(), "YYYY-MM-DD"),
                              moment(
                                new Date(
                                  now.getFullYear(),
                                  now.getMonth() + 1,
                                  now.getDate()
                                ),
                                "YYYY-MM-DD"
                              ),
                            ]
                          }
                          value={[
                            moment(new Date(), "YYYY-MM-DD"),
                            moment(
                              new Date(
                                now.getFullYear(),
                                now.getMonth() + 1,
                                now.getDate()
                              ),
                              "YYYY-MM-DD"
                            ),
                          ]}
                        />
                      )}
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 20px `}>
                    <Text fontSize={`1.3rem`}>도착지 주소</Text>

                    <Question>
                      <Text margin={`1px 0 0 2px`}>?</Text>
                    </Question>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    borderLeft={`2px solid ${Theme.lightGrey_C}`}
                    borderTop={`2px solid ${Theme.lightGrey_C}`}
                    borderRight={`2px solid ${Theme.lightGrey_C}`}
                    height={width < 700 ? `50px` : `80px`}
                    position={`relative`}
                  >
                    <TextInput
                      className={`bulletInput`}
                      width={`100%`}
                      placeholder={`기본 주소`}
                      height={`100%`}
                      border={`none`}
                      readOnly
                      value={inputEndAddress.value}
                    />

                    <Wrapper
                      width={`auto`}
                      fontSize={`2rem`}
                      position={`absolute`}
                      height={`100%`}
                      top={`0`}
                      right={`5px`}
                    >
                      <SearchOutlined
                        onClick={() => {
                          setIsPostCode(true);
                          setAddress("end");
                        }}
                      />
                    </Wrapper>
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
                      {...inputEndDetail}
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
                      onClick={() => setFloorModal("end")}
                      cursor={`pointer`}
                    >
                      {endFloor}
                    </Wrapper>
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
                onClick={nextStepHandler}
              >
                다음
              </CommonButton>
            </RsWrapper>
          </Wrapper>
          <Footer />
        </>
      )}

      <Modal
        visible={floorModal}
        closable={false}
        footer={null}
        width={width < 700 ? 250 : 400}
      >
        <Wrapper>
          <Wrapper width={`30%`} ju={`flex-start`}>
            <ElevatorSlider
              setValue={floorModal === "start" ? setStartFloor : setEndFloor}
            />
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-end`} padding={`30px 0`}>
            <TextHover onClick={() => setFloorModal(false)}>취소</TextHover>
            <TextHover onClick={() => setFloorModal(false)}>확인</TextHover>
          </Wrapper>
        </Wrapper>
      </Modal>

      <PostCode
        width={width}
        //
        address={address}
        isPostCode={isPostCode}
        //
        toggleDialogHandler={togglePostCodeDialogHandler}
        onCompleteHandler={(data, address) => {
          let isCheck = false;
          for (let i = 0; i < CHECK_ADDRESS.length; i++) {
            if (data.address.includes(CHECK_ADDRESS[i])) {
              isCheck = true;
            }
          }

          if (isCheck) {
            if (address === "start") {
              inputStartAddress.setValue(data.address);
              inputStartZoneCode.setValue(data.zonecode);
            } else {
              inputEndAddress.setValue(data.address);
              inputEndZoneCode.setValue(data.zonecode);
            }

            togglePostCodeDialogHandler();
          } else {
            message.error("서비스 이용 불가능 지역입니다.");
          }
        }}
      />
    </WholeWrapper>
  );
};

export default Index;
