/* eslint-disable react/require-default-props */
// 옵셔널 값이지만 초기값을 설정하지 않아도 되는 경우에는 eslint-disable를 사용한다.

import React from 'react';

import Link from 'next/link';

import * as S from './Breadcrumb.css';

interface BreadcrumbProps {
  children: React.ReactNode;
}

export function Breadcrumb({ children }: BreadcrumbProps) {
  const items = React.Children.toArray(children);
  const lastIndex = items.length - 1;

  return (
    <div className={S.breadcrumb}>
      {items.map((child, index) =>
        React.cloneElement(child as React.ReactElement, {
          isLast: index === lastIndex,
        }),
      )}
    </div>
  );
}

interface BreadcrumbItemProps {
  children: React.ReactNode;
  href?: string;
  separator?: string;
  isLast?: boolean;
}

Breadcrumb.Item = function BreadcrumbItem({
  children,
  href,
  separator = '>',
  isLast = false,
}: BreadcrumbItemProps) {
  return (
    <>
      {href ? (
        <Link href={href}>
          <div className={`${S.breadcrumbItemLink} ${isLast ? S.lastBreadcrumbItem : ''}`}>
            {children}
          </div>
        </Link>
      ) : (
        <div className={`${S.breadcrumbItem} ${isLast ? S.lastBreadcrumbItem : ''}`}>
          {children}
        </div>
      )}
      {!isLast && <div className={S.separator}>{separator}</div>}
    </>
  );
};
