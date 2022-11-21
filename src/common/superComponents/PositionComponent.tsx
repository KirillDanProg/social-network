import React from 'react';
import styled from "styled-components";


type ComposeComponentType = {
    width: string
    center: string,
    bottom: string
    position: string
}
const StyledPositionComponent = styled.div<ComposeComponentType>`
  width: ${props => props.width || "50%"};
  background-color: ${props => props.theme.secondary};
  ${props => props.center && `
          position: fixed;
          top: 50%;
          bottom: 0;
          left: 50%;
          right: 0;
          transform: translate(-50%, -50%)
    `}
  ${props => props.bottom && `
          position: ${props.position || "static"};
          bottom: 30px;
  `}

`

export const PositionedComponent = (props) => {
    return <StyledPositionComponent {...props}/>
};

