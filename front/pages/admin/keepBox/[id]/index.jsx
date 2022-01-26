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
  KEEPBOX_DETAIL_REQUEST,
  KEEPBOX_IMAGE_DELETE_REQUEST,
  KEEPBOX_LIST_REQUEST,
  KEEPBOX_UPDATE_REQUEST,
  KEEPBOX_UPLOAD_REQUEST,
} from "../../../../reducers/keepBox";
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

  const imageRef = useRef();

  const {
    keepBoxs,
    detailBox,
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

  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: KEEPBOX_DETAIL_REQUEST,
      data: {
        id: router.query.id,
      },
    });
  }, [router]);

  useEffect(() => {
    if (st_keepBoxUploadDone) {
      dispatch({
        type: KEEPBOX_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, st_keepBoxUploadDone);

  useEffect(() => {
    if (st_keepBoxImageDeleteDone) {
      dispatch({
        type: KEEPBOX_DETAIL_REQUEST,
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

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "유형명",
      dataIndex: "value",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
    },

    {
      title: "수정",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => updateModalToggle(data)}
        >
          수정
        </Button>
      ),
    },

    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          placement="topRight"
          title={"정말 삭제하시겠습니까?"}
          onConfirm={() => deleteHandler(data)}
          okText="삭제"
          cancelText="취소"
        >
          <Button size="small" type="danger">
            삭제
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (!detailBox) {
    return <Spin />;
  }

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["상품 관리", "상품 유형 관리"]}
        title={`상품 유형`}
        subTitle={`상품 유형를 확인하고 관리할 수 있습니다.`}
      />

      <AdminContent>
        <RsWrapper dr={`row`} height={`auto`} al={`flex-start`}>
          <Wrapper margin="0px 0px 20px 0px" dr="row" ju="flex-end">
            <ModalBtn type="danger" size="small" onClick={modalOpen}>
              주의사항
            </ModalBtn>
            <ModalBtn size="small" onClick={() => router.back()}>
              돌아가기
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
            <Text margin={`5px 0`}>구매자 : {detailBox.User.nickname}</Text>
            <Text margin={`5px 0`}>이메일 : {detailBox.User.email}</Text>
            <Text margin={`5px 0`}>연락처 : {detailBox.User.mobile}</Text>
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
            {detailBox.boxcount1 !== 0 && (
              <Text margin={`5px 0`}>
                {dataArr[0][0]} : {detailBox.boxcount1}개(
                {numberWithCommas(detailBox.boxcount1 * dataArr[0][3])}원)
              </Text>
            )}
            {detailBox.boxcount2 !== 0 && (
              <Text margin={`5px 0`}>
                {dataArr[1][0]} : {detailBox.boxcount2}개(
                {numberWithCommas(detailBox.boxcount2 * dataArr[1][3])}원)
              </Text>
            )}
            {detailBox.boxcount3 !== 0 && (
              <Text margin={`5px 0`}>
                {dataArr[2][0]} : {detailBox.boxcount3}개(
                {numberWithCommas(detailBox.boxcount3 * dataArr[2][3])}원)
              </Text>
            )}
            {detailBox.boxcount4 !== 0 && (
              <Text margin={`5px 0`}>
                {dataArr[3][0]} : {detailBox.boxcount4}개(
                {numberWithCommas(detailBox.boxcount4 * dataArr[3][3])}원)
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
            <Text margin={`5px 0`}>수령인 : {detailBox.name}</Text>
            <Text margin={`5px 0`}>연락처 : {detailBox.mobile}</Text>
            <Text margin={`5px 0`}>
              주소 : {detailBox.address} {detailBox.detailAddress}
            </Text>
            <Text margin={`5px 0`}>보관 기간 : {detailBox.period}</Text>
            <Text margin={`5px 0`}>픽업 방식 : {detailBox.pickWay}</Text>
            <Text margin={`5px 0`}>
              픽업 유무 : {detailBox.isPickup ? "픽업 완료" : "픽업 진행중"}
            </Text>
            <Text margin={`5px 0`}>
              월 결제 금액 : {numberWithCommas(detailBox.price)}원
            </Text>
            <Text margin={`5px 0`}>
              배송비 : {numberWithCommas(detailBox.deliveryPay)}원
            </Text>
            <Wrapper margin={`5px 0`} al={`flex-start`}>
              <Text>특이사항 :</Text>
              {detailBox.remark.split("\n").map((data, idx) => {
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

            <Wrapper width={`auto`} dr={`row`} fontSize={`18px`}>
              <Checkbox checked={detailBox.isFilming} />{" "}
              <Text padding={`0 5px`}>상자보관 찰영유무</Text>
            </Wrapper>

            <Wrapper
              width={`50px`}
              height={`50px`}
              radius={`25px`}
              cursor={`pointer`}
              border={`1px solid ${Theme.black_C}`}
              onClick={() => {
                detailBox.isFilming && onClickImageRefHandler();
              }}
            >
              <PlusOutlined />
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {detailBox.BoxImages &&
                detailBox.BoxImages.map((data, idx) => {
                  return (
                    !data.isDelete && (
                      <Wrapper
                        key={idx}
                        width={`20%`}
                        margin={`10px 10px`}
                        position={`relative`}
                      >
                        <Image src={data.imagePath} />
                        <Wrapper
                          position={`absolute`}
                          width={`25px`}
                          height={`25px`}
                          bgColor={Theme.red_C}
                          color={Theme.white_C}
                          radius={`50%`}
                          top={`0`}
                          right={`0`}
                          cursor={`pointer`}
                          onClick={() => {
                            deleteImageHandler(data.id);
                          }}
                        >
                          X
                        </Wrapper>
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
