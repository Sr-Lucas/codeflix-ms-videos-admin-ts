import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  describe("Constructor method", () => {
    test("should be able to instantiate a category providing only the required param 'name'", () => {
      // Arrange and Act
      let category = new Category({
        name: "Movie",
      });

      // Assert
      expect(category.categoryId).toBe("generated");
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
        categoryId: "Category ID",
        createdAt: new Date(),
      });

      expect(category.categoryId).toBe("Category ID");
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

      expect(category.categoryId).toBe("generated");
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
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
