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
    const [pageCount, setPageCount] = useState(Math.ceil(props.total / props.count));

    useEffect(() => {
        setPageCount(Math.ceil(props.total / props.count));
    }, [props.count]);

    const handlePageClick = (event) => {
        props.changePage(event.selected)
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            className={"pagination"}
        />
    );
}

