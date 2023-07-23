import { Pagination } from '@mui/material';

const Paginations = ({ itemsTotalCount, itemsInOnePage }) => {
   const pagesCount = Math.ceil(itemsTotalCount / itemsInOnePage);
   return <Pagination count={pagesCount} variant="outlined" shape="rounded" />;
};

export default Paginations;
