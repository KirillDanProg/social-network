import React, {FC} from 'react';
import styled from "styled-components";

type FlexPropsType = {
    direction?: "row" | "column"
    justify?: "center" | "end" | "start"
    align?: "center" | "end" | "start"
    margin?: string
    gap?: string
}
const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${(props: any) => props.direction || "row"};
  justify-content: ${(props: any) => props.justify || "center"};
  align-items: ${(props: any) => props.align || "center"};
  margin: ${(props: any) => props.margin || "0"};
  gap: ${(props: any) => props.gap || "0"};
  flex-wrap: wrap;
`

export const Flex: FC<FlexPropsType> = (props) => {
    return <StyledFlex {...props}/>
};

