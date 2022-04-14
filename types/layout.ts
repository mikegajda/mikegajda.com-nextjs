export interface MetaProps {
  // todo: turn this extends back on
  // extends Pick<PostType, 'date' | 'description' | 'image' | 'title'> {
  /**
   * For the meta tag `og:type`
   */
  type?: string;
  title: string;
  description?: string;
  image?: string;
  date?: string;
}
