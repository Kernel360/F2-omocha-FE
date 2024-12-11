'use client';

import { UserIcon } from 'lucide-react';
import Image from 'next/image';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import { Modal } from '@/components/Modal/Modal';
import ImageUploadModal from '@/components/MypageUserSection/components/ImageUploadModal';
import useBooleanState from '@/hooks/useBooleanState';
import useRequireAuth from '@/hooks/useRequireAuth';
import colors from '@/styles/color';

import * as S from './MypageUserSection.css';
import SkeletonCard from '../Skeleton/components/SkeletonCard';

function MypageUserSection() {
  const { data: user } = useGetUser();
  const { value: isOpenImageUploadModal, toggle: setIsOpenImageUploadModal } = useBooleanState();

  const { isCheckingAuth } = useRequireAuth();

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div className={S.profile}>
      <div className={S.image}>
        <button type="button" onClick={setIsOpenImageUploadModal} className={S.imageButton}>
          {user?.profile_image_url ? (
            <Image
              className={S.profileImage}
              src={`${process.env.NEXT_PUBLIC_S3_URL}${user.profile_image_url}`}
              width={100}
              height={100}
              priority
              alt="프로필 이미지"
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
