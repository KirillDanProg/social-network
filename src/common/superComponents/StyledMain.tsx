import React from 'react';
import styled from "styled-components";


const MainContainer = styled.div<any>`
  position: relative;
  padding: ${props => props.padding || "0"};
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.color}
`

export const StyledMainContainer = (props) => {
    return <MainContainer {...props}/>

};

