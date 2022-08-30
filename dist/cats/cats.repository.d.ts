import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
export declare class CatsRepository {
    private readonly catModel;
    constructor(catModel: Model<Cat>);
    findAll(): Promise<Cat[]>;
    findByIdAndUpdateImg(id: string, fileName: string): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("src/comments/comments.schema").Comments[];
    }>;
    findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null>;
    findCatByEmail(email: string): Promise<Cat | null>;
    existsByEmail(email: string): Promise<boolean>;
    create(cat: CatRequestDto): Promise<Cat>;
}
