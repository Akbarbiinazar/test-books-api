import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    format: 'email',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: 'somePassword123',
    description: 'The password of the user',
    minLength: 3,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString({ message: 'must be a string' })
  @Length(3, 20, { message: 'Password has to be between 3 and 20 characters' })
  public password: string;
}
