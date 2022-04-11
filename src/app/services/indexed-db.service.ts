import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { IComment } from '../models/comment.model';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db: Dexie;
  private comments_table: Dexie.Table<IComment, any>;
  private deletes_table: Dexie.Table<any, any>;
  constructor(private commentsService: CommentsService) {
    this.db = new Dexie('indexed-db');
    this.db.version(1).stores({
      comments: '++comment_id',
      deletes: '++comment_id',
    });
    this.comments_table = this.db.table('comments');
    this.deletes_table = this.db.table('deletes');
  }

  async storeCommentToIndexedDB(comment: IComment): Promise<void> {
    try {
      await this.comments_table.add(comment);
      console.log('Comment cached to IndexdDB');
    } catch (error) {
      console.log('Error while caching to Indexed DB ', error);
    }
  }

  async storeDeleteToIndexedDB(comment_id: number): Promise<void> {
    try {
      await this.deletes_table.add({ comment_id });
      console.log('Deletion cached to IndexdDB');
    } catch (error) {
      console.log('Error while caching to Indexed DB ', error);
    }
  }

  async sendFromIndexedDBToAPI() {
    const indexedComments: IComment[] = await this.comments_table.toArray();
    const indexedDeletes: number[] = await this.deletes_table.toArray();

    indexedComments.forEach(async (comment: IComment) => {
      this.commentsService.addComment(comment);
    });

    indexedDeletes.forEach(async (comment: any) => {
      this.commentsService.removeComment(comment.comment_id);
    });

    this.clearTables();
  }

  async clearTables() {
    await this.comments_table.clear();
    await this.deletes_table.clear();
  }
}
