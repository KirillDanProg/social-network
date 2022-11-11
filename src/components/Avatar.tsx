import React from 'react';
import styled from "styled-components";

const StyledAvatar = styled.img`
  width: 70px;
  border-radius: 50%;
`
export const Avatar = (props) => {
    return (
        <div>
            <StyledAvatar {...props}/>
        </div>
    );
};

