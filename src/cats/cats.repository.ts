import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as mongoose from 'mongoose';
import { CommentsSchema } from 'src/comments/comments.schema';
@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();

    console.log(newCat);
    return newCat.readOnlyData;
  }
  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }
  // 이메일을 넘겨주면 cat을 찾아주는.
  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result;
    // 현재는 mongoose 단에서 error 처리 함.
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
