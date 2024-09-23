# The Importance of Using Constructors, Factory Methods, and Expressive Methods in Domain Models

In the classes, the use of a constructor and the create method offers a structured and 
intentional approach to object creation. Instead of relying on simple property assignment, the 
constructor ensures that any time an object is instantiated, essential fields like, for exemple
in a Category class: categoryId, isActive, and createdAt are correctly initialized. 
This is especially crucial when rehydrating an object from a database, as it maintains consistency 
in the data model. Additionally, it centralizes the logic of object creation, ensuring that even 
optional fields have meaningful default values, reducing the risk of unintentional null or undefined 
values.

The create method serves as a factory method for creating new instances of the class, 
providing a clear entry point for constructing new objects that are to be inserted into the database. 
This method abstracts the internal details of the class and simplifies the object creation process, 
making the code more readable and easier to maintain.

On the other hand, expressive methods for exemple in a Category class like: changeName, 
changeDescription, activate, and deactivate represent meaningful domain operations. 
They go beyond the anemic nature of simple setters by providing a clear context for each operation. 
For example, the changeName method can eventually encapsulate business rules such as name validation, 
logging, or triggering events when the name is updated. This is far more powerful than an 
anemic setter, which merely updates the value without any additional logic or business rules.

By using expressive methods, the code becomes more aligned with the domain language, making it 
easier to understand and maintain. These methods not only modify state but also provide the 
opportunity to include validation, events, or other necessary actions, keeping the domain logic 
inside the domain model, where it belongs. This design improves maintainability, readability, and 
ensures that domain rules are followed consistently throughout the application.

This approach makes the domain model richer, more meaningful, and better aligned with real-world 
business logic, ensuring that objects behave in a predictable and intentional manner.


Example:

```typescript
export type CategoryProps = {
  categoryId?: string;
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
  categoryId: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  // Constructor in a need of rehydration after getting a category from database
  constructor(props: CategoryProps) {
    this.categoryId = props.categoryId ?? "generate";
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? false;
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
}
```