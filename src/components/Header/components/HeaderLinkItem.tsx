import Link from 'next/link';

import { SubCategory } from '@/static/category';

interface HeaderItemActionProps {
  headerItem: SubCategory;
}

function HeaderLinkItem({ headerItem }: HeaderItemActionProps) {
  return <Link href={headerItem.path!}>{headerItem.name}</Link>;
}

export default HeaderLinkItem;
