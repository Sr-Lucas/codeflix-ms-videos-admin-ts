import { UUID } from "../../shared/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  describe("Constructor method", () => {
    test("should be able to instantiate a category providing only the required param 'name'", () => {
      // Arrange and Act
      let category = new Category({
        name: "Movie",
      });

      // Assert
      expect(category.categoryId).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test("should be able to instantiate a category providing multiple params", () => {
      const category = new Category({
        name: "Movie",
        description: "Testing",
        isActive: false,
        categoryId: new UUID("f2761a08-89ac-4d5f-bfd7-f8a20b3f2633"),
        createdAt: new Date(),
      });

      expect(category.categoryId).toBeInstanceOf(UUID);
      expect(
        category.categoryId.equals(
          new UUID("f2761a08-89ac-4d5f-bfd7-f8a20b3f2633")
        )
      ).toBe(true);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Testing");
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBeInstanceOf(Date);
    });
  });

  describe("Create method", () => {
    test("should create a category", () => {
      const category = Category.create({
        name: "Movie",
      });

      expect(category.categoryId).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    });
  });

  describe("categoryId field", () => {
    const arrange = [
      { categoryId: null },
      { categoryId: undefined },
      { categoryId: new UUID() },
    ];

    test.each(arrange)("id = %j", ({ categoryId }) => {
      const category = new Category({
        name: "Movie",
        categoryId: categoryId as any,
      });
      expect(category.categoryId).toBeInstanceOf(UUID);
      if (categoryId instanceof UUID) {
        expect(category.categoryId).toBe(categoryId);
      }
    });
  });

  describe("Activate/Deactivate method", () => {
    test("should activate a category", () => {
      const category = Category.create({
        name: "Movie",
        isActive: false,
      });

      expect(category.isActive).toBe(false);

      category.activate();

      expect(category.isActive).toBe(true);
    });

    test("should deactivate a category", () => {
      const category = Category.create({
        name: "Movie",
        isActive: true,
      });

      expect(category.isActive).toBe(true);

      category.deactivate();

      expect(category.isActive).toBe(false);
    });
  });
});
