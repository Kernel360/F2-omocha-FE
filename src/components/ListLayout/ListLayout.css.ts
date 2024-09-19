import { style } from '@vanilla-extract/css';

export const listLayout = style({
  display: 'grid',
  width: '100%',
  height: '100%',
  gridTemplateColumns: 'repeat(3, 1fr)',
  flexWrap: 'wrap',
  gap: '20px',
  justifyItems: 'center', // 각 grid 칸의 수평 가운데 정렬
  // alignItems: 'center', // 각 grid 칸의 수직 가운데 정렬
});

export const ResponsiveLayoutWrapper = style({
  position: 'relative',
  display: 'grid',
  gridRowGap: '2vw',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '3.333vw',
  width: '100%',
  maxWidth: '1200px',
  justifyItems: 'center',
  height: 'auto',
});

export const tteesstt = style({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: '56.26%',
  overflow: 'hidden',
  // position: 'relative',
  // display: 'grid',
  // gridRowGap: '2vw',
  // gridTemplateColumns: 'repeat(3, 1fr)',
  // gap: '3.333vw',
  // width: '100%',
  // maxWidth: '1200px',
  // justifyItems: 'center',
  // height: 'auto',
});

export const test = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',

  maxWidth: '1400px',

  margin: '0 auto',
  border: '1px solid black',
});

// export const ResponsiveLayoutWrapper = styled{(
//   position: relative;

//   display: grid;
//   grid-row-gap: 2vw;
//   grid-template-columns: repeat(3, 1fr);
//   flex-wrap: wrap;
//   gap: 3.333vw;

//   width: 100%;
//   max-width: 1280px;
//   height: auto;
//   margin-top: 45px;

//   ${onNotLarge} {
//     grid-template-columns: repeat(1, 1fr);
//   }
// )};
