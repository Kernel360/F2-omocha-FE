import { ReactElement } from 'react';

import AlignCenterIcon from '@/assets/svg/text-editor/align-center.svg';
import AlignJustifyIcon from '@/assets/svg/text-editor/align-justify.svg';
import AlignLeftIcon from '@/assets/svg/text-editor/align-left.svg';
import AlignRightIcon from '@/assets/svg/text-editor/align-right.svg';
import BoldIcon from '@/assets/svg/text-editor/bold.svg';
import CodeIcon from '@/assets/svg/text-editor/code.svg';
import HeadingOneIcon from '@/assets/svg/text-editor/heading-1.svg';
import HeadingTwoIcon from '@/assets/svg/text-editor/heading-2.svg';
import ItalicIcon from '@/assets/svg/text-editor/italic.svg';
import ListBulletIcon from '@/assets/svg/text-editor/list-bullet.svg';
import ListNumberIcon from '@/assets/svg/text-editor/list-number.svg';
import QuoteIcon from '@/assets/svg/text-editor/quote.svg';
import UnderlineIcon from '@/assets/svg/text-editor/underline.svg';

interface TextEditorIcon {
  id: number;
  format: string;
  icon: ReactElement;
}

export const TEXT_EDITOR_MARK_ICON: TextEditorIcon[] = [
  {
    id: 1,
    format: 'bold',
    icon: <BoldIcon />,
  },
  {
    id: 2,
    format: 'italic',
    icon: <ItalicIcon />,
  },
  {
    id: 3,
    format: 'underline',
    icon: <UnderlineIcon />,
  },
  {
    id: 4,
    format: 'code',
    icon: <CodeIcon />,
  },
];

export const TEXT_EDITOR_BLOCK_ICON: TextEditorIcon[] = [
  {
    id: 1,
    format: 'heading-one',
    icon: <HeadingOneIcon />,
  },
  {
    id: 2,
    format: 'heading-two',
    icon: <HeadingTwoIcon />,
  },
  {
    id: 3,
    format: 'block-quote',
    icon: <QuoteIcon />,
  },
  {
    id: 4,
    format: 'numbered-list',
    icon: <ListNumberIcon />,
  },
  {
    id: 5,
    format: 'bulleted-list',
    icon: <ListBulletIcon />,
  },
  {
    id: 6,
    format: 'left',
    icon: <AlignLeftIcon />,
  },
  {
    id: 7,
    format: 'center',
    icon: <AlignCenterIcon />,
  },
  {
    id: 8,
    format: 'right',
    icon: <AlignRightIcon />,
  },
  {
    id: 9,
    format: 'justify',
    icon: <AlignJustifyIcon />,
  },
];
