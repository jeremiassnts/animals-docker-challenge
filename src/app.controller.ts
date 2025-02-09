import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) { }
  @Get('/animals')
  @HttpCode(200)
  async getAnimals() {
    const animals = await this.prismaService.animal.findMany();
    return {
      animals
    }
  }
  @Get('/animals/:animalId')
  @HttpCode(200)
  async getAnimalById(@Param('animalId') animalId: string) {
    const animal = await this.prismaService.animal.findFirst({
      where: {
        id: animalId
      }
    })
    return {
      animal
    }
  }
  @Post('/animals')
  @HttpCode(201)
  async postAnimal(@Body() body: any) {
    const {
      name,
      species,
      binomial_name,
      photo_url,
      born_date
    } = body

    const newAnimal = await this.prismaService.animal.create({
      data: {
        name,
        species,
        binomial_name,
        photo_url,
        born_date
      }
    });

    return {
      animal: newAnimal
    }
  }
  @Delete('/animals/:animalId')
  @HttpCode(200)
  async deleteAnimal(@Param('animalId') animalId: string) {
    await this.prismaService.animal.delete({
      where: {
        id: animalId
      }
    });
  }
}
