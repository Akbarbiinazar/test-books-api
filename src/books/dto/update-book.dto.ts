import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({
    example: 'Martin Eden',
    description: 'The title of the book',
  
  })
  @IsString()
  title: string; 

  @ApiProperty({
    example: 'Jack London',
    description: 'The author of the book',
   
  })
  @IsString()
  author: string; 

  @ApiProperty({
    example: '1925-04-10',
    description: 'Publication date of the book',
    // required: false, 
  })
  @IsOptional() 
  @IsString()
  publicationDate: string; 
}
