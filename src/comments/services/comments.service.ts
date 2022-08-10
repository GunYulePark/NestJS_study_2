import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comments } from '../comments.schema';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, commentData: CommentsCreateDto) {
    // 여기서 param으로 받은 id는 uri뒷부분에 있는 id이자, info_id
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { contents, author } = commentData; // 구조분해 할당(body로 받은 commentData를 contents와 author로 쪼개받기) string, Types.ObjectId
      // 바로 author를 넣어도 되지만, 변조 가능성이 있기 때문에 catsRepository에 해당하는 author이 있는지 확인.
      const validateAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);

      const newComment = new this.commentsModel({
        author: validateAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
  }
}
