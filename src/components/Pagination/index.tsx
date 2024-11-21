import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import useSetSearchParams from '@/hooks/useSetSearchParam';

import * as S from './Pagination.css';

interface PaginationProps {
  totalPage: number;
}

const NUM = 5;

function Pagination({ pageInfo }: { pageInfo: PaginationProps }) {
  const { totalPage } = pageInfo;
  const { searchParams, setSingleSearchParam } = useSetSearchParams();
  const currentPage = Number(searchParams.get('page'));

  const handlePageChange = (newPage: number) => {
    setSingleSearchParam('page', newPage.toString());
  };

  const half = Math.floor(NUM / 2);
  const startPage = Math.max(1, Math.min(currentPage - half, totalPage - NUM + 1));
  const endPage = Math.min(totalPage, startPage + NUM - 1);

  const numberStyle = (page: number) => {
    return currentPage === page ? S.base.currentNumbers : S.base.numbers;
  };

  const chevronStyle = (page: number) => {
    if (page === currentPage) {
      return S.base.numbers;
    }
    return S.base.currentNumbers;
  };

  return (
    <div className={S.pagination}>
      <div className={S.chevronButton}>
        <button
          className={chevronStyle(1)}
          type="button"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeftIcon size={20} />
        </button>
        <button
          className={chevronStyle(1)}
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon size={20} />
        </button>
      </div>
      <div className={S.numberButtons}>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
          page => (
            <button
              type="button"
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${S.numberButtons} ${numberStyle(page)}`}
            >
              {page}
            </button>
          ),
        )}
      </div>
      <div className={S.chevronButton}>
        <button
          className={chevronStyle(totalPage)}
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          <ChevronRightIcon size={20} />
        </button>
        <button
          className={chevronStyle(totalPage)}
          type="button"
          onClick={() => handlePageChange(totalPage)}
          disabled={currentPage === totalPage}
        >
          <ChevronsRightIcon size={20} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ChevronsLeftIcon,
//   ChevronsRightIcon,
// } from 'lucide-react';

// import useSetSearchParams from '@/hooks/useSetSearchParam';

// import * as S from './Pagination.css';

// interface PaginationProps {
//   totalPage: number;
//   currentPage: number;
// }

// const NUM = 5;

// function Pagination({ pageInfo }: { pageInfo: PaginationProps }) {
//   const { totalPage, currentPage } = pageInfo;
//   const { setSingleSearchParam } = useSetSearchParams();

//   const handlePageChange = (newPage: number) => {
//     setSingleSearchParam('page', newPage.toString());
//   };

//   const half = Math.floor(NUM / 2);
//   const startPage = Math.max(1, Math.min(currentPage + 1 - half, totalPage - NUM + 1));
//   const endPage = Math.min(totalPage, startPage + NUM - 1);

//   const numberStyle = (page: number) => {
//     return currentPage + 1 === page ? S.base.currentNumbers : S.base.numbers;
//   };

//   const chevronLeftStyle = () => {
//     return currentPage + 1 === 1 ? S.base.numbers : S.base.currentNumbers;
//   };

//   const chevronRightStyle = () => {
//     return currentPage + 1 === totalPage ? S.base.numbers : S.base.currentNumbers;
//   };

//   return (
//     <div className={S.pagination}>
//       <div className={S.chevronButton}>
//         <button
//           className={chevronLeftStyle()}
//           type="button"
//           onClick={() => handlePageChange(1)}
//           disabled={currentPage + 1 === 1}
//         >
//           <ChevronsLeftIcon size={20} />
//         </button>
//         <button
//           className={chevronLeftStyle()}
//           type="button"
//           onClick={() => handlePageChange(currentPage)}
//           disabled={currentPage + 1 === 1}
//         >
//           <ChevronLeftIcon size={20} />
//         </button>
//       </div>
//       <div className={S.numberButtons}>
//         {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
//           page => (
//             <button
//               type="button"
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`${S.numberButtons} ${numberStyle(page)}`}
//             >
//               {page}
//             </button>
//           ),
//         )}
//       </div>
//       <div className={S.chevronButton}>
//         <button
//           className={chevronRightStyle()}
//           type="button"
//           onClick={() => handlePageChange(currentPage + 2)}
//           disabled={currentPage + 1 === totalPage}
//         >
//           <ChevronRightIcon size={20} />
//         </button>
//         <button
//           className={chevronRightStyle()}
//           type="button"
//           onClick={() => handlePageChange(totalPage)}
//           disabled={currentPage + 1 === totalPage}
//         >
//           <ChevronsRightIcon size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Pagination;
