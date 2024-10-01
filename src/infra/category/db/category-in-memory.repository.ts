import { Category } from "../../../domain/category/category.entity";
import { UUID } from "../../../domain/shared/value-objects/uuid.vo";
import { InMemorySearchableRepository } from "../../shared/db/in-mem.repository";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<
  Category,
  UUID
> {
  sortableFields: string[] = ["name", "createdAt"];

  constructor() {
    super();
  }

  protected async applyFilter(
    items: Category[],
    filter: string | null
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
