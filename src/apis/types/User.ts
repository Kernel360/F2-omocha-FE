export interface UserResponseData {
  member_id: number;
  email: string;
  user_name: null | string;
  nick_name: null | string;
  phone_number: null | string;
  birth: null | string;
  role: 'ROLE_USER';
  profile_image_url: null | string;
}

export interface PatchProfileImageResponseData {
  image_url: string;
}
