# The Importance of Using Constructors, Factory Methods, and Expressive Methods in Domain Models

In object-oriented programming, the use of a constructor and a create method provides a more structured and intentional approach to object creation. Rather than relying on simple property assignment, the constructor ensures that whenever an object is instantiated, essential fields—such as categoryId, isActive, and createdAt in a Category class—are properly initialized. This is particularly important when rehydrating objects from a database because it guarantees consistency in the data model. Additionally, by centralizing the logic of object creation, the constructor helps to avoid unintended null or undefined values by assigning meaningful default values to optional fields.

Example:

```typescript
constructor(props: CategoryProps) {
  this.categoryId = props.categoryId ?? "generate";
  this.name = props.name;
  this.description = props.description ?? null;
  this.isActive = props.isActive ?? false;
  this.createdAt = props.createdAt ?? new Date();
}
```

In this example, even if categoryId or description is not provided, the constructor assigns sensible defaults ("generate" for categoryId and null for description), ensuring the object is never incomplete or invalid.

The create method acts as a factory method for generating new instances of the class, offering a clear and concise entry point for object construction. This method abstracts the underlying details of how the object is built, making it simpler and more readable for developers. Moreover, by using a create method instead of directly calling the constructor, you can control object instantiation more efficiently, especially when the object creation process involves more complexity, like validation or preprocessing.

Example:

```typescript
static create(props: CategoryCreateCommand): Category {
  return new Category(props);
}
```

Here, the create method simplifies the instantiation of a Category object, making the code easier to maintain and ensuring that new instances follow the proper initialization process.

Expressive methods, such as changeName, changeDescription, activate, and deactivate, represent meaningful domain operations, going beyond the basic functionality of simple setters. Instead of merely updating a property value, these methods provide a clear context and intention for each operation. For example, the changeName method can eventually enforce business rules like name validation, logging, or event triggering when the name changes, which is much more powerful than an anemic setter that only updates the value without additional logic.

Example:

```typescript
public changeName(name: string): void {
  this.name = name;
  // Possible future logic: validate name, trigger event, etc.
}
```

In this case, by using an expressive method like changeName, we can easily add validation or side effects, ensuring that name changes adhere to business requirements.

The importance of expressive methods lies in their alignment with the domain language, making the code more intuitive and reflective of real-world operations. By providing methods like activate and deactivate, the code clearly communicates the intent of the operation, which helps to avoid confusion when reading or maintaining the code. Moreover, these methods allow for the inclusion of additional logic, such as updating the status in a database or triggering events when the object’s state changes.

Example:

```typescript
public activate(): void {
  this.isActive = true;
  // Possible future logic: trigger activation event, etc.
}
```
```typescript
public deactivate(): void {
  this.isActive = false;
  // Possible future logic: log deactivation, notify, etc.
}
```
These methods make the object’s behavior more predictable and aligned with business logic. They ensure that operations like activating or deactivating a category don’t just modify the state but also follow any business rules or trigger other processes as needed.

By structuring object creation and operations through constructors, factory methods, and expressive domain methods, the code becomes more robust, maintainable, and reflective of business logic. This approach ensures that the domain model is not only richer and more meaningful but also better equipped to handle real-world scenarios with clear and intentional behavior.