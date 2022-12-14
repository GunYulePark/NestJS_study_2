import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsService {
  // Mongoose에 직접 연결하던 거 CatsRepository를 통해 중개받기
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll(); // 모든 cat을 db에서 꺼내온 다음에 필요한 데이터들만 넘겨준다.
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData); // readOnly로 넣어준다.
    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`; // key는 파일 경로를 뜻한다.
    // db에는 img 저장. f.e.에는 이 img url 보내준다.

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
