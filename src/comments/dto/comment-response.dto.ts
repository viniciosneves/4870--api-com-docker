import { ApiProperty } from '@nestjs/swagger';

export class AuthorInCommentDto {
  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID único do autor',
  })
  id: string;

  @ApiProperty({
    example: 'Ana Paula',
    description: 'Nome completo do autor',
  })
  name: string;

  @ApiProperty({
    example: 'anapaula_dev',
    description: 'Username do autor',
  })
  username?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: 'URL do avatar do autor',
  })
  avatar?: string;
}

export class CommentResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID único do comentário',
  })
  id: number;

  @ApiProperty({
    example: 'Ótimo post! Muito esclarecedor.',
    description: 'Texto do comentário',
  })
  text: string;

  @ApiProperty({
    example: 1,
    description: 'ID do post comentado',
  })
  postId: number;

  @ApiProperty({
    type: AuthorInCommentDto,
    description: 'Dados do autor do comentário',
  })
  author: AuthorInCommentDto;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data de criação do comentário',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data da última atualização do comentário',
  })
  updatedAt: Date;
}
