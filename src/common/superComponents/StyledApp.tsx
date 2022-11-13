import React from 'react';
import styled from "styled-components";


const AppContainer = styled.div`
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color}
`

export const StyledAppContainer = (props) => {
    return <AppContainer {...props}/>

};

