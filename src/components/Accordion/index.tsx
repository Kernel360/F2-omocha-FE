/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import * as Accordion from '@radix-ui/react-accordion';

// AccordionTrigger 타입 정의
type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof Accordion.Trigger> & {
  children: React.ReactNode;
};

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger {...props} ref={forwardedRef}>
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);
AccordionTrigger.displayName = 'AccordionTrigger'; // forwardRef 사용 시 displayName을 지정

// AccordionContent 타입 정의
type AccordionContentProps = React.ComponentPropsWithoutRef<typeof Accordion.Content> & {
  children: React.ReactNode;
};

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <Accordion.Content {...props} ref={forwardedRef}>
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  ),
);
AccordionContent.displayName = 'AccordionContent'; // forwardRef 사용 시 displayName을 지정??

// AccordionDemo 컴포넌트

function AccordionList() {
  return (
    <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
      <Accordion.Item className="AccordionItem" value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </Accordion.Item>

      <Accordion.Item className="AccordionItem" value="item-2">
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent>
          Yes.s unstyled by default, giving you freedom over the look and feel.
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className="AccordionItem" value="item-3">
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default AccordionList;
