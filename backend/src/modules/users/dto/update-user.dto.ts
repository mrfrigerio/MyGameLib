import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  // @ApiProperty({ description: 'ID do usuário', example: 1, default: 1 })
  id: number;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do usuário',
  })
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  email: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário' })
  password: string;

  @ApiPropertyOptional({
    description: 'Lista de endereços atualizados do usuário',
    type: 'array',
    isArray: true,
    example: [
      {
        type: 'Residencial',
        zip_code: '12345-678',
        state: 'SP',
        city: 'Santos',
        neighborhood: 'Centro',
        street: 'Av. Ana Costa',
        number: '100',
        complement: 'Apto 45',
      },
    ],
  })
  @ApiPropertyOptional({
    description: 'Lista de endereços do usuário',
    type: 'array',
    example: [
      {
        type: 'Residencial',
        zip_code: '11060-001',
        state: 'SP',
        city: 'Santos',
        neighborhood: 'Boqueirão',
        street: 'Av. Conselheiro Nébias',
        number: '100',
        complement: 'Apto 12',
      },
    ],
  })
  addresses?: {
    type: string;
    zip_code: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement?: string;
  }[];
}
