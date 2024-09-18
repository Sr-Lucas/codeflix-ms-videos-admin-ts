A **Value Object** is a design pattern commonly used in Domain-Driven Design (DDD) to represent an object that is defined not by its identity, but by the values it holds. In contrast to **Entities**, which are distinguished by a unique identifier, Value Objects are characterized by their properties and are immutable.

### Key Characteristics of Value Objects:

1. **Immutability**:
   - Once a Value Object is created, its state cannot change. Instead of modifying it, you create a new instance if a different value is needed.
   - This immutability ensures that Value Objects are thread-safe and predictable.
   - It prevets collateral effect.

2. **Equality Based on Values**:
   - Two Value Objects are considered equal if their properties (values) are identical, not based on identity or references. This means that two instances with the same values are effectively the same.
   - Example: Two objects representing the same money amount of `$100.00` should be equal even if they are different instances.

3. **No Identity**:
   - Value Objects don’t have an identity like an Entity. Their uniqueness comes purely from the combination of their attributes.
   - Example: An object representing an address (`Street`, `City`, `PostalCode`) is a Value Object because its significance comes from the specific values of those attributes, not an inherent identity.

4. **Self-Contained Logic**:
   - Value Objects often encapsulate behavior related to the values they hold. For example, an object representing a distance may include methods to convert units (meters to kilometers) or calculate differences.

### Example:
A classic example of a Value Object is a **Money** object that holds an amount and a currency.

```csharp
public class Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }

    // Value objects compare by their values, not reference
    public override bool Equals(object obj)
    {
        if (obj is Money other)
        {
            return Amount == other.Amount && Currency == other.Currency;
        }
        return false;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Amount, Currency);
    }
}
```

In this example:
- `Money` is immutable, meaning its amount and currency cannot be changed once set.
- Two `Money` objects are considered equal if they have the same amount and currency, regardless of whether they are different instances.
- The object’s purpose is to encapsulate the value (the amount and the currency), not to represent a unique entity in the system.

### When to Use Value Objects:
- **Addresses**, **coordinates**, **measurements**, and **money** are common use cases for Value Objects.
- Use them when you care about the data they hold, not their individual identity.
- They are also beneficial for promoting immutability and keeping domain logic cleaner.

### Benefits:
- **Immutability** makes code more predictable and easier to reason about.
- **No identity tracking** simplifies comparison logic.
- They help with **design clarity**, ensuring that data is treated as a value rather than an entity with a lifecycle.