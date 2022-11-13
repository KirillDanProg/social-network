import React from 'react';
import styled from "styled-components";


type ComposeComponentType = {
    center: string
}
const StyledPositionComponent = styled.div<ComposeComponentType>`

  ${props => props.center && `
          position: absolute;
          top: 50%;
          bottom: 0;
          left: 50%;
          right: 0;
          transform: translate(-50%, -50%)
    `}

`

export const PositionedComponent = (props) => {
    return <StyledPositionComponent {...props}/>
};

