import React from 'react';
import styled from "styled-components";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";
import {setAppError} from "../../redux/appReducer/app-reducer";

const StyledSnackBar = styled.span`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: inline-block;
  margin: 5px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgb(211 47 47);
  color: white;
  z-index: 99;
  animation: fadeIn ease 0.5s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }

  }
`

export const Snackbar = (props) => {
    const dispatch = useAppDispatch()

    setTimeout(() => {
        dispatch(setAppError(""))
    }, 4000)

    return (
        <StyledSnackBar {...props}>
            {props.error}
        </StyledSnackBar>
    );
};

