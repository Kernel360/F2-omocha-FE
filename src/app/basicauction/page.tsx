import SearchBar from '@/app/basicauction/serachbar';

function Home({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <div>
      <SearchBar />
      {searchParams.q}
    </div>
  );
}

export default Home;
