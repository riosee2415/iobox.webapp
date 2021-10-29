import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Col, Drawer } from "antd";
import Link from "next/link";
import { withResizeDetector } from "react-resize-detector";
import { AlignRightOutlined } from "@ant-design/icons";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const ClientLayout = ({ children, width }) => {
  return (
    <section>
      {/* content */}
      <Row>
        <Col span={0}>LEFT</Col>
        <Col span={24}>{children}</Col>
        <Col span={0}>RIGHT</Col>
      </Row>
      {/* Footer */}
      <AppFooter />
    </section>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withResizeDetector(ClientLayout);
