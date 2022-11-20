import React from "react";
import styled from "styled-components";

const StyledMessage = styled.div<any>`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  flex-wrap: nowrap;
  border-radius: 10px 10px 0 10px;
  padding: 5px 10px;
  align-items: center;
  background-color: ${props => props.theme.subBackground};

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: -20px;
    transform: rotate(90deg);
    background: radial-gradient(circle at 0 0, rgba(0, 0, 0, 0) 20px, ${props => props.theme.subBackground} 0);
  }

  ${props => props.recipientMessage && `
    flex-direction: row;
    justify-content: start;
    border-radius: 10px 10px 10px 0;
    
    &::after {
    left: -20px;
      transform: rotate(0);
    background: radial-gradient(circle at 0 0, rgba(0, 0, 0, 0) 20px, ${props => props.theme.subBackground} 0);
  }
  `}
`
export const DialogMessage = ({children, ...props}) => {

    return (
        <StyledMessage {...props}>
            {children}
        </StyledMessage>
    )
}