import { IRepository } from "../shared/repository/repository-interface";
import { UUID } from "../shared/value-objects/uuid.vo";
import { Category } from "./category.entity";

export interface CategoryRepository extends IRepository<Category, UUID> {}
