import * as Collapsible from '@radix-ui/react-collapsible';

import useBooleanState from '@/hooks/useBooleanState';

import * as S from './Unit.css';

export interface Category {
  category_id: number;
  name: string;
  parent_id: number | null;
  sub_categories: Category[];
}

interface UnitProps {
  unit: Category;
}
function Unit({ unit }: UnitProps) {
  const { value: open, setValue: setOpen } = useBooleanState(true);

  console.log(unit);
  return (
    <div>
      <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild className={S.unitButton}>
          {unit.name}
        </Collapsible.Trigger>
        <Collapsible.Content className={S.unitContent}>
          {unit.sub_categories.map(sub_category => (
            <Unit key={sub_category.category_id} unit={sub_category} />
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

export default Unit;
