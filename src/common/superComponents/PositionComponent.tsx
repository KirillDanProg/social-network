import React from 'react';
import styled from "styled-components";
import {device} from "../mediaqueries/media";


type ComposeComponentType = {
    width: string
    center: string,
    bottom: string
    position: string
}
const StyledPositionComponent = styled.div<ComposeComponentType>`
  width: ${props => props.width || "100%"};
  background-color: ${props => props.theme.secondary};
  ${props => props.center && `
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          bottom: 0;
          left: 50%;
          right: 0;
    `}
  ${props => props.bottom && `
          position: ${props.position || "static"};
          bottom: 30px;
  `}
  @media ${device.tablet} {
    width: 50%
  }

`

export const PositionedComponent = (props) => {
    return <StyledPositionComponent {...props}/>
};

