"use client"; // Use Client Components

import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Loading({ ...rest }: InputProps) {

  return <StyledSpin />;
}

const StyledSpin = styled.div`
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.1);
  opacity: 0.8;
  & .anticon-loading {
    font-size: 70px !important;
    position: absolute;
    top: 40%;
    left: 50%;
    color: #6c62d1;
  }
`;
