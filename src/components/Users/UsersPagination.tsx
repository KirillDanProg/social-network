import styles from "./Users.module.css";
import {FC} from "react";

type PaginationPropsType = {
    total: number
    page: number
    count: number
    changePage: (p: number) => void

}

export const UsersPagination: FC<PaginationPropsType> = (props) => {

    const pages: number[] = []
    const totalPages = props.total / props.count
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.pagination}>
            {pages.map(p => {
                const changePageHandler = () => {
                    props.changePage(p)
                }
                return (
                    <span key={p}
                          className={`${styles.paginationNumber} ${props.page === p ? styles.active : ""}`}
                          onClick={changePageHandler}
                    >
                            {p}
                        </span>)
            })}
        </div>
    )
}
