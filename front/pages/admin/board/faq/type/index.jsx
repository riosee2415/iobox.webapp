import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../../../components/AdminLayout";
import PageHeader from "../../../../../components/admin/PageHeader";
import AdminTop from "../../../../../components/admin/AdminTop";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table, Button, Input, notification, message } from "antd";
import {
  MODAL_CLOSE_REQUEST,
  MODAL_OPEN_REQUEST,
  FAQ_TYPE_CREATE_REQUEST,
  FAQ_TYPE_UPDATE_REQUEST,
  FAQ_TYPE_DELETE_REQUEST,
  FAQ_TYPE_GET_REQUEST,
} from "../../../../../reducers/faq";
import useInput from "../../../../../hooks/useInput";
import { LOAD_MY_INFO_REQUEST } from "../../../../../reducers/user";
import wrapper from "../../../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter } from "next/router";
import { Wrapper } from "../../../../../components/commonComponents";

const AdminContent = styled.div`
  padding: 20px;
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Type = () => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

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

  ////// HOOKS //////
  const dispatch = useDispatch();
  const {
    types,
    modal,
    st_faqTypeCreateDone,
    st_faqTypeUpdateDone,
    st_faqTypeDeleteDone,
    st_faqTypeCreateError,
    st_faqTypeUpdateError,
    st_faqTypeDeleteError,
  } = useSelector((state) => state.faq);

  const [updateData, setUpdateData] = useState(null);

  const [deletePopVisible, setDeletePopVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const inputValue = useInput("");

  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: FAQ_TYPE_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_faqTypeCreateDone) {
      dispatch({
        type: FAQ_TYPE_GET_REQUEST,
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_faqTypeCreateDone]);

  useEffect(() => {
    if (st_faqTypeCreateError) {
      return message.error(st_faqTypeCreateError);
    }
  }, [st_faqTypeCreateError]);

  useEffect(() => {
    if (st_faqTypeUpdateDone) {
      dispatch({
        type: FAQ_TYPE_GET_REQUEST,
      });

      dispatch({
        type: MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_faqTypeUpdateDone]);

  useEffect(() => {
    if (st_faqTypeUpdateError) {
      return message.error(st_faqTypeUpdateError);
    }
  }, [st_faqTypeUpdateError]);

  useEffect(() => {
    if (st_faqTypeDeleteDone) {
      dispatch({
        type: FAQ_TYPE_GET_REQUEST,
      });
    }
  }, [st_faqTypeDeleteDone]);

  useEffect(() => {
    if (st_faqTypeDeleteError) {
      return message.error(st_faqTypeDeleteError);
    }
  }, [st_faqTypeDeleteError]);

  ////// TOGGLE //////
  const createModalOpen = useCallback(() => {
    dispatch({
      type: MODAL_OPEN_REQUEST,
    });
  }, [modal]);

  const createModalClose = useCallback(() => {
    dispatch({
      type: MODAL_CLOSE_REQUEST,
    });

    inputValue.setValue("");
  }, [modal, inputValue]);

  const updateModalOpen = useCallback(
    (data) => {
      dispatch({
        type: MODAL_OPEN_REQUEST,
      });

      inputValue.setValue(data.value);
      setUpdateData(data);
    },
    [modal, inputValue]
  );

  const updateModalClose = useCallback(() => {
    dispatch({
      type: MODAL_CLOSE_REQUEST,
    });
    setUpdateData(null);
    inputValue.setValue("");
  }, [modal, inputValue]);

  const deletePopToggle = useCallback(
    (id) => () => {
      setDeleteId(id);
      setDeletePopVisible((prev) => !prev);
    },
    [deletePopVisible, deleteId]
  );

  ////// HANDLER //////

  const createModalOk = useCallback(() => {
    if (!inputValue.value || inputValue.value.trim() === "") {
      return LoadNotification("ADMIN SYSTEM ERRLR", "문의 유형을 입력해주세요");
    }

    dispatch({
      type: FAQ_TYPE_CREATE_REQUEST,
      data: { value: inputValue.value },
    });
  }, [inputValue]);

  const onSubmitUpdate = useCallback(() => {
    if (!inputValue.value || inputValue.value.trim() === "") {
      return LoadNotification("ADMIN SYSTEM ERRLR", "문의 유형을 입력해주세요");
    }

    dispatch({
      type: FAQ_TYPE_UPDATE_REQUEST,
      data: { id: updateData.id, value: inputValue.value },
    });
  }, [inputValue, updateData]);

  const deleteQuestionTypeHandler = useCallback(() => {
    if (!deleteId) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "일시적인 장애가 발생되었습니다. 잠시 후 다시 시도해주세요."
      );
    }
    dispatch({
      type: FAQ_TYPE_DELETE_REQUEST,
      data: { questionTypeId: deleteId },
    });

    setDeleteId(null);
    setDeletePopVisible((prev) => !prev);
  }, [deleteId]);

  ////// DATAVIEW //////

  // Table
  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "VALUE",
      render: (data) => <div>{data.value}</div>,
    },
    {
      title: "UPDATE",
      render: (data) => (
        <Button type="primary" onClick={() => updateModalOpen(data)}>
          UPDATE
        </Button>
      ),
    },
    {
      title: "DELETE",
      render: (data) => (
        <Button type="danger" onClick={deletePopToggle(data.id)}>
          DEL
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["문의 관리", "문의 유형 리스트"]}
        title={`문의 유형 리스트`}
        subTitle={`홈페이지의 문의 유형을 관리할 수 있습니다.`}
      />
      <AdminTop createButton={true} createButtonAction={createModalOpen} />

      <AdminContent>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={types ? types : []}
          size="middle"
        />
      </AdminContent>

      <Modal
        visible={modal}
        width={`400px`}
        title={`문의 유형`}
        onCancel={updateData ? updateModalClose : createModalClose}
        onOk={updateData ? onSubmitUpdate : createModalOk}
      >
        <Wrapper padding={`10px`}>
          <Input {...inputValue} />
        </Wrapper>
      </Modal>

      <Modal
        visible={deletePopVisible}
        onOk={deleteQuestionTypeHandler}
        onCancel={deletePopToggle(null)}
        title="정말 삭제하시겠습니까?"
      >
        <Wrapper padding={`20px`}>
          <Wrapper>삭제 된 데이터는 다시 복구할 수 없습니다.</Wrapper>
          <Wrapper>정말 삭제하시겠습니까?</Wrapper>
        </Wrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Type;
