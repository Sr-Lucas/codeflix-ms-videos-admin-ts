import { UUID } from "../shared/value-objects/uuid.vo";

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

export class Category {
  categoryId: UUID;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  // Constructor in a need of rehydration after getting a category from database
  constructor(props: CategoryProps) {
    this.categoryId = props.categoryId ?? new UUID();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  // Create factory method is resposible to create a new Category to be inserted in database
  static create(props: CategoryCreateCommand): Category {
    return new Category(props);
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
  }

  public changeDescription(description: string): void {
    this.description = description;
  }

  public activate(): void {
    this.isActive = true;
  }

  public deactivate(): void {
    this.isActive = false;
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
