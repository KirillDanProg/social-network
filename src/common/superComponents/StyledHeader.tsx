import React from 'react';
import styled from "styled-components";


const HeaderContainer = styled.div`
  background: ${props => props.theme.primary};
`

export const StyledHeaderContainer = (props) => {
    return <HeaderContainer {...props}/>

};

