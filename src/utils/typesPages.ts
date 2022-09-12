import { TArticle } from './typesComponentProps';

export type TPropsArticle = { article: TArticle; canModify: boolean };

export type TPropsTags = {
  tags: Array<string>;
  onClickTag: any;
};
