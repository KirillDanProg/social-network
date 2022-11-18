import React from 'react';
import styled from "styled-components";
import {device} from "../mediaqueries/media";


const AppContainer = styled.div`
  display: grid;
  gap: 20px;
  margin: 0 auto;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 50px 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  transition: all 0.5s ease;
  @media ${device.mobileS} {
    gap: 10px;
    grid-column-gap: 4px;
    grid-row-gap: 4px;
  }
`

export const StyledAppContainer = (props) => {
    return <AppContainer {...props}/>
};

