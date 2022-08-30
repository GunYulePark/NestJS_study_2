/// <reference types="multer" />
import { CatsService } from '../cats.service';
import { CatRequestDto } from '../dto/cats.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { Cat } from '../cats.schema';
import { AwsService } from '../cats.aws.service';
export declare class CatsController {
    private readonly catsService;
    private readonly authService;
    private readonly awsService;
    constructor(catsService: CatsService, authService: AuthService, awsService: AwsService);
    getCurrentCat(cat: Cat): {
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../../comments/comments.schema").Comments[];
    };
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../../comments/comments.schema").Comments[];
    }>;
    logIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
    logOut(): string;
    uploadCatImg(file: Express.Multer.File): Promise<{
        key: string;
        s3Object: import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/s3").PutObjectOutput, import("aws-sdk").AWSError>;
        contentType: string;
    }>;
    getImageUrl(key: string): string;
    getAllCat(): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments: import("../../comments/comments.schema").Comments[];
    }[]>;
}
