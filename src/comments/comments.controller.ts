import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { AuthGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/interfaces/jwt-payload.interface';

@ApiTags('Comentários')
@Controller('comments')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('post/:postId')
  @ApiOperation({ summary: 'Criar comentário em um post' })
  @ApiParam({ name: 'postId', description: 'ID do post', type: 'number' })
  @ApiResponse({
    status: 201,
    description: 'Comentário criado com sucesso',
    type: CommentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Post não encontrado ou dados inválidos',
  })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: RequestWithUser,
  ) {
    return this.commentsService.create(createCommentDto, postId, req.user.sub);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Listar comentários de um post' })
  @ApiParam({ name: 'postId', description: 'ID do post', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Lista de comentários retornada com sucesso',
    type: [CommentResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  findAllByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findAllByPost(postId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar comentário por ID' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Comentário encontrado com sucesso',
    type: CommentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar comentário (apenas o autor)' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Comentário atualizado com sucesso',
    type: CommentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @ApiResponse({ status: 400, description: 'Você não é o autor do comentário' })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req: RequestWithUser,
  ) {
    return this.commentsService.update(id, updateCommentDto, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar comentário (apenas o autor)' })
  @ApiParam({ name: 'id', description: 'ID do comentário', type: 'number' })
  @ApiResponse({ status: 200, description: 'Comentário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @ApiResponse({ status: 400, description: 'Você não é o autor do comentário' })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.commentsService.remove(id, req.user.sub);
  }
}
