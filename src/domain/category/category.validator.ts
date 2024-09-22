import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  validateSync,
} from "class-validator";
import { Category } from "./category.entity";
import { ClassValidatorAdapter } from "../shared/validators/class-validator-fields";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  constructor({ name, description, isActive }: Category) {
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }
}

export class CategoryValidator extends ClassValidatorAdapter<CategoryRules> {
  validate(entity: Category): boolean {
    return super.validate(new CategoryRules(entity));
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
