import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(userEmail: string, createBookDto: CreateBookDto) {
    const { title, author, publicationDate } = createBookDto;

    // Convert string to Date object and check if it's valid
    // const parsedDate = new Date(publicationDate);
    // if (isNaN(parsedDate.getTime())) {
    //   throw new BadRequestException('Invalid publication date');
    // }

    try {
      return await this.prisma.book.create({
        data: {
          title,
          author,
          publicationDate,
          user: { connect: { email: userEmail } }
        },
      });
    } catch (error) {
      throw new BadRequestException(`Error creating book: ${error.message}`);
    }
  }


  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
  
  try {
    return await this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  } catch (error) {
    console.error('Error updating book:', error);
    throw new HttpException(`Error updating book: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
