import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("Value Object Unit Tests", () => {
  test("should be equal", () => {
    const vo1 = new StringValueObject("test");
    const vo2 = new StringValueObject("test");
    expect(vo1.equals(vo2)).toBe(true);

    const voc1 = new ComplexValueObject("test", 1);
    const voc2 = new ComplexValueObject("test", 1);
    expect(voc1.equals(voc2)).toBe(true);
  });

  test("should not be equal", () => {
    const vo1 = new StringValueObject("test1");
    const vo2 = new StringValueObject("test2");
    expect(vo1.equals(vo2)).toBe(false);
    expect(vo1.equals(null as any)).toBe(false);
    expect(vo1.equals(undefined as any)).toBe(false);

    const voc1 = new ComplexValueObject("test", 0);
    const voc2 = new ComplexValueObject("test", 1);
    expect(voc1.equals(voc2)).toBe(false);
    expect(voc1.equals(null as any)).toBe(false);
    expect(voc1.equals(undefined as any)).toBe(false);
  });
});
