import * as S from './Alarm.css';

interface AlarmProps {
  content: string;
}
function Alarm({ content }: AlarmProps) {
  return <div className={S.container}>{content}</div>;
}

export default Alarm;
