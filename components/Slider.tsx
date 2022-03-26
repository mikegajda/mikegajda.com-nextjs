import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect, useCallback } from 'react';
import { ImagekitImage } from './ImagekitImage';

export default function Slider() {
  // emblaRef will be a reference to our carousel viewport
  const [emblaRef, embla] = useEmblaCarousel({
    align: 'start',
    // aligns the first slide to the start
    // of the viewport else will align it to the middle.

    loop: true,
    // we need the carousel to loop to the
    // first slide once it reaches the last slide.

    skipSnaps: false,
    // Allow the carousel to skip scroll snaps if
    // it's dragged vigorously.

    inViewThreshold: 0.7,
    // percentage of a slide that need's to be visible
    // inorder to be considered in view, 0.7 is 70%.
  });

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

  const images = [1, 2];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div
              key={image}
              className="relative flex flex-none flex-wrap  w-full mx-10"
            >
              <div className="overflow-hidden cursor-pointer w-full"></div>
              <div className="flex flex-col space-y-4 w-full">
                <ImagekitImage
                  src={'DSCF2693_C5oeBk_LE.jpeg'}
                  width={4160}
                  height={6240}
                  alt={'Fox Theatre'}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          {selectedIndex}
          {scrollSnaps}
        </div>
        <button
          onClick={() => {
            scrollTo(1);
          }}
        >
          Test
        </button>
      </div>
    </div>
  );
}
