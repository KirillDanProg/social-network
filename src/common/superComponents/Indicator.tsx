import React from 'react';
import styled from "styled-components";

const StyledIndicator = styled.span<any>`
  display: inline-block;
  width: ${props => props.size || "5px"};
  height: ${props => props.size || "5px"};
  align-self: center;
  border-radius: 50%;
  box-shadow: 0 0 2px;
  background-color: ${props => props.color || "#0babff"} ;
`
export const Indicator = (props: any) => {
    return (
        <StyledIndicator {...props}/>
    );
};

