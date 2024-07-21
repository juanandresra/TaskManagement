import { IsOptional, IsString, MaxLength, IsNotEmpty } from "class-validator";

export class CreateCommentnDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    content: string;

    @IsNotEmpty()
    @IsString()
    taskId: string;

};

export class UpdateCommentDto {

    @IsOptional()
    @IsString()
    @MaxLength(255)
    content?: string;

};
