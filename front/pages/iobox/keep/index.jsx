import React, { useCallback, useEffect, useState } from "react";
import Theme from "../../../components/Theme";
import {
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  Image,
  CommonButton,
  TextInput,
  TextArea,
  Canceal,
  IoBoxWrapper,
} from "../../../components/commonComponents";
import styled from "styled-components";
import ClientLayout from "../../../components/ClientLayout";
import useWidth from "../../../hooks/useWidth";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { message, notification, Radio } from "antd";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import useInput from "../../../hooks/useInput";
import PostCode from "../../../components/postCode/PostCode";
import { numberWithCommas } from "../../../components/commonUtils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SUBSCRIPTION_CREATE_REQUEST } from "../../../reducers/subscription";
import { USER_CARD_CREATE_REQUEST } from "../../../reducers/user";
import Footer from "../../../components/Footer";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { KEEPBOX_CREATE_REQUEST } from "../../../reducers/keepBox";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import useOnlyNumberInput from "../../../hooks/useOnlyNumberInput";

const FocusInput = styled(TextInput)`
  width: ${(props) => props.width || `calc(100% / 4)`};
  height: 40px;
  padding: 10px;
  border: none !important;
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const PayButtton = styled(Wrapper)`
  color: ${Theme.basicTheme_C};
  width: auto;
  font-size: 1.2rem;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${Theme.basicTheme_C};
  }

  &:hover {
    font-size: 1.4rem;
  }
`;

const Index = () => {
  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  const [cardNum, setCardNum] = useState(null);

  const inputName = useInput("");
  const inputMobile = useInput("");
  const inputAddress = useInput("");
  const inputZoneCode = useInput("");
  const inputDetail = useInput("");
  const inputContent = useInput("");
  const [storeData, setStoreData] = useState(null);

  const [isPostCode, setIsPostCode] = useState(false);

  const [isCardInfo, setIsCardInfo] = useState(false);

  // card area

  const [tab, setTab] = useState(false);

  const [cardInput, setCardInput] = useState(false);
  const [dayInput, setDayInput] = useState(false);

  const inputCardNum1 = useOnlyNumberInput(``);
  const inputCardNum2 = useOnlyNumberInput(``);
  const inputCardNum3 = useOnlyNumberInput(``);
  const inputCardNum4 = useOnlyNumberInput(``);
  const inputCardPeriodMM = useOnlyNumberInput(``);
  const inputCardPeriodYY = useOnlyNumberInput(``);
  const inputCardIden = useOnlyNumberInput(``);
  const inputCardNumPassword = useOnlyNumberInput(``);

  ////// REDUX //////
  const dispatch = useDispatch();

  const { me, st_userCardCreateDone, st_userCardCreateError } = useSelector(
    (state) => state.user
  );




  const { createInfo, st_keepBoxCreateDone, st_keepBoxCreateError } =
    useSelector((state) => state.keepBox);

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_keepBoxCreateDone && createInfo) {
      router.push(`/finish?id=${createInfo[0]}`);
    }
  }, [st_keepBoxCreateDone, createInfo]);

  useEffect(() => {
    if (st_keepBoxCreateError) {
      return message.error(st_keepBoxCreateError);
    }
  }, [st_keepBoxCreateError]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [router.route]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("DATA"));

    if (!data) {
      router.push("/");
      return;
    }

    setStoreData(data);
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [router.query]);

  useEffect(() => {
    if (!me) {
      router.push("/");

      return LoadNotification("로그인 후 이용해주세요.");
    }
    if (me) {
      if (me.cardNum) {
        setCardNum(
          me.cardNum.substring(0, 4) + me.cardNum.substring(4, 8) + "********"
        );
      }

      if (me.nickname) {
        inputName.setValue(me.nickname);
      }
      console.log(me);
    }
  }, [me]);

  // card area

  useEffect(() => {
    if (me && me.cardNum) {
      inputCardNum1.setValue(me.cardNum.substring(0, 4));
      inputCardNum2.setValue(me.cardNum.substring(4, 8));
      inputCardNum3.setValue(me.cardNum.substring(8, 12));
      inputCardNum4.setValue(me.cardNum.substring(12, 16));

      inputCardPeriodMM.setValue(me.cardPeriod.substring(5, 7));
      inputCardPeriodYY.setValue(me.cardPeriod.substring(2, 4));
      inputCardIden.setValue(me.cardIden);
      inputCardNumPassword.setValue(me.cardPassword);
    }
  }, [me]);

  useEffect(() => {
    if (st_userCardCreateError) {
      return LoadNotification(st_userCardCreateError);
    }
  }, [st_userCardCreateError]);

  useEffect(() => {
    if (st_userCardCreateDone) {
      setIsCardInfo(false)
      LoadNotification("카드정보가 등록되었습니다.");
    }
  }, [st_userCardCreateDone]);


  ////// TOGGLE ///////

  // card area
  const cardInputToggle = useCallback(() => {
    setCardInput(true);
  }, [cardInput]);

  const dayInputToggle = useCallback(() => {
    setDayInput(true);
  }, [dayInput]);

  ///// HANDLER //////
  const [isCheck, setIsCheck] = useState(false);
  const togglePostCodeDialogHandler = () => {
    setIsPostCode(!isPostCode);
  };

  const moveBackHandler = useCallback(() => {
    router.back();
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  console.log(me && me.userId);

  const handleFormSubmit = useCallback(() => {
    // dispatch({
    //   type: SUBSCRIPTION_CREATE_REQUEST,
    //   data: {
    //     // 카드번호
    //     cardNumber: me && me.cardNum,
    //     // 유효기간
    //     expiry: me && me.cardPeriod,
    //     // 생년월일
    //     birth: me && me.cardIden,
    //     // 비밀번호 앞 두자리
    //     pwd2Digit: me && me.cardPassword,
    //     // 고유 코드
    //     customer_uid: me && me.userId,
    //   },
    // });

    if (!inputName.value || inputName.value.trim() === "") {
      return message.error("이름을 입력해주세요.");
    }
    if (!inputMobile.value || inputMobile.value.trim() === "") {
      return message.error("전화번호를 입력해주세요.");
    }
    if (!inputAddress.value || inputAddress.value.trim() === "") {
      return message.error("주소를 입력해주세요.");
    }
    if (!inputDetail.value || inputDetail.value.trim() === "") {
      return message.error("상세주소를 입력해주세요.");
    }

    const d = new Date();
    let year = d.getFullYear() + "";
    let month = d.getMonth() + 1 + "";
    let date = d.getDate() + "";
    let hour = d.getHours() + "";
    let min = d.getMinutes() + "";
    let sec = d.getSeconds() + "";
    let mSec = d.getMilliseconds() + "";
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    mSec = mSec < 10 ? "0" + mSec : mSec;
    let orderPK = "ORD" + year + month + date + hour + min + sec + mSec;
    const IMP = window.IMP;
    IMP.request_pay(
      {
        pay_method: "card",
        buyer_name: inputName.value,
        buyer_mobile: inputMobile.value,
        merchant_uid: orderPK,
        name: "상자",
        amount: storeData.totalPay + "",
      },
      async (rsp) => {
        if (rsp.success) {
          dispatch({
            type: KEEPBOX_CREATE_REQUEST,
            data: {
              type: "일반 배송",
              boxcount1: storeData.boxs[0],
              boxcount2: storeData.boxs[1],
              boxcount3: storeData.boxs[2],
              boxcount4: storeData.boxs[3],
              period: storeData.type,
              isFilming: storeData.isCapture,
              pickWay: storeData.pickUp,
              price:
                storeData.totalPay -
                (storeData.type === "정기" ? storeData.totalPay * 0.1 : 0),
              deliveryPay: storeData.pickUpPrice,
              name: inputName.value,
              mobile: inputMobile.value,
              address: inputAddress.value,
              detailAddress: inputDetail.value,
              remark: inputContent.value,
              UserId: me.id,
            },
          });
        } else {
          console.log(rsp.error_msg);
          if (rsp.error_msg !== "사용자가 결제를 취소하셨습니다") {
          }
        }
      }
    );
  }, [
    storeData,
    inputName,
    inputMobile,
    inputAddress,
    inputDetail,
    inputContent,
    me,
  ]);

  // card area

  const blurHandler = useCallback(() => {
    setCardInput(false);
    setDayInput(false);
  }, [cardInput]);

  const cardInfoHandler = useCallback(() => {
    console.log(
      inputCardNum1.value +
        "-" +
        inputCardNum2.value +
        "-" +
        inputCardNum3.value +
        "-" +
        inputCardNum4.value
    );

    console.log(
      inputCardNum1.value,
      inputCardNum2.value,
      inputCardNum3.value,
      inputCardNum4.value,
      inputCardPeriodMM.value,
      inputCardPeriodYY.value,
      inputCardIden.value,
      inputCardNumPassword.value
    );
    dispatch({
      type: USER_CARD_CREATE_REQUEST,
      data: {
        cardNum:
          inputCardNum1.value +
          inputCardNum2.value +
          inputCardNum3.value +
          inputCardNum4.value,
        cardPeriod:
          "20" + inputCardPeriodYY.value + "-" + inputCardPeriodMM.value,
        cardIden: inputCardIden.value,
        cardPassword: inputCardNumPassword.value,
      },
    });
  }, [
    inputCardNum1,
    inputCardNum2,
    inputCardNum3,
    inputCardNum4,
    inputCardPeriodMM,
    inputCardPeriodYY,
    inputCardIden,
    inputCardNumPassword,
  ]);

  ////// DATAVIEW //////

  if (!storeData) {
    return null;
  }
  return !isCardInfo ? (
    <>
      <WholeWrapper bgColor={Theme.lightGrey_C}>
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
            fontSize={`18px`}
            cursor={`pointer`}
            onClick={() => {
              moveLinkHandler("/main");
              sessionStorage.removeItem("DATA");
            }}
            zIndex={`100`}
          >
            <CloseOutlined />
          </Wrapper>
          <RsWrapper
            minHeight={`100vh`}
            ju={`flex-start`}
            position={`relative`}
            al={`flex-start`}
            padding={`30px 0`}
          >
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/payment/history.png`}
                width={`20px`}
                margin={`0 10px 0 0`}
              />
              <Text bold={true} fontSize={`1.5rem`} bold={true}>
                예약 내역
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              margin={`30px 0 0`}
              padding={`10px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text fontSize={`1.2rem`} fontWeight={`700`}>
                보관함
              </Text>
              <Text>상자</Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} padding={`10px 0`}>
              <Text fontSize={`1.2rem`} fontWeight={`700`}>
                팍업방식
              </Text>
              <Text>{storeData.pickUp}</Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`10px 0`}
              borderBottom={`1px solid ${Theme.grey_C}`}
            >
              <Text fontSize={`1.2rem`} fontWeight={`700`}>
                쿠폰할인
              </Text>
              <Text fontSize={`1.5rem`} fontWeight={`700`}>
                0원
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} padding={`10px 0`}>
              <Wrapper dr={`row`} width={`auto`} ju={`flex-start`}>
                <Text fontSize={`1.2rem`} fontWeight={`700`}>
                  월 예상 결제 금액
                </Text>

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
              <Text fontSize={`1.5rem`} fontWeight={`700`}>
                {numberWithCommas(
                  storeData.totalPay -
                    (storeData.type === "정기" ? storeData.totalPay * 0.1 : 0)
                )}
                원
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} padding={`10px 0`}>
              <Wrapper dr={`row`} width={`auto`} ju={`flex-start`}>
                <Text fontSize={`1.2rem`} fontWeight={`700`}>
                  배송비
                </Text>
              </Wrapper>
              <Text fontSize={`1.5rem`} fontWeight={`700`}>
                {numberWithCommas(storeData.pickUpPrice)}원
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`20px 0`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/payment/avatar.png`}
                width={`25px`}
                margin={`0 10px 0 0`}
              />
              <Text bold={true} fontSize={`1.5rem`} bold={true}>
                예약자 정보
              </Text>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 20px`}>
              <Text margin={`0 0 5px`}>이름</Text>
              <Wrapper position={`relative`}>
                <TextInput
                  width={`100%`}
                  height={`50px`}
                  placeholder="이름을 적어주세요."
                  {...inputName}
                />

                <Wrapper
                  width={`auto`}
                  position={`absolute`}
                  top={`15px`}
                  right={`10px`}
                  fontSize={`18px`}
                  cursor={`pointer`}
                >
                  <Canceal onClick={() => inputName.setValue("")}>
                    <CloseOutlined />
                  </Canceal>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 20px`}>
              <Text margin={`0 0 5px`}>전화번호</Text>
              <Wrapper position={`relative`}>
                <TextInput
                  width={`100%`}
                  height={`50px`}
                  placeholder="전화번호를 적어주세요."
                  {...inputMobile}
                />

                <Wrapper
                  width={`auto`}
                  position={`absolute`}
                  top={`15px`}
                  right={`10px`}
                  fontSize={`18px`}
                  cursor={`pointer`}
                >
                  <Canceal onClick={() => inputMobile.setValue("")}>
                    <CloseOutlined />
                  </Canceal>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 20px`}>
              <Text margin={`0 0 5px`}>주소</Text>

              <Wrapper>
                <Wrapper position={`relative`}>
                  <TextInput
                    width={`100%`}
                    height={`50px`}
                    readOnly
                    placeholder="주소를 적어주세요."
                    {...inputAddress}
                  />

                  <Wrapper
                    width={`auto`}
                    position={`absolute`}
                    top={`15px`}
                    right={`10px`}
                    fontSize={`20px`}
                    cursor={`pointer`}
                    onClick={() => togglePostCodeDialogHandler()}
                  >
                    <SearchOutlined />
                  </Wrapper>
                </Wrapper>
                <Wrapper position={`relative`}>
                  <TextInput
                    width={`100%`}
                    height={`50px`}
                    placeholder="주소를 적어주세요."
                    {...inputDetail}
                    borderTop={`none`}
                  />

                  <Wrapper
                    width={`auto`}
                    position={`absolute`}
                    top={`15px`}
                    right={`10px`}
                    fontSize={`18px`}
                    cursor={`pointer`}
                  >
                    <Canceal onClick={() => inputDetail.setValue("")}>
                      <CloseOutlined />
                    </Canceal>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 20px`}>
              <Text margin={`0 0 5px`}>특이사항</Text>
              <TextArea
                width={`100%`}
                radius={`0`}
                placeholder="특정시간 방문 요청 불가"
                {...inputContent}
              />
            </Wrapper>

            <Wrapper bgColor={Theme.lightGrey_C} height={`10px`}></Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`20px 0`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/payment/pay.png`}
                width={`30px`}
                margin={`0 10px 0 0`}
              />
              <Text bold={true} fontSize={`1.5rem`} bold={true}>
                결제 카드
              </Text>
            </Wrapper>

            <Wrapper
              padding={`20px`}
              dr={`row`}
              border={`1px solid ${Theme.grey_C}`}
              ju={`space-between`}
            >
              <Text>
                {cardNum && cardNum === null
                  ? "등록된 카드가 없습니다"
                  : cardNum && cardNum}
              </Text>

              <CommonButton
                width={`60px`}
                height={`30px`}
                onClick={() => setIsCardInfo(true)}
              >
                변경
              </CommonButton>
            </Wrapper>

            <Wrapper
              bgColor={Theme.lightGrey_C}
              height={`10px`}
              margin={`20px 0`}
            ></Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/iobox/assets/images/payment/check.png`}
                width={`25px`}
                margin={`0 10px 0 0`}
              />
              <Text bold={true} fontSize={`1.5rem`} bold={true}>
                이용 동의
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`20px 0 0`}>
              <Text cursor={`pointer`} onClick={() => setIsCheck(!isCheck)}>
                서비스 이용 필수 동의
              </Text>
              <Radio checked={isCheck} onClick={() => setIsCheck(!isCheck)} />
            </Wrapper>
          </RsWrapper>
        </IoBoxWrapper>
      </WholeWrapper>

      <Wrapper
        position={`sticky`}
        bottom={`0`}
        left={`0`}
        bgColor={Theme.lightGrey_C}
        zIndex={`1000`}
      >
        <IoBoxWrapper bgColor={Theme.white_C} padding={`20px 0`}>
          <RsWrapper>
            <Wrapper
              width={`auto`}
              al={`flex-start`}
              zIndex={`100`}
              cursor={`pointer`}
            >
              <PayButtton bold={true} margin={`0 0 10px`}>
                예상금액 상세
              </PayButtton>
            </Wrapper>

            <Wrapper dr={`row`}>
              <CommonButton
                width={`80px`}
                height={`50px`}
                onClick={moveBackHandler}
                kindOf={`white`}
                margin={`0 5px 0 0`}
              >
                이전
              </CommonButton>
              <CommonButton
                width={`calc(100% - 80px - 5px)`}
                height={`50px`}
                onClick={handleFormSubmit}
              >
                {numberWithCommas(
                  storeData.totalPay -
                    (storeData.type === "정기" ? storeData.totalPay * 0.1 : 0)
                )}{" "}
                원 결제하기
              </CommonButton>
            </Wrapper>
          </RsWrapper>
        </IoBoxWrapper>
      </Wrapper>

      <Wrapper bgColor={Theme.lightGrey_C}>
        <Footer />
      </Wrapper>

      <PostCode
        width={width}
        //
        isPostCode={isPostCode}
        address={"start"}
        //
        toggleDialogHandler={togglePostCodeDialogHandler}
        onCompleteHandler={async (data) => {
          inputAddress.setValue(data.address);
          inputZoneCode.setValue(data.zonecode);
          setIsPostCode(false);
        }}
      />
    </>
  ) : (
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
          onClick={() => setIsCardInfo(false)}
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
              카드 등록/변경
            </Text>

            <Wrapper al={`flex-start`} margin={`30px 0 0`}>
              <Text>카드번호</Text>
              <Wrapper
                dr={`row`}
                border={
                  cardInput === true
                    ? `1px solid ${Theme.basicTheme_C}`
                    : `1px solid ${Theme.grey_C}`
                }
                margin={`10px 0 0`}
              >
                <FocusInput
                  onBlur={blurHandler}
                  onClick={cardInputToggle}
                  placeholder="0000"
                  maxLength={4}
                  {...inputCardNum1}
                />
                <FocusInput
                  onBlur={blurHandler}
                  onClick={cardInputToggle}
                  placeholder="0000"
                  maxLength={4}
                  {...inputCardNum2}
                />
                <FocusInput
                  onBlur={blurHandler}
                  onClick={cardInputToggle}
                  placeholder="0000"
                  maxLength={4}
                  {...inputCardNum3}
                />
                <FocusInput
                  onBlur={blurHandler}
                  onClick={cardInputToggle}
                  placeholder="0000"
                  maxLength={4}
                  {...inputCardNum4}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`30px 0 0`}>
              <Text>유효기간</Text>
              <Wrapper
                dr={`row`}
                border={
                  dayInput === true
                    ? `1px solid ${Theme.basicTheme_C}`
                    : `1px solid ${Theme.grey_C}`
                }
                margin={`10px 0 0`}
                ju={`flex-start`}
              >
                <FocusInput
                  width={`calc(100% / 6)`}
                  onBlur={blurHandler}
                  onClick={dayInputToggle}
                  placeholder="MM"
                  maxLength={2}
                  {...inputCardPeriodMM}
                />
                <Text>/</Text>
                <FocusInput
                  width={`calc(100% / 6)`}
                  onBlur={blurHandler}
                  onClick={dayInputToggle}
                  placeholder="YY"
                  maxLength={2}
                  {...inputCardPeriodYY}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`30px 0 0`}>
              <Text>주민번호 앞 6자리 (또는 사업자번호 10자리)</Text>

              <TextInput
                width={`100%`}
                margin={`10px 0 0`}
                border={`1px solid ${Theme.grey_C}`}
                placeholder="주민번호 또는 사업자번호"
                maxLength={10}
                {...inputCardIden}
              />
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`30px 0 0`}>
              <Text>비밀번호 앞 2자리</Text>

              <TextInput
                width={`100%`}
                margin={`10px 0 0`}
                border={`1px solid ${Theme.grey_C}`}
                placeholder="00"
                maxLength={2}
                {...inputCardNumPassword}
              />
            </Wrapper>
          </Wrapper>

          <CommonButton
            onClick={cardInfoHandler}
            radius={`0`}
            width={`100%`}
            height={`50px`}
          >
            저장하기
          </CommonButton>
        </RsWrapper>
      </IoBoxWrapper>
      
    </WholeWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
