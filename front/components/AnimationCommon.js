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

export const scaleAnimation = keyframes`
    0%{
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`;
