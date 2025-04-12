import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'E-mail',
    required: true,
    example: 'joao.silva@email.com',
    default: 'joao.silva@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha',
    required: true,
    example: 'SenhaForte123!',
    default: 'SenhaForte123!',
  })
  password: string;
}
