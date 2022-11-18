import React, {FC, useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import "../App.css"

type PaginationPropsType = {
    total: number
    page: number
    count: number
    changePage: (p: number) => void
}
export const Pagination: FC<PaginationPropsType> = (props) => {
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        setPageCount(Math.ceil(props.total / props.count));
    }, [props.total, props.count]);

    const handlePageClick = (event) => {
        props.changePage(event.selected + 1)
    };

    return (
            <ReactPaginate
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< "
                className={"pagination"}
                activeClassName="active"
            />
    );
}

