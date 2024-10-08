import { UUID } from "../../shared/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

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
      expect(validateSpy).toHaveBeenCalledTimes(1);
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

  test("Should change name", () => {
    const category = new Category({
      name: "Movies",
    });
    category.changeName("Other name");
    expect(category.name).toBe("Other name");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should change description", () => {
    const category = new Category({
      name: "Movies",
      description: "Description Movies",
    });
    category.changeDescription("Other description");
    expect(category.description).toBe("Other description");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});

describe("Category validator", () => {
  describe("Create command", () => {
    test("should throw an error if category was created with invalid name", () => {
      expect(() =>
        Category.create({
          name: "",
        })
      ).containsErrorMessages({
        name: ["name should not be empty"],
      });
    });

    test("should throw an error if category was created with invalid description", () => {
      expect(() =>
        Category.create({
          name: "Teste",
          desciption: "",
        })
      ).containsErrorMessages({
        name: ["desciption should not be empty"],
      });
    });
  });
});
