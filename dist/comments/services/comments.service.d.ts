import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comments } from '../comments.schema';
import { CommentsCreateDto } from '../dtos/comments.create.dto';
export declare class CommentsService {
    private readonly commentsModel;
    private readonly catsRepository;
    constructor(commentsModel: Model<Comments>, catsRepository: CatsRepository);
    getAllComments(): Promise<Comments[]>;
    createComment(id: string, commentData: CommentsCreateDto): Promise<Comments>;
    plusLike(id: string): Promise<Comments>;
}
