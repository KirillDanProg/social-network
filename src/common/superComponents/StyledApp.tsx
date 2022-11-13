import React from 'react';
import styled from "styled-components";


const AppContainer = styled.div`
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  transition: all 0.5s ease;
`

export const StyledAppContainer = (props) => {
    return <AppContainer {...props}/>

};

