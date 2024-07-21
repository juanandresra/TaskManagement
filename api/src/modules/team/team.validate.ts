import { $Enums } from "@prisma/client";
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateTeamDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    members?: string[];

    @IsOptional()
    @IsArray()
    tasks?: string[];
};

export class UpdateTeamDto {
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    dueDate?: Date;

    @IsOptional()
    @IsNotEmpty()
    status?: $Enums.Status;

    @IsOptional()
    @IsNotEmpty()
    projectId?: string;
    
    @IsOptional()
    @IsNotEmpty()
    assignedToId?: string;
};
