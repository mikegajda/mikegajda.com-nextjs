export interface PostType extends SanityObject {
  author: Author;
  body: any[];
  publishedAt: string;
  title: string;
  slug: Slug;
}

export interface Author extends SanityObject {
  name: string;
  slug: Slug;
}

export interface Slug {
  _type: string;
  current: string;
}

export interface SanityObject {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface ImageWrapper extends SanityObject {
  image: SanityImage;
}

export interface SanityImage {
  _type: string;
  altText: string;
  caption: string;
  slug: Slug;
  title: string;
  asset: SanityAsset;
}

export interface SanityAsset extends SanityObject {
  extension: string;
  metadata: SanityAssetMetadata;
  mimeType: string;
  originalFilename: string;
  path: string;
  sha1hash: string;
  size: number;
  uploadId: string;
  url: string;
}

export interface SanityAssetMetadata {
  _type: string;
  blurHash: string;
  dimensions: {
    aspectRatio: number;
    height: number;
    width: number;
  };
  exif: Exif;
  location: Location;
  hasAlpha: boolean;
  isOpaque: boolean;
  lqip: string;
  palette: any;
}

export interface Location {
  _type: string;
  lat: number;
  lng: number;
}
export interface Exif {
  ExposureTime: number;
  FNumber: string;
  ISO: string;
  LensModel: string;
  ShutterSpeedValue: number;
  FocalLength: number;
}
