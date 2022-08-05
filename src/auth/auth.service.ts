import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// 로그인 할 때 email, password 필요하고, 이를 통해서 해당하는 email이 db에 존재하는지 check.
// email, password 유효성 검사후 jwt로 데이터 보내준다.
@Injectable()
export class AuthService {
  //종속성 주입 for cat의 db 사용하기 위해
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService, // auth.module에 JwtModule에서 제공
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 해당하는 email이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //* password가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: cat.id }; //sub: 토큰 제목

    return { token: this.jwtService.sign(payload) };
  }

  // 유효성 검사 후, F.E에게 JWT를 넘겨주면, F.E.는 JWT를 안전한 곳에 저장.
  // Nest.jwt에 존재하는 jwt 서비스를 이용해야.
  // 그리고 완성된 이 서비스를 cats.controller에서 사용한다.
}
