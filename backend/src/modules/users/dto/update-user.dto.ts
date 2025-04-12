export class UpdateUserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  addresses: {
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
