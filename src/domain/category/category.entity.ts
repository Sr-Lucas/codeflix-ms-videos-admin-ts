import { Entity } from "../shared/entity";
import { EntityValidationError } from "../shared/validators/validation.error";
import ValidatorRules from "../shared/validators/validator-rules";
import { ValueObject } from "../shared/value-object";
import { UUID } from "../shared/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryProps = {
  categoryId?: UUID;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  desciption?: string | null;
  isActive?: boolean;
};

export class Category extends Entity {
  categoryId: UUID;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  // Constructor in a need of rehydration after getting a category from database
  constructor(props: CategoryProps) {
    super();
    this.categoryId = props.categoryId ?? new UUID();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  // Create factory method is resposible to create a new Category to be inserted in database
  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }

  get entityId(): ValueObject {
    return this.categoryId;
  }

  /**
   *
   * The use of simple setters is considered anemic because they merely reflect a value change
   * without any additional logic. In contrast, the @changeName method represents a more robust
   * operation for changing a name. This means that within this method, we can include business
   * rules, such as data validation, event triggering, and other actions related to the name change.
   */
  public changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  public changeDescription(description: string): void {
    this.description = description;
    Category.validate(this);
  }

  public activate(): void {
    this.isActive = true;
  }

  public deactivate(): void {
    this.isActive = false;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors!);
    }
  }

  toJSON() {
    return {
      categoryId: this.categoryId.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }
}
