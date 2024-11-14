import { Pageable } from './basicAuction';

export interface UserData {
  member_id: number;
  email: string;
  user_name: string | null;
  nick_name: string | null;
  phone_number: string | null;
  birth: string | null;
  role: string; // ROLE_USER 타입 정의 필요
  profile_image: string | null;
}
