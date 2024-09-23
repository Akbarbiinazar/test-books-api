import {
  Controller, Get, Post, Body, Param, Delete, Put, Request,
  UseGuards,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('books') 
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The book has been created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Request() req, @Body() createBookDto: CreateBookDto) {
    return this.booksService.create(req.user.email, createBookDto);
  }


  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of all books.',
    type: [CreateBookDto],
  })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the book with the given ID.',
    type: CreateBookDto, 
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.'
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    console.log('ID:', id);
    console.log('Update DTO:', updateBookDto);
    
    if (!updateBookDto) {
      throw new BadRequestException('Update data is required');
    }
  
    return this.booksService.update(+id, updateBookDto);
  }
  
  

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }
}
