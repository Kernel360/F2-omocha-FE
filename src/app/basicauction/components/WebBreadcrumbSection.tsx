import BreadcrumbSection from '@/components/BreadcrumbSection';

import * as S from './BreadCrumbSectionInWeb.css';

function WebBreadcrumbSection() {
  return (
    <div className={S.isWeb}>
      <BreadcrumbSection />
    </div>
  );
}

export default WebBreadcrumbSection;
