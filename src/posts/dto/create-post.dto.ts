import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'https://example.com/cover.png',
    description: 'URL da imagem de capa do post',
  })
  @IsUrl()
  @IsNotEmpty()
  cover: string;

  @ApiProperty({
    example: 'Introdução ao React',
    description: 'Título do post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'introducao-ao-react',
    description: 'Slug único do post',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    example: 'Neste post, vamos explorar os conceitos básicos do React...',
    description: 'Corpo do post',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    example:
      '```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```',
    description: 'Código markdown do post',
  })
  @IsString()
  @IsNotEmpty()
  markdown: string;

  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID do autor do post (User ID)',
  })
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({
    example: 0,
    description: 'Número de likes do post',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  likes?: number;
}
