import { MetaProps } from './layout';

export interface DocumentsPageProps {
  pageNumber: number;
  documents: any[];
  documentsTotalCount: number;
  pagesCount: number;
  customMetadata?: MetaProps;
}

export interface DocumentsPageStaticProps {
  props: DocumentsPageProps;
}
