import { useState } from 'react';
import './App.css';
import { data } from './constant/data.ts';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import ArrayMove from './utils/ArrayMove.ts';
import UploadIcon from './constant/icons/uploadIcon.tsx';
import LazyImage from './components/LazyImage.tsx';
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
  const [deleteItem, setDeleteItem] = useState<number[]>([]);
  const deleteMedia = () => {
    const newData = selectedMedia.filter((el) => !deleteItem.includes(el.id));
    setSelectedMedia(newData);
    setDeleteItem([]);
  };
  console.log(selectedMedia, deleteItem);
  const SortablePhoto = SortableElement((props: SortablePhotoType) => (
    <div className='lazy-image image-select-wrapper'>
      <LazyImage src={props?.item.src} />
      <div className='image-select'>
        <div className='image-select-input-wrapper'>
          <input
            checked={deleteItem.includes(props?.item.id)}
            type='checkbox'
            onChange={() => {
              if (deleteItem.includes(props?.item.id)) {
                console.log('Delete', deleteItem, '=>', props?.item.id);
                const newData = deleteItem.filter((el) => el !== props?.item.id);
                setDeleteItem(newData);
                return;
              }
              setDeleteItem([...deleteItem, props?.item.id]);
            }}
          />
        </div>
        <div className='image-select-bg'></div>
      </div>
    </div>
  ));
  const SortableGallery = SortableContainer((props: SortableContainerType) => (
    <div className='gridbox'>
      {props?.items.map((item, index) => (
        <SortablePhoto
          index={index}
          // eslint-disable-next-line
          // @ts-ignore
          item={item}
          key={`${index}_new-prod-media`}
        />
      ))}

      <label htmlFor='upload-button'>
        <div className='image-uploader-wrapper '>
          <div className='image-uploader'>
            <UploadIcon width='30px' />
            <p>Drag and drop files here</p>
          </div>
        </div>
        {/* )} */}
      </label>
      <input
        type='file'
        id='upload-button'
        className='sr-only'
        onChange={(e) => {
          if (!e?.target?.files) return;
          setSelectedMedia([
            ...selectedMedia,
            {
              src: URL.createObjectURL(e?.target?.files[0]),
              id: selectedMedia.length + 1,
            },
          ]);
        }}
      />
    </div>
  ));
  const onSortEnd = (props: onSortEndType) => {
    const newData = ArrayMove(selectedMedia, props?.oldIndex, props?.newIndex).filter((el) => !!el);
    setSelectedMedia(newData);
  };
  return (
    <div className='container'>
      <div className='header'>
        {deleteItem.length ? (
          <>
            <h1>{deleteItem.length} file selected</h1>
            <button type='button' className='button' onClick={deleteMedia}>
              delete
            </button>
          </>
        ) : (
          <h1>Optimized Image Gallery</h1>
        )}
      </div>
      <SortableGallery
        // eslint-disable-next-line
        // @ts-ignore
        items={selectedMedia}
        onSortEnd={onSortEnd}
        axis={'xy'}
      />
    </div>
  );
}

export default App;
