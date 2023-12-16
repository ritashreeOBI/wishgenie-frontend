import { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@/editor-components/components/Loader/Loader';



const InfiniteWrapper = ({ count, fetchItems, children }) => {
  return (
    <InfiniteScroll
      scrollableTarget={'imageGrid'}
      dataLength={count}
      style={{ overflow: 'hidden' }}
      next={fetchItems}
      hasMore={true}
      loader={<Loader />}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteWrapper;
