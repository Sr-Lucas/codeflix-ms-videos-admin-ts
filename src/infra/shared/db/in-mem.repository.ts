import { Entity } from "../../../domain/shared/entity";
import { NotFoundError } from "../../../domain/shared/errors/not-found.error";
import { ValueObject } from "../../../domain/shared/value-object";
import {
  IRepository,
  ISearchableRepository,
} from "../../../domain/shared/repository/repository-interface";
import { SearchResult } from "../../../domain/shared/repository/search-result";
import {
  SearchParams,
  SortDirection,
} from "../../../domain/shared/repository/search-params";

export abstract class InMemoryRepository<
  E extends Entity,
  EntityId extends ValueObject
> implements IRepository<E, EntityId>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const indexFound = this._getIndex(entity.entityId);
    if (indexFound === -1) {
      throw new NotFoundError(entity.entityId, this.getEntity());
    }
    this.items[indexFound] = entity;
  }

  async delete(entityId: EntityId): Promise<void> {
    const indexFound = this._getIndex(entityId);
    if (indexFound === -1) {
      throw new NotFoundError(entityId, this.getEntity());
    }
    this.items.splice(indexFound, 1);
  }

  async findById(entityId: EntityId): Promise<E | null> {
    return this._get(entityId);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any[]) => E;

  protected _get(entityId: ValueObject): E | null {
    const item = this.items.find((v) => v.entityId === entityId);
    return typeof item === "undefined" ? null : item;
  }

  protected _getIndex(entityId: ValueObject): number {
    const item = this.items.findIndex((v) => v.entityId === entityId);
    return item;
  }
}

export abstract class InMemorySearchableRepository<
    E extends Entity,
    EntityId extends ValueObject,
    Filter = string
  >
  extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId, Filter>
{
  sortableFields: string[] = [];

  async search(props: SearchParams<Filter>): Promise<SearchResult<Entity>> {
    const filteredItems = await this.applyFilter(this.items, props.filter);
    const sortedItems = await this.applySort(
      filteredItems,
      props.sort,
      props.sortDir
    );
    const paginatedItems = this.applyPagination(
      sortedItems,
      props.page,
      props.perPage
    );
    return new SearchResult({
      items: paginatedItems,
      total: filteredItems.length,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: Filter | null
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: string | null,
    sortDir: SortDirection | null,
    customGetter?: (sort: string, item: E) => any
  ): Promise<E[]> {
    let sortValue = sort;
    let sortDirValue = sortDir;

    if (!sort || !this.sortableFields.includes(sort)) {
      sortValue = "createdAt";
    }

    if (!sortDir) {
      sortDirValue = "desc";
    }

    return [...items].sort((a, b) => {
      //@ts-ignore
      const aValue = customGetter ? customGetter(sortValue, a) : a[sortValue];
      //@ts-ignore
      const bValue = customGetter ? customGetter(sortValue, b) : b[sortValue];

      if (aValue < bValue) {
        return sortDirValue === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortDirValue === "asc" ? 1 : -1;
      }

      return 1;
    });
  }

  protected applyPagination(
    items: E[],
    page: SearchParams["page"],
    perPage: SearchParams["perPage"]
  ) {
    const start = (page - 1) * perPage;
    const limit = start + perPage;
    return items.slice(start, limit);
  }
}
