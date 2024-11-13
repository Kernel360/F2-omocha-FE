/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { UserIcon, EyeOffIcon, EyeIcon } from 'lucide-react';
import Image from 'next/image';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import usePatchPassword from '@/apis/queryHooks/User/usePatchPassword';
import {
  currentPasswordValidation,
  newPasswordCheckValidation,
  newPasswordValidation,
} from '@/app/mypage/profile/utils/profileValidation';
import CommonButton from '@/components/CommonButton';
import CommonInput from '@/components/CommonInput';
import { Modal } from '@/components/Modal/Modal';
import ImageUploadModal from '@/components/MypageProfileClientPage/components/ImageUploadModal';
import useBooleanState from '@/hooks/useBooleanState';
import colors from '@/styles/color';
import sha256 from '@/utils/sha256';

import * as S from './Profile.css';

type Inputs = {
  currentPasswordRequired: string;
  newPasswordRequired: string;
  newPasswordCheckRequired: string;
};

function Home() {
  const { data: user } = useGetUser();

  const { value: isOpenImageUploadModal, toggle: setIsOpenImageUploadModal } = useBooleanState();
  const { value: isBlind, toggle: setIsBlind } = useBooleanState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const newPasswordValue = watch('newPasswordRequired');

  const { mutate: patchPassword } = usePatchPassword();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const currentPasswordSha = await sha256(data.currentPasswordRequired);
    const newPasswordSha = await sha256(data.newPasswordCheckRequired);
    patchPassword({
      current_password: currentPasswordSha,
      new_password: newPasswordSha,
    });
  };

  if (!user) return null;

  return (
    <div className={S.profile}>
      <h3>회원 정보 수정</h3>
      <section className={S.section}>
        <h3 className={S.sectionTitle}>프로필</h3>
        <div className={S.image}>
          <button type="button" onClick={setIsOpenImageUploadModal} className={S.imageButton}>
            {user.profile_image_url ? (
              <Image
                className={S.profileImage}
                src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${user.profile_image_url}`}
                width={100}
                height={100}
                alt="프로필 이미지"
              />
            ) : (
              <UserIcon size={100} strokeWidth={1} stroke={colors.gray5} />
            )}
          </button>
        </div>
        <Modal isOpen={isOpenImageUploadModal} onOpenChange={setIsOpenImageUploadModal}>
          <ImageUploadModal
            defaultImage={user.profile_image_url!}
            onClose={setIsOpenImageUploadModal}
          />
        </Modal>
        <CommonInput label="아이디" id="email" value={user.email} disabled />
        <CommonInput label="닉네임" id="nickname" value={user.email} disabled />
      </section>
      <section className={S.section}>
        <h3 className={S.sectionTitle}>비밀번호 변경</h3>
        <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={S.commonInputContainer}>
            <CommonInput
              id="currentPasswordRequired"
              label="현재 비밀번호"
              type={isBlind ? 'text' : 'password'}
              register={register}
              validation={currentPasswordValidation}
              error={errors.currentPasswordRequired}
            />
            <button className={S.blind} type="button" onClick={setIsBlind}>
              {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
            </button>
          </div>
          <div className={S.commonInputContainer}>
            <CommonInput
              id="newPasswordRequired"
              label="새 비밀번호"
              type={isBlind ? 'text' : 'password'}
              register={register}
              validation={newPasswordValidation}
              error={errors.newPasswordRequired}
            />
            <button className={S.blind} type="button" onClick={setIsBlind}>
              {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
            </button>
          </div>
          <div className={S.commonInputContainer}>
            <CommonInput
              id="newPasswordCheckRequired"
              label="새 비밀번호 확인"
              type={isBlind ? 'text' : 'password'}
              register={register}
              validation={newPasswordCheckValidation(newPasswordValue)}
              error={errors.newPasswordCheckRequired}
            />
            <button className={S.blind} type="button" onClick={setIsBlind}>
              {isBlind ? <EyeIcon size={20} /> : <EyeOffIcon size={20} color={colors.gray8} />}
            </button>
          </div>
          <div className={S.buttonContainer}>
            <CommonButton disabled={!isValid} content=" 비밀번호 변경" type="submit" size="lg" />
          </div>
        </form>
      </section>
    </div>
  );
}

export default Home;
