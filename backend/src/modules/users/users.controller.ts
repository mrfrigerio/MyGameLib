import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar usuários' })
  async listAll() {
    return this.usersService.listAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter dados de um usuário' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do usuário a ser consultado',
    example: 1,
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar usuário' })
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar usuário' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do usuário a ser atualizado',
    example: 1,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir usuário' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do usuário a ser excluído',
    example: 1,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
