import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './controller/cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './cats.aws.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './upload' }), // dest : destination. upload에 저장이 된다.
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
      { name: Cat.name, schema: CatSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, AwsService], // 캡슐화
  exports: [CatsService, CatsRepository], // public화
})
export class CatsModule {}
