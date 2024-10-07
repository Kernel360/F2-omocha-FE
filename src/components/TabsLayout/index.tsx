import * as Tabs from '@radix-ui/react-tabs';

import * as S from './TabsLayout.css';

interface TabsLayoutProps {
  defaultTriggerValue: string;
  triggerTitleList: {
    title: string;
    value: string;
  }[];
  childrenList: React.ReactElement[];
}

function TabsLayout({ defaultTriggerValue, triggerTitleList, childrenList }: TabsLayoutProps) {
  return (
    <Tabs.Root className={S.tabsRoot} defaultValue={defaultTriggerValue}>
      <Tabs.List className={S.tabsList}>
        {triggerTitleList.map(trigger => (
          <Tabs.Trigger key={trigger.value} className={S.tabsTrigger} value={trigger.value}>
            {trigger.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {childrenList.map((children, index) => (
        <Tabs.Content
          key={triggerTitleList[index].value}
          className={S.tabsContent}
          value={triggerTitleList[index].value}
        >
          {children}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

export default TabsLayout;
