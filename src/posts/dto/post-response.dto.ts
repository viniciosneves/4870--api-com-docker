import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseDto } from '../../comments/dto/comment-response.dto';

export class AuthorInPostDto {
  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID único do autor',
  })
  id: string;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do autor',
  })
  name: string;

  @ApiProperty({
    example: 'joaosilva_dev',
    description: 'Username do autor',
  })
  username?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: 'URL do avatar do autor',
  })
  avatar?: string;
}

export class PostResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID único do post',
  })
  id: number;

  @ApiProperty({
    example: 'https://example.com/cover.png',
    description: 'URL da imagem de capa do post',
  })
  cover: string;

  @ApiProperty({
    example: 'Introdução ao React',
    description: 'Título do post',
  })
  title: string;

  @ApiProperty({
    example: 'introducao-ao-react',
    description: 'Slug único do post',
  })
  slug: string;

  @ApiProperty({
    example: 'Neste post, vamos explorar os conceitos básicos do React...',
    description: 'Corpo do post',
  })
  body: string;

  @ApiProperty({
    example:
      '```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```',
    description: 'Código markdown do post',
  })
  markdown: string;

  @ApiProperty({
    example: 42,
    description: 'Número de likes do post',
  })
  likes: number;

  @ApiProperty({
    type: AuthorInPostDto,
    description: 'Dados do autor do post',
  })
  author: AuthorInPostDto;

  @ApiProperty({
    type: [CommentResponseDto],
    description: 'Lista de comentários do post',
    isArray: true,
  })
  comments: CommentResponseDto[];

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data de criação do post',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data da última atualização do post',
  })
  updatedAt: Date;
}
