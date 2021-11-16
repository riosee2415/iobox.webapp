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
} from "antd";
import locale from "antd/lib/locale/zh_CN";

const CustomCheckbox = styled(Checkbox)`
  & .ant-checkbox::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #1890ff;
    border-radius: 2 px;
    visibility: hidden;
    -webkit-animation: antCheckboxEffect 0.36s ease-in-out;
    -moz-animation: antCheckboxEffect 0.36s ease-in-out;
    animation: antCheckboxEffect 0.36s ease-in-out;
    -webkit-animation-fill-mode: backwards;
    -moz-animation-fill-mode: backwards;
    animation-fill-mode: backwards;
    content: "";
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
  // const [floorModal, setFloorModal] = useState(false);

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// DATE //////////
  const now = new Date();
  const currentDate = new Date().toISOString();
  const oneWeekLater = new Date(now.setDate(now.getDate() + 1)).toISOString(); //일주일 후
  const oneMonthLater = new Date(
    now.setMonth(now.getMonth() + 1)
  ).toISOString(); //한달 후

  ////// TOGGLE ///////

  console.log();

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

  ///// HANDLER //////

  const onChange1 = (date, dateString) => {
    setStartDate(dateString);
  };
  const onChange2 = (date, dateString) => {
    setEndDate(dateString);
  };

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
            margin={`60px 0 110px`}
          >
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/bullet/bullet.png`}
              alt={`bullet_image`}
              width={`70px`}
              margin={`0 20px 0 0`}
            />
            <Wrapper width={`auto`} al={`flex-start`}>
              <GradientText
                fontSize={`2.4rem`}
                lineHeight={`1`}
                margin={`0 0 10px`}
              >
                총알배송
              </GradientText>
              <Text fontSize={`1.3rem`} fontWeight={`700`}>
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
              <QuestionCircleOutlined width={`30px`} />
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              height={`70px`}
              borderBottom={`3px solid ${Theme.lightGrey_C}`}
              margin={`0 0 30px`}
            >
              <Text fontSize={`1rem`} fontWeight={`700`}>
                상자 총 {currentHanger + currentIo + currentBig + currentTent}개
              </Text>
              <Wrapper width={`auto`}>
                <Text
                  color={Theme.red_C}
                  onClick={deleteAllBoxHandler}
                  cursor={`pointer`}
                >
                  전체삭제
                </Text>
                <Image src={``} alt={``} width={`30px`} />
              </Wrapper>
            </Wrapper>

            <Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 40px`}>
                <Wrapper dr={`row`} width={`auto`}>
                  <Image src={``} alt={`hanger_image`} width={`30px`} />
                  <Text fontSize={`1,2rem`}>행거박스(의류용)</Text>
                </Wrapper>
                <Wrapper
                  width={`150px`}
                  height={`60px`}
                  radius={`35px`}
                  padding={`0 15px`}
                  dr={`row`}
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
                  <Image src={``} alt={`iobox_image`} width={`30px`} />
                  <Text fontSize={`1,2rem`}>io박스</Text>
                </Wrapper>
                <Wrapper
                  width={`150px`}
                  height={`60px`}
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
                  <Image src={``} alt={`bigbox_image`} width={`30px`} />
                  <Text fontSize={`1,2rem`}>대형박스</Text>
                </Wrapper>
                <Wrapper
                  width={`150px`}
                  height={`60px`}
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
                  <Image src={``} alt={`tentbox_image`} width={`30px`} />
                  <Text fontSize={`1,2rem`}>텐트박스(캠핑용품)</Text>
                </Wrapper>
                <Wrapper
                  width={`150px`}
                  height={`60px`}
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
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 20px 0`}>
                <Text fontSize={`1.3rem`}>출발지 주소</Text>
                <QuestionCircleOutlined />
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
                  height={`80px`}
                  placeholder={`기본 주소`}
                  border={`none`}
                />
                <SearchOutlined style={{ fontSize: `2rem` }} />
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                border={`2px solid ${Theme.lightGrey_C}`}
                padding={`0 10px`}
              >
                <TextInput
                  width={`calc(100% - 2rem )`}
                  className={`bulletInput`}
                  height={`80px`}
                  placeholder={`상세 주소 입력(필수/20자이내)`}
                  border={`none`}
                />
                <SearchOutlined style={{ fontSize: `2rem` }} />
              </Wrapper>
            </Wrapper>
            <Wrapper margin={`0 0 50px`}>
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
                <Text fontSize={`1.2rem`}>층</Text>
                <Wrapper dr={`row`} width={`auto`} ju={`space-between`}>
                  <Checkbox />
                  <Text margin={`0 0 0 10px`} fontSize={`1.2rem`}>
                    엘리베이터 있음
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={`95%`}
                height={`70px`}
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
                <QuestionCircleOutlined />
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`35px 0 0 0`}>
                <CustomRadioGroup>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`2px solid ${Theme.lightGrey_C}`}
                    padding={`0 0 35px 0`}
                  >
                    <Radio />
                    <Wrapper width={`auto`} al={`flex-start`}>
                      <Text fontSize={`1.5rem`} fontWeight={`700`}>
                        선 결재 방식
                      </Text>
                      <Text fontSize={`1.5rem`} fontWeight={`700`}>
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
                    <CustomRadio value="1" margin={`0 20px 0 0`}></CustomRadio>
                    <Wrapper width={`auto`} al={`flex-start`}>
                      <Text fontSize={`1.6rem`} fontWeight={`700`}>
                        매월 결재 방식
                      </Text>
                      <Text fontSize={`1.6rem`} fontWeight={`700`}>
                        (얼마나 보관할지 잘 모르겠어요)
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </CustomRadioGroup>
              </Wrapper>
              <Wrapper margin={`0 0 50px`}>
                <Wrapper dr={`row`} ju={`space-between`} height={`70px`}>
                  <Text
                    color={Theme.subTheme5_C}
                    fontSize={`1.2rem`}
                    fontWeight={`700`}
                  >
                    보관 시작
                  </Text>
                  <Wrapper width={`auto`} dr={`row`}>
                    <Wrapper position={`relative`} width={`auto`}>
                      <DatePicker
                        open={datePickerOpen1}
                        onClick={() => setDatePickerOpen1((prev) => !prev)}
                        onChange={onChange1}
                        format="YYYY-MM-DD"
                        defaultValue={moment("2015-01-01")}
                        placeholder={`123`}
                      />
                      <RightOutlinedAbsol
                        style={{ color: Theme.grey_C }}
                        onClick={() => setDatePickerOpen1((prev) => !prev)}
                      />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-between`} height={`70px`}>
                  <Text
                    color={Theme.subTheme5_C}
                    fontSize={`1.2rem`}
                    fontWeight={`700`}
                  >
                    보관 종료
                  </Text>
                  <Wrapper width={`auto`} dr={`row`}>
                    <DatePicker
                      onClick={() => setDatePickerOpen2((prev) => !prev)}
                      open={datePickerOpen2}
                      onChange={onChange2}
                      format="YYYY-MM-DD"
                      placeholder={`123`}
                    />
                    <RightOutlined
                      style={{ color: Theme.grey_C }}
                      onClick={() => setDatePickerOpen2((prev) => !prev)}
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 20px `}>
                <Text fontSize={`1.3rem`}>도착지 주소</Text>
                <QuestionCircleOutlined />
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
                  height={`80px`}
                  placeholder={`기본 주소`}
                  border={`none`}
                />
                <SearchOutlined style={{ fontSize: `2rem` }} />
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`space-between`}
                border={`2px solid ${Theme.lightGrey_C}`}
                padding={`0 10px`}
              >
                <TextInput
                  width={`calc(100% - 2rem )`}
                  className={`bulletInput`}
                  height={`80px`}
                  placeholder={`상세 주소 입력(필수/20자이내)`}
                  border={`none`}
                />
                <SearchOutlined style={{ fontSize: `2rem` }} />
              </Wrapper>

              <Wrapper margin={`50px 0`}>
                <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
                  <Text fontSize={`1.3rem`} color={Theme.darkGrey3_C}>
                    층
                  </Text>
                  <Wrapper dr={`row`} width={`auto`} ju={`space-between`}>
                    <Checkbox />
                    <Text
                      margin={`0 0 0 10px`}
                      fontSize={`1.3rem`}
                      color={Theme.darkGrey3_C}
                    >
                      엘리베이터 있음
                    </Text>
                  </Wrapper>
                </Wrapper>
                <TextInput
                  width={`95%`}
                  height={`70px`}
                  border={`2px solid ${Theme.lightGrey_C}`}
                />
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
            <Text color={Theme.basicTheme_C} cursor={`pointer`}>
              <u>견적 상세 보기</u>
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

      <Modal visible={floorModal} closable={false} footer={null}>
        <Wrapper>
          <Wrapper
            overflow={`auto`}
            width={`30%`}
            maxHeight={`300px`}
            bgColor={`red`}
            ju={`flex-start`}
          >
            <Wrapper height={`auto`}>
              <Wrapper ju={`center`}>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  -4층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  -3층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  -2층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  -1층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  1층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  2층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  3층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  4층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  5층
                </Wrapper>
                <Wrapper height={`90px`} bgColor={`blue`} margin={`0 0 10px`}>
                  6층
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text onClick={() => setFloorModal(false)}>취소</Text>
            <Text onClick={() => setFloorModal(false)}>확인</Text>
          </Wrapper>
        </Wrapper>
      </Modal>
    </WholeWrapper>
  );
};

export default Index;
