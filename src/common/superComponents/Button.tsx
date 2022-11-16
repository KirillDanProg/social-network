import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px;
  background-color:#12a76b;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #1cb276;
  }
  &:active {
    background-color: #4ece9b;
  }
  
`
export const Button = (props) => {
    return (
        <StyledButton {...props}/>
    );
};

