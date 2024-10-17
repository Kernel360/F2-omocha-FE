import * as S from './ChattingPopover.css';

interface ChattingPopoverProps {
  id: number;
}

function ChattingPopover({ id }: ChattingPopoverProps) {
  return (
    <>
      ChattingPopovers
      <div className={S.container}>test{id}</div>
    </>
  );
}

export default ChattingPopover;
