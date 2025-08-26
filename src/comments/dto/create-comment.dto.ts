import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Ótimo post! Muito esclarecedor.',
    description: 'Texto do comentário',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
