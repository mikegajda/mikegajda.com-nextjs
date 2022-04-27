import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useState, useEffect, useCallback } from 'react';
import { ImageWrapper } from '../types/post';
import { SanityImageWrapper } from './SanityImageWrapper';

export type GalleryProps = {
  value: {
    images: ImageWrapper[];
  };
};

export const DotButton = ({ selected, onClick }) => {
  const color = selected
    ? 'bg-emerald-500 dark:bg-emerald-600'
    : 'bg-gray-500 dark:bg-gray-300';
  return (
    <button
      className={`w-6 lg:w-9 h-2 rounded-xl mx-1 ${color}`}
      type="button"
      onClick={onClick}
    />
  );
};

const buttonClassName = `text-sm py-1 px-3 md:px-4 rounded bg-emerald-500 text-white disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-emerald-600 dark:disabled:bg-gray-300 dark:bg-emerald-600`;
export const PrevButton = ({ enabled, onClick }) => (
  <button className={buttonClassName} onClick={onClick} disabled={!enabled}>
    {'←'}
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button className={buttonClassName} onClick={onClick} disabled={!enabled}>
    {'→'}
  </button>
);

export default function Gallery(props: GalleryProps) {
  // emblaRef will be a reference to our carousel viewport
  const [emblaRef, embla] = useEmblaCarousel(
    {
      align: 'start',
      // aligns the first slide to the start
      // of the viewport else will align it to the middle.

      loop: false,
      // we need the carousel to loop to the
      // first slide once it reaches the last slide.

      skipSnaps: false,
      // Allow the carousel to skip scroll snaps if
      // it's dragged vigorously.

      inViewThreshold: 0.7,
      // percentage of a slide that need's to be visible
      // inorder to be considered in view, 0.7 is 70%.
    },
    [Autoplay({ delay: 3500 })]
  );

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // this function allow's us to scroll to the slide whose
  // id correspond's to the id of the navigation dot when we
  // click on it.

  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla,
  ]);

  // set the id of the current slide to active id
  // we need it to correctly highlight it's corresponding
  // navigation dot.

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  // make sure embla is mounted and return true operation's
  // can be only performed on it if it's successfully mounted.

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {props.value.images.map((image) => (
            <div
              key={image.image.slug.current}
              className="relative flex flex-none flex-wrap  w-full mx-10"
            >
              <div className="overflow-hidden cursor-pointer w-full"></div>
              <div className="flex flex-col space-y-4 w-full">
                <SanityImageWrapper
                  value={{
                    image: image.image,
                  }}
                  showWhiteFrame={true}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={'flex flex-row w-full justify-between'}>
          <div className="flex-none">
            <PrevButton enabled={selectedIndex > 0} onClick={scrollPrev} />
          </div>
          <div className="">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
          <div className="flex-none">
            <NextButton
              enabled={selectedIndex < scrollSnaps.length - 1}
              onClick={scrollNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
