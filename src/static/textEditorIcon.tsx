import { ReactElement } from 'react';

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  QuoteIcon,
  UnderlineIcon,
  Heading1Icon,
  Heading2Icon,
  ListIcon,
  ListOrderedIcon,
} from 'lucide-react';

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
    icon: <Heading1Icon />,
  },
  {
    id: 2,
    format: 'heading-two',
    icon: <Heading2Icon />,
  },
  {
    id: 3,
    format: 'block-quote',
    icon: <QuoteIcon />,
  },
  {
    id: 4,
    format: 'numbered-list',
    icon: <ListOrderedIcon />,
  },
  {
    id: 5,
    format: 'bulleted-list',
    icon: <ListIcon />,
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
