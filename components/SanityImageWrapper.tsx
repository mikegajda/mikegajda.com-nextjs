// import Image from 'next/image';
// import { ExifData } from '../pages/api/exif/[id]';

// const cloudfrontRoot = 'https://d13x618ct7s3kv.cloudfront.net';

// const getBlurredImageUrl = (src) => {
//   const imageRequest = JSON.stringify({
//     bucket: 'cdn.dynamic-images.mikegajda.com',
//     key: src,
//     edits: {
//       resize: {
//         width: 10,
//         fit: 'cover',
//       },
//     },
//   });

//   const request = Buffer.from(imageRequest).toString('base64');
//   const url = `${cloudfrontRoot}/${request}`;

//   return url;
// };

// const sanityDynamicLoader = ({ src, width }): string => {
//   const url = `${src}?w=${width}`;
//   return url;
// };

// type SanityImage = {
//   assetId: string;
//   name: string;
//   slug: string;
//   url: string;
//   metadata: {
//     exif: ExifData;
//     location: {
//       lng: string;
//       lat: string;
//     };
//     lqip;
//   };
// };
// type SanityImageWrapperProps = {
//   sanityImage: SanityImage;
// };

// export const SanityImageWrapper = ({
//     sanityImage,
//   }: SanityImageWrapperProps) => {

//   return (
//     <div
//       className={
//         'bg-white p-4 aspect-[5/4] flex flex-col items-center justify-center'
//       }
//     >
//       <div className={`relative h-full w-full`}>
//         <Image
//           loader={sanityDynamicLoader}
//           src={sanityImage.url}
//           alt={`${sanityImage.name}`}
//           layout={'fill'}
//           objectFit="contain"
//           sizes="75vw",
//           blurDataURL={`${sanityImage.metadata.lqip}`}
//         />
//       </div>
//     </div>
//   );
// };
