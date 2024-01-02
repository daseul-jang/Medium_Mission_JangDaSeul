import { Post } from '@/model/post';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  posts: Post[];
}

export default function Carousel({ children, posts }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    // 이전 버튼 클릭 핸들러
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    // 다음 버튼 클릭 핸들러
    if (currentIndex < Math.ceil(posts.length / 6) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentPosts = posts.slice(currentIndex * 6, (currentIndex + 1) * 6);

  return (
    <div>
      <button onClick={handlePrevClick}>Prev</button> {/* 이전 버튼 */}
      <button onClick={handleNextClick}>Next</button> {/* 다음 버튼 */}
      {currentPosts.map((post, index) => (
        <div key={index}>{children}</div>
      ))}
    </div>
  );
}
