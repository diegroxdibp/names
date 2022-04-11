export interface IComment {
  comment_id?: number;
  author: string;
  comment: string;
  commented_at?: string;
  images_url?: string[];
  imageBase64?: string;
  files?: any;
}
