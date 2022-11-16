import React from 'react';
import styled from "styled-components";
import {device} from "../mediaqueries/media";
import { toggleSidebar} from "../../redux/appReducer/app-reducer";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";


const StyledBurger = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  span {
    display: block;
    width: 32px;
    height: 4px;
    margin-bottom: 4px;
    border-radius: 5px;
    background-color: ${props => props.theme.other};
  }
  
  @media ${device.tablet} {
    display: none;
  }
`
export const Burger = () => {
    const dispatch = useAppDispatch()

    const showSidebar = () => {
        dispatch(toggleSidebar())
    }

    return (
        <StyledBurger onClick={showSidebar}>
            <span></span>
            <span></span>
            <span></span>
        </StyledBurger>
    );
};

