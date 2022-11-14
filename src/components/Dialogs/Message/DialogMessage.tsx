import React from "react";
import styles from "./DialogMessage.module.css";
import styled from "styled-components";

const StyledMessageContainer = styled.div`
  background-color: ${props => props.theme.subBackground};
  &::after {
    background: radial-gradient(circle at 0 0, rgba(0, 0, 0, 0) 20px, ${props => props.theme.subBackground} 0);
  }
`
export const DialogMessage = ({children}) => {

    return (
        <StyledMessageContainer className={styles.messageContainer}>
            {children}
        </StyledMessageContainer>
    )
}