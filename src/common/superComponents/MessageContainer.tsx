import React from 'react';
import styled from "styled-components";


const StyledMessageContainer = styled.div<any>`
  display: flex;
  flex-direction: row-reverse;
  align-items: end;
  gap: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  padding: 4px 10px;

  &:hover {
    background-color: rgb(0, 0, 0, 0.04);
    border-radius: 20px;
    transition: 0.3s;
  }

  ${props => props.recipientMessage && `
    flex-direction: row;
  &::after {
    left: -20px;
    background: radial-gradient(circle at 0 0, rgba(0, 0, 0, 0) 20px, ${props => props.theme.subBackground} 0);
  }
  `}

`
export const MessageContainer = (props) => {
    return (
        <StyledMessageContainer {...props}/>
    );
};

