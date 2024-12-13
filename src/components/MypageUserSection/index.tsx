'use client';

import { UserIcon } from 'lucide-react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import { Modal } from '@/components/Modal/Modal';
import ImageUploadModal from '@/components/MypageUserSection/components/ImageUploadModal';
import useBooleanState from '@/hooks/useBooleanState';
import colors from '@/styles/color';

import CommonImage from '../CommonImage';
import SkeletonCard from '../Skeleton/components/SkeletonCard';

import * as S from './MypageUserSection.css';

function MypageUserSection() {
  const { data: user } = useGetUser();
  const { value: isOpenImageUploadModal, toggle: setIsOpenImageUploadModal } = useBooleanState();

  return (
    <div className={S.profile}>
      <div className={S.image}>
        <button type="button" onClick={setIsOpenImageUploadModal} className={S.imageButton}>
          {user?.profile_image_url ? (
            <CommonImage
              className={S.profileImage}
              src={`${process.env.NEXT_PUBLIC_S3_URL}${user.profile_image_url}`}
              alt="프로필 이미지"
              width={100}
              height={100}
              priority
            />
          ) : (
            <UserIcon size={100} strokeWidth={1} stroke={colors.gray5} />
          )}
        </button>
      </div>
      <Modal isOpen={isOpenImageUploadModal} onOpenChange={setIsOpenImageUploadModal}>
        <ImageUploadModal
          defaultImage={user?.profile_image_url}
          onClose={setIsOpenImageUploadModal}
        />
      </Modal>
      {user?.nickname ? (
        <h2 className={S.profileTitle}>{user.nickname}</h2>
      ) : (
        <SkeletonCard width={160} height={25} />
      )}
    </div>
  );
}

export default MypageUserSection;
