import React from 'react';
import styled from "styled-components";


type ComposeComponentType = {
    width: string
    center: string,
    bottom: string
}
const StyledPositionComponent = styled.div<ComposeComponentType>`
  width: ${props => props.width || "100%"};

  ${props => props.center && `
          position: absolute;
          top: 50%;
          bottom: 0;
          left: 50%;
          right: 0;
          transform: translate(-50%, -50%)
    `}
  ${props => props.bottom && `
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0)
          
  `}

`

export const PositionedComponent = (props) => {
    return <StyledPositionComponent {...props}/>
};

