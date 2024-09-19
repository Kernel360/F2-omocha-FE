import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';

const auctionItems = [
  {
    id: 1,
    isExpired: false,
    image: 'https://via.placeholder.com/280x200',
    title: 'test 1',
    isLike: true,
    startPrice: 3000,
    startTime: '2024-09-01 14:00:00',
    endTime: '2024-09-01 14:00:00',
  },
  {
    id: 2,
    isExpired: false,
    image: 'https://via.placeholder.com/280x200',
    title: 'test 2',
    isLike: false,
    startPrice: 5000,
    startTime: '2024-09-02 14:00:00',
    endTime: '2024-09-02 14:00:00',
  },
  {
    id: 3,
    isExpired: true,
    image: 'https://via.placeholder.com/280x200',
    title: 'test 3',
    isLike: true,
    startPrice: 2000,
    startTime: '2024-09-03 14:00:00',
    endTime: '2024-09-03 14:00:00',
  },
  {
    id: 4,
    isExpired: true,
    image: 'https://via.placeholder.com/280x200',
    title: 'test 3',
    isLike: true,
    startPrice: 2000,
    startTime: '2024-09-03 14:00:00',
    endTime: '2024-09-03 14:00:00',
  },
  {
    id: 5,
    isExpired: true,
    image: 'https://via.placeholder.com/280x200',
    title: 'test 3',
    isLike: true,
    startPrice: 2000,
    startTime: '2024-09-03 14:00:00',
    endTime: '2024-09-03 14:00:00',
  },
];

export default function Home() {
  return (
    <ListLayout>
      {auctionItems.map(item => (
        <AuctionCard
          key={item.id}
          isExpired={item.isExpired}
          image={item.image}
          title={item.title}
          isLike={item.isLike}
          startPrice={item.startPrice}
          startTime={item.startTime}
          endTime={item.endTime}
        />
      ))}
    </ListLayout>
  );
}
