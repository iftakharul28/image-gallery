import { useState } from 'react';
import './App.css';
// import LazyImage from './components/LazyImage';
import LazyLoader from './components/LazyLoader';
import { data } from './constant/data';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import ArrayMove from './utils/ArrayMove';
// import { Writeable } from './models/common';
type onSortEndType = {
  oldIndex: number;
  newIndex: number;
};
type SortableContainerType = {
  items: typeof data;
};
type SortablePhotoType = {
  item: (typeof data)[number];
};
function App() {
  const [selectedMedia, setSelectedMedia] = useState(data);
  const SortablePhoto = SortableElement((props: SortablePhotoType) => (
    <>
      <LazyLoader divClassName='image-wrapper' className='image' src={`/images/` + props?.item.src} />
      {/* <Image
          className='w-full'
          src={`${mediaPath.thumb}${items.file_name}`}
          placeholder={<div>Loading...</div>}
          preview={{
            visible: false,
            mask: <button onClick={() => onDeleteSelectedMedia(items.id)}>Delete</button>,
          }}
        /> */}
    </>
  ));
  const SortableGallery = SortableContainer((props: SortableContainerType) => (
    <div className='flexbox'>
      {props?.items.map((item, index) => (
        <SortablePhoto
          index={index}
          // eslint-disable-next-line
          // @ts-ignore
          item={item}
          key={`${index}_new-prod-media`}
        />
      ))}
    </div>
  ));
  const onSortEnd = (props: onSortEndType) => {
    const newData = ArrayMove(selectedMedia, props?.oldIndex, props?.newIndex).filter((el) => !!el);
    setSelectedMedia(newData);
  };
  return (
    <div data-test-id='component-app' className='container'>
      <h1>Optimized Image Loading</h1>
      <SortableGallery
        // eslint-disable-next-line
        // @ts-ignore
        items={selectedMedia}
        onSortEnd={onSortEnd}
        axis={'xy'}
      />
      {/* {selectedMedia.map((item, index) => (
          <LazyImage src={item.src} key={index} />
        ))} */}
      {/* {data.map((item, index) => (
          <LazyLoader divClassName='image-wrapper' className='image' src={item.src + `?w=10`} key={index} />
        ))} */}
    </div>
  );
}

export default App;
