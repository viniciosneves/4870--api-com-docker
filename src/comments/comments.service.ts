import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCommentDto: CreateCommentDto,
    postId: number,
    userId: string,
  ) {
    // Verificar se o post existe
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestException('Post não encontrado');
    }

    return this.prisma.comment.create({
      data: {
        text: createCommentDto.text,
        postId: postId,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findAllByPost(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: string) {
    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    // Verificar se o usuário logado é o autor do comentário
    if (existingComment.authorId !== userId) {
      throw new BadRequestException(
        'Você só pode editar seus próprios comentários',
      );
    }

    return this.prisma.comment.update({
      where: { id },
      data: { text: updateCommentDto.text },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    // Verificar se o usuário logado é o autor do comentário
    if (comment.authorId !== userId) {
      throw new BadRequestException(
        'Você só pode deletar seus próprios comentários',
      );
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
