import { IComment } from '../models/comment.model';

export function buildFormData(comment: IComment): FormData {
  const formData = new FormData();
  formData.append('author', comment.author);
  formData.append('comment', comment.comment);
  comment.files.forEach((file: File) => {
    formData.append('comment-image', file, file.name);
  });
  return formData;
}
