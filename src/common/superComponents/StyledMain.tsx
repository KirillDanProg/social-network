import React from 'react';
import styled from "styled-components";


const MainContainer = styled.div`
  padding: 0 10px;
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.color}
`

export const StyledMainContainer = (props) => {
    return <MainContainer {...props}/>

};

