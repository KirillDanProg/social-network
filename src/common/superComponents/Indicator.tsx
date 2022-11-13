import React from 'react';
import styled from "styled-components";

const StyledIndicator = styled.span`
display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 2px ;
`
export const Indicator = () => {
    return (
        <StyledIndicator/>
    );
};

