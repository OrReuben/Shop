import { Button } from "@material-ui/core";
// import { ArrowLeft, ArrowRight } from "@material-ui/icons";
// import { useState } from "react";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
`;
const Li = styled.li`
  margin: 5px;
`;
const Pagination = (props) => {
  const pageNumbers = [];
  //   const [newCurrentPage, setNewCurrentPage] = useState(2);

  for (
    let index = 1;
    index <= Math.ceil(props.auctions / props.postsPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }

  //   const PaginationBack = async () => {
  //     if (newCurrentPage > 1) {
  //       setNewCurrentPage(newCurrentPage -1);
  //       await props.Paginate(newCurrentPage);
  //     }
  //   };

  //   const PaginationFront = async () => {
  //     if (newCurrentPage < pageNumbers.length) {
  //       setNewCurrentPage(newCurrentPage + 1);
  //       await props.Paginate(newCurrentPage);
  //     }
  //   };

  return (
    <Ul>
      {pageNumbers.map((number) => {
        return (
          <Li key={number}>
            <Button variant="contained" onClick={() => props.Paginate(number)}>
              {number}
            </Button>
          </Li>
        );
      })}
    </Ul>
  );
};

export default Pagination;
