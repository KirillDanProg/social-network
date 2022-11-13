import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
  display: block;
  padding: 10px;
  background-color: darkgreen;
  color: white;
  border: 1px solid darkslategray;
  border-radius: 5px;
  &:hover {
    background-color: #fff;
  }
  
`
export const Button = (props) => {
    return (
        <StyledButton {...props}/>
    );
};

