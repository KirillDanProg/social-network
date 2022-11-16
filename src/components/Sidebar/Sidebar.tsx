import React from "react";
import styles from "./Sidebar.module.css"
import {NavLinkComponent} from "./NavLinkComponent";
import styled from "styled-components";
import {device} from "../../common/mediaqueries/media";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxHooks";
import {toggleSidebar} from "../../redux/appReducer/app-reducer";


const StyledSidebar = styled.div<any>`
  ${props => props.mobile && `
 display: none;
 `}
  position: relative;
  z-index: 2;
  background-color: ${props => props.theme.backgroundColor};
  transition: 0.5s;
  @media ${device.tablet} {
    display: block;
  }
`
export const Sidebar = () => {
    const mobile = useAppSelector(state => state.application.mobile)
    const dispatch = useAppDispatch()

    const hideSidebar = () => {
        dispatch(toggleSidebar())
    }

    return (
        <>
            <StyledSidebar onClick={hideSidebar}  mobile={!mobile} className={styles.sidebar}>
                <ul className={styles.list}>
                    <NavLinkComponent title={"Profile"}/>
                    <NavLinkComponent title={"Dialogs"}/>
                    <NavLinkComponent title={"Users"}/>
                    <NavLinkComponent title={"Friends"}/>
                </ul>
            </StyledSidebar>
        </>
    )
}