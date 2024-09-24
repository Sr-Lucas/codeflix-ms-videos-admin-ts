import { Entity } from "../../../domain/shared/entity";
import { NotFoundError } from "../../../domain/shared/errors/not-found.error";
import { ValueObject } from "../../../domain/shared/value-object";
import { IRepository } from "../../../domain/shared/repository/repository";

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
