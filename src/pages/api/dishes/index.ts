import DishModel from '@/models/dish.model';
import dbConnect from '@/util/mongodb';
import { ToBoolean } from '@/util/toBoolean';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { createHandler, Get, Query, ValidationPipe } from 'next-api-decorators';

/**
 * Query parameters for filtering responses
 */
export class DishSearchRequest {
  @IsOptional()
  @ToBoolean()
  isOrderable?: boolean;

  @IsOptional()
  @ToBoolean()
  isArchived?: boolean;

  @IsArray()
  @Transform(({ value }) => value.trim().split(','))
  categories?: string[] | { $in: string[] } = []; // typing is weird so we can turn this into a mongo $in query
}

class DishesHandler {
  @Get()
  async exportDishes(@Query(ValidationPipe) query: DishSearchRequest) {
    dbConnect();

    const dishes = DishModel;

    if ((query.categories as string[]).length) {
      // is not empty
      query.categories = {
        $in: query.categories as string[], // this 'as string[]' is safe because validation has ensured it
      };
    } else {
      delete query.categories; // otherwise we don't return dishes that have categories set
    }

    return await dishes.find(query, { options: false, dependencies: false }).exec();
  }
}

export default createHandler(DishesHandler);
