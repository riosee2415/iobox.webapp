import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import PageHeader from "../../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Select,
  notification,
  message,
  Popconfirm,
  Form,
  Input,
  Checkbox,
  Spin,
} from "antd";

import { useRouter, withRouter } from "next/router";
import wrapper from "../../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  AdminContent,
  SearchForm,
  SearchFormItem,
  ModalBtn,
  GuideUl,
  GuideLi,
  Text,
  RsWrapper,
  Image,
} from "../../../../components/commonComponents";
import {
  LOAD_MY_INFO_REQUEST,
  USERLIST_REQUEST,
} from "../../../../reducers/user";
import {
  GUIDE_MODAL_CLOSE_REQUEST,
  GUIDE_MODAL_OPEN_REQUEST,
  KEEPBOX_CREATE_REQUEST,
  KEEPBOX_DELETE_REQUEST,
  KEEPBOX_IMAGE_DELETE_REQUEST,
  KEEPBOX_LIST_REQUEST,
  KEEPBOX_UPDATE_REQUEST,
  KEEPBOX_UPLOAD_REQUEST,
} from "../../../../reducers/keepBox";

import { RETURNBOX_LIST_ONE_REQUEST } from "../../../../reducers/returnBox";
import Theme from "../../../../components/Theme";
import { numberWithCommas } from "../../../../components/commonUtils";
import { PlusOutlined } from "@ant-design/icons";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Index = ({}) => {
  const { st_loadMyInfoDone, me, users } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);
  /////////////////////////////////////////////////////////////////////////
  const dataArr = [
    //
    ["행거박스", "W58 x H100 x D30 (CM)", "월", 19000],
    ["행거박스 plus+", "W58 x H130 x D60 (CM)", "월", 39000],
    ["텐트박스", "W100 x H45 x D45 (CM)", "월", 39000],
    ["캠핑박스 plus+", "W110 x H50 x D50 (CM)", "월", 59000],
  ];

  ////// HOOKS //////
  const dispatch = useDispatch();

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const [currentId, setCurrentId] = useState(null);

  const [trueImage, setTrueImage] = useState(null);

  const imageRef = useRef();

  const {
    keepBoxs,

    //
    st_keepBoxCreateDone,
    st_keepBoxCreateError,
    st_keepBoxUpdateDone,
    st_keepBoxUpdateError,
    st_keepBoxDeleteDone,
    st_keepBoxDeleteError,
    st_keepBoxUploadDone,
    st_keepBoxImageDeleteDone,
    //
    guideModal,
  } = useSelector((state) => state.keepBox);

  const { returnBoxOne } = useSelector((state) => state.returnBox);
  console.log(returnBoxOne);
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: RETURNBOX_LIST_ONE_REQUEST,
      data: {
        id: router.query.id,
      },
    });
  }, [router]);

  useEffect(() => {
    if (st_keepBoxUploadDone) {
      dispatch({
        type: RETURNBOX_LIST_ONE_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, st_keepBoxUploadDone);

  useEffect(() => {
    if (st_keepBoxImageDeleteDone) {
      dispatch({
        type: RETURNBOX_LIST_ONE_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, st_keepBoxImageDeleteDone);

  useEffect(() => {
    if (st_keepBoxCreateDone) {
      message.success("새로운 상품유형이 추가되었습니다.");

      dispatch({
        type: CREATE_MODAL_TOGGLE_REQUEST,
      });

      dispatch({
        type: KEEPBOX_LIST_REQUEST,
      });
    }
  }, [st_keepBoxCreateDone]);
  useEffect(() => {
    if (st_keepBoxCreateError) {
      message.error(st_keepBoxCreateError);
    }
  }, [st_keepBoxCreateError]);

  useEffect(() => {
    if (st_keepBoxUpdateDone) {
      message.success("기존 상품유형이 수정되었습니다.");

      dispatch({
        type: UPDATE_MODAL_TOGGLE_REQUEST,
      });

      dispatch({
        type: KEEPBOX_LIST_REQUEST,
      });
    }
  }, [st_keepBoxUpdateDone]);
  useEffect(() => {
    if (st_keepBoxUpdateError) {
      message.error(st_keepBoxUpdateError);
    }
  }, [st_keepBoxUpdateError]);

  useEffect(() => {
    if (st_keepBoxDeleteDone) {
      message.success("기존 상품유형이 삭제되었습니다.");

      dispatch({
        type: KEEPBOX_LIST_REQUEST,
      });
    }
  }, [st_keepBoxDeleteDone]);

  useEffect(() => {
    if (st_keepBoxDeleteError) {
      message.error(st_keepBoxDeleteError);
    }
  }, [st_keepBoxDeleteError]);

  useEffect(() => {
    if (returnBoxOne) {
      let tempArr = [];

      for (let i = 0; i < returnBoxOne.BoxImages.length; i++) {
        if (returnBoxOne.BoxImages[i].KeepBox.isFilming === true) {
          console.log(returnBoxOne.BoxImages[i].KeepBox.isFilming);
          tempArr.push(returnBoxOne.BoxImages[i].imagePath);
        }
      }

      setTrueImage(tempArr);
    }
  }, [returnBoxOne]);

  ////// HANDLER //////
  const onChangeImages = useCallback(
    (e, type) => {
      const file = e.target.files[0];

      const formData = new FormData();

      formData.append("image", file);
      formData.append("KeepBoxId", router.query.id);

      dispatch({
        type: KEEPBOX_UPLOAD_REQUEST,
        data: { formData },
      });
    },
    [router]
  );

  const deleteImageHandler = useCallback((id) => {
    dispatch({
      type: KEEPBOX_IMAGE_DELETE_REQUEST,
      data: {
        imageId: id,
      },
    });
  }, []);

  const onClickImageRefHandler = useCallback(() => {
    imageRef.current.click();
  }, []);

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: KEEPBOX_DELETE_REQUEST,
      data: {
        keepBoxId: data.id,
      },
    });
  }, []);

  const modalOpen = useCallback(() => {
    dispatch({
      type: GUIDE_MODAL_OPEN_REQUEST,
    });
  }, [guideModal]);

  const modalClose = useCallback(() => {
    dispatch({
      type: GUIDE_MODAL_CLOSE_REQUEST,
    });

    // setUpdateData(null);
  }, [guideModal]);

  ////// DATAVIEW //////
  if (!returnBoxOne) {
    return null;
  }
  ////// DATA COLUMNS //////

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["반환 요청 관리", "반환 관리"]}
        title={`반환`}
        subTitle={`사용저가 요청한 반환 박스를 확인하고 관리할 수 있습니다.`}
      />

      <AdminContent>
        <RsWrapper dr={`row`} height={`auto`} al={`flex-start`}>
          <Wrapper margin="0px 0px 20px 0px" dr="row" ju="flex-end">
            {/* <ModalBtn type="danger" size="small" onClick={modalOpen}>
              주의사항
            </ModalBtn> */}
            <ModalBtn
              onClick={() =>
                moveLinkHandler(`/admin/returnBox/list?listType=3`)
              }
            >
              목록
            </ModalBtn>
          </Wrapper>

          <Wrapper width={`50%`} al={`flex-start`} padding={`0 10px`}>
            <Wrapper
              fontSize={`20px`}
              borderBottom={`1px solid ${Theme.black_C}`}
              width={`100%`}
              al={`flex-start`}
              ju={`flex-start`}
              fontWeight={`bold`}
              margin={`0 0 10px`}
            >
              구매자 정보
            </Wrapper>
            <Text margin={`5px 0`}>
              구매자 : {returnBoxOne.BoxImages[0].KeepBox.User.nickname}
            </Text>
            <Text margin={`5px 0`}>
              이메일 : {returnBoxOne.BoxImages[0].KeepBox.User.email}
            </Text>
            <Text margin={`5px 0`}>
              연락처 : {returnBoxOne.BoxImages[0].KeepBox.User.mobile}
            </Text>
            <Wrapper
              fontSize={`20px`}
              borderBottom={`1px solid ${Theme.black_C}`}
              width={`100%`}
              al={`flex-start`}
              fontWeight={`bold`}
              margin={`20px 0 10px`}
            >
              박스 정보
            </Wrapper>
            {returnBoxOne.BoxImages[0].KeepBox.boxcount1 !== 0 && (
              <Text margin={`5px 0`}>
                {dataArr[0][0]} : {returnBoxOne.BoxImages[0].KeepBox.boxcount1}
                개(
                {numberWithCommas(
                  returnBoxOne.BoxImages[0].KeepBox.boxcount1 * dataArr[0][3]
                )}
                원)
              </Text>
            )}
            {returnBoxOne.BoxImages[0].KeepBox.boxcount2 !== 0 && (
              <Text margin={`5px 0`}>
                {dataArr[1][0]} : {returnBoxOne.BoxImages[0].KeepBox.boxcount2}
                개(
                {numberWithCommas(
                  returnBoxOne.BoxImages[0].KeepBox.boxcount2 * dataArr[1][3]
                )}
                원)
              </Text>
            )}
            {returnBoxOne.BoxImages[0].KeepBox.boxcount3 !== 0 && (
              <Text margin={`5px 0`}>
                {dataArr[2][0]} : {returnBoxOne.BoxImages[0].KeepBox.boxcount3}
                개(
                {numberWithCommas(
                  returnBoxOne.BoxImages[0].KeepBox.boxcount3 * dataArr[2][3]
                )}
                원)
              </Text>
            )}
            {returnBoxOne.BoxImages[0].KeepBox.boxcount4 !== 0 && (
              <Text margin={`5px 0`}>
                {dataArr[3][0]} : {returnBoxOne.BoxImages[0].KeepBox.boxcount4}
                개(
                {numberWithCommas(
                  returnBoxOne.BoxImages[0].KeepBox.boxcount4 * dataArr[3][3]
                )}
                원)
              </Text>
            )}
          </Wrapper>
          <Wrapper width={`50%`} al={`flex-start`} padding={`0 10px`}>
            <Wrapper
              fontSize={`20px`}
              borderBottom={`1px solid ${Theme.black_C}`}
              width={`100%`}
              al={`flex-start`}
              ju={`flex-start`}
              fontWeight={`bold`}
              margin={`0 0 10px`}
            >
              상품 정보
            </Wrapper>
            <Text margin={`5px 0`}>
              수령인 : {returnBoxOne.BoxImages[0].KeepBox.name}
            </Text>
            <Text margin={`5px 0`}>
              연락처 : {returnBoxOne.BoxImages[0].KeepBox.mobile}
            </Text>
            <Text margin={`5px 0`}>
              주소 : {returnBoxOne.BoxImages[0].KeepBox.address}{" "}
              {returnBoxOne.BoxImages[0].KeepBox.detailAddress}
            </Text>
            <Text margin={`5px 0`}>
              보관 기간 : {returnBoxOne.BoxImages[0].KeepBox.period}
            </Text>
            <Text margin={`5px 0`}>
              픽업 방식 : {returnBoxOne.BoxImages[0].KeepBox.pickWay}
            </Text>
            <Text margin={`5px 0`}>
              픽업 유무 :{" "}
              {returnBoxOne.BoxImages[0].KeepBox.isPickup
                ? "픽업 완료"
                : "픽업 진행중"}
            </Text>
            <Text margin={`5px 0`}>
              월 결제 금액 :{" "}
              {numberWithCommas(returnBoxOne.BoxImages[0].KeepBox.price)}원
            </Text>
            <Text margin={`5px 0`}>
              배송비 :{" "}
              {numberWithCommas(returnBoxOne.BoxImages[0].KeepBox.deliveryPay)}
              원
            </Text>
            <Wrapper margin={`5px 0`} al={`flex-start`}>
              <Text>특이사항 :</Text>
              {returnBoxOne.BoxImages[0].KeepBox.remark &&
                returnBoxOne.BoxImages[0].KeepBox.remark
                  .split("\n")
                  .map((data, idx) => {
                    return <Text key={idx}>{data}</Text>;
                  })}
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} margin={`50px 0 0`} ju={`space-between`}>
            <input
              type="file"
              name="image"
              accept=".png, .jpg"
              // multiple
              hidden
              ref={imageRef}
              onChange={(e) => onChangeImages(e)}
            />

            <Wrapper width={`auto`} dr={`row`} fontSize={`18px`}></Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {trueImage &&
                trueImage.map((data, idx) => {
                  return (
                    !data.isDelete && (
                      <Wrapper
                        key={idx}
                        width={`20%`}
                        margin={`10px 10px`}
                        position={`relative`}
                      >
                        <Image src={data} />
                      </Wrapper>
                    )
                  );
                })}
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </AdminContent>

      <Modal
        visible={guideModal}
        width="900px"
        onCancel={modalClose}
        title="주의사항"
        footer={false}
        style={{
          padding: `24px`,
        }}
      >
        <GuideUl>
          <GuideLi>
            구매한 사용자의 정보 및 상품의 정보를 확인할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            상자보관 찰영을 허용한 경우 박스에 들어있는 상품의 사진을 등록하여
            사용자가 확인할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제 시 데이터 복구가 불가능하니 신중한 처리가 필요합니다.
          </GuideLi>
        </GuideUl>
      </Modal>
    </AdminLayout>
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

    context.store.dispatch({
      type: USERLIST_REQUEST,
      data: {
        listType: 1,
        name: "",
        email: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Index);
