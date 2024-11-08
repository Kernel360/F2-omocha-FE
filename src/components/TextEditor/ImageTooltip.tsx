import * as Tooltip from '@radix-ui/react-tooltip';
import { ImageIcon } from 'lucide-react';

import * as S from './TextEditor.css';

function ImageTooltip() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button type="button" className={S.tooltipButton}>
            <ImageIcon size={15} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={S.tooltipContent} sideOffset={5}>
            상품 정보란에 이미지를 드래그하여 넣어주세요.
            <Tooltip.Arrow className={S.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default ImageTooltip;
