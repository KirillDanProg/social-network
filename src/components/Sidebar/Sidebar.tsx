import React from "react";
import styles from "./Sidebar.module.css"
import {NavLinkComponent} from "./NavLinkComponent";
import {FriendType} from "../../types /types";

type SideBarType = {
    sidebar: {
        friends: Array<FriendType>
    }
}
export const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <ul className={styles.list}>
                <NavLinkComponent title={"Profile"}/>
                <NavLinkComponent title={"Dialogs"}/>
                <NavLinkComponent title={"Users"}/>
                <NavLinkComponent title={"Friends"}/>
            </ul>
        </div>
    )
}