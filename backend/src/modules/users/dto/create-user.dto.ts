import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao.silva@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha de acesso',
    example: 'SenhaForte123!',
  })
  password: string;

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
