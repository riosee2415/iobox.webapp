import styled, { keyframes } from "styled-components";

export const rotateAnimation = keyframes`
    0%{
        transform : rotate(0deg);
        width : 0;
        height :0;
    }
    100% {
        transform : rotate(360deg);
        width : 300px;
        height : 300px;
    }
`;
