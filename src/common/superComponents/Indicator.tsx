import React from 'react';
import styled from "styled-components";

const StyledIndicator = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  align-self: center;
  border-radius: 50%;
  box-shadow: 0 0 2px;
  background-color: #0babff;
`
export const Indicator = () => {
    return (
        <StyledIndicator/>
    );
};

