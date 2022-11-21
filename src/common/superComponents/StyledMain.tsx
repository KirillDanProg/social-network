import React from 'react';
import styled from "styled-components";
import {device} from "../mediaqueries/media";

const MainContainer = styled.div<any>`
  grid-area: 2 / 1 / 6 / 13;
  height: calc(100vh - 60px);
  margin: ${props => props.margin || "0 10px"};
  padding: ${props => props.padding || "10px"};
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.color};
  
  @media ${device.tablet} {
    grid-area: 2 / 3 / 6 / 10;
  }
  
  @media ${device.mobileS} {
    margin: 0;
    padding: 4px;
  }
  
`

export const StyledMainContainer = (props) => {
    return <MainContainer {...props}/>

};

