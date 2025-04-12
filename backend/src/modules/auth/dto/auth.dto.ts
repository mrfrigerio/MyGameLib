import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({
    description: 'E-mail',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Senha',
    required: true,
  })
  password: string;
}
