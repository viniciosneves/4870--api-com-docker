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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { AuthGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/interfaces/jwt-payload.interface';

@ApiTags('Blog Posts')
@Controller('blog-posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo post' })
  @ApiResponse({
    status: 201,
    description: 'Post criado com sucesso',
    type: PostResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou slug/autor já existente',
  })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os posts' })
  @ApiResponse({
    status: 200,
    description: 'Lista de posts retornada com sucesso',
    type: [PostResponseDto],
  })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar post por ID' })
  @ApiParam({ name: 'id', description: 'ID do post', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Post encontrado com sucesso',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Buscar post por slug' })
  @ApiParam({ name: 'slug', description: 'Slug do post', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Post encontrado com sucesso',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar post (apenas o autor)' })
  @ApiParam({ name: 'id', description: 'ID do post', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Post atualizado com sucesso',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou você não é o autor',
  })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: RequestWithUser,
  ) {
    return this.postsService.update(id, updatePostDto, req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar post (apenas o autor)' })
  @ApiParam({ name: 'id', description: 'ID do post', type: 'number' })
  @ApiResponse({ status: 200, description: 'Post deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  @ApiResponse({ status: 400, description: 'Você não é o autor do post' })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.postsService.remove(id, req.user.sub);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Curtir post (incrementar likes)' })
  @ApiParam({ name: 'id', description: 'ID do post', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Like adicionado com sucesso',
    type: PostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  @ApiResponse({ status: 401, description: 'Token inválido ou não fornecido' })
  like(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.incrementLikes(id);
  }
}
