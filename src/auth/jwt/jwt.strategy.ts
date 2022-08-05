import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      // jwt에 대한 설정
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false, // 만료기간
    });
  }
  // payload : 전송되는 데이터
  // F.E.에서 저장된 JWT가 날라왔을 때, 해당하는 것을 읽고 payload를 뽑아냈다면, 그 payload의 유효성 검사
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      // 보안상의 이유로 request.user에 저장할 때 password 필드를 제외하고 저장하는 것이 좋습니다.
      payload.sub,
    );

    if (cat) {
      return cat; // request.user에 cat이 들어가게 된다.
    } else {
      throw new UnauthorizedException();
    }
  }
}
