import { redirect } from 'next/navigation';

function Home() {
  redirect('/mypage/profile');
}

export default Home;
