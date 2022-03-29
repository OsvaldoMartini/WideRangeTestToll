import React, { FC, useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { CustomData } from "./CustomData";



export interface CustomPaginationProps {
    children?: string | React.ReactElement;
    title?: string;
    className?: string;
    disabled?: boolean;
    totPages?: number;
    currentPage?: number;
    data: any;
    itemsPerPage: number;
}



export const CustomPagination: FC<CustomPaginationProps> = ({
    itemsPerPage,
    data
}) => {

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    //console.log(`Loading items from `, data);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        if (data !== undefined) {
            setCurrentItems(data && data.length > 0 ? data.slice(itemOffset, endOffset) : []);
            setPageCount(Math.ceil(data.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, data]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number; }) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    return (
        <div>
            <CustomData currentItems={currentItems || []} />
            <div className="center-pagination grid-style">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={(event) => handlePageClick(event)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                // renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}