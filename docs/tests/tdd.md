# TDD

## The trible A (AAA) concept


The **AAA concept** (Arrange, Act, Assert) is a common pattern used to structure unit tests, especially in Test-Driven Development (TDD). It helps organize test code clearly, making it easier to understand and maintain. Let's break down each part:

1. **Arrange**:
   - **Purpose**: Set up the conditions for the test.
   - This step involves preparing the necessary data, dependencies, or objects that will be tested. You create or configure the system's state or mock external dependencies so that the test can be executed.
   - Example: Initialize objects, set up mocks, or define inputs.

   ```csharp
   var calculator = new Calculator();
   int a = 5;
   int b = 3;
   ```

2. **Act**:
   - **Purpose**: Execute the action or behavior that you are testing.
   - In this step, you invoke the method or operation that is being tested. The goal is to trigger the behavior that will later be evaluated in the `Assert` step.
   - Example: Call the method or function you want to test.

   ```csharp
   var result = calculator.Add(a, b);
   ```

3. **Assert**:
   - **Purpose**: Verify that the outcome matches the expected result.
   - In this final step, you check if the result of the action is what you expected it to be. You usually compare the actual output of the system with an expected value to determine if the test passes or fails.
   - Example: Use assertions to validate the outcome.

   ```csharp
   Assert.Equal(8, result);
   ```

### Complete Example in C#:

```csharp
[TestMethod]
public void Add_TwoNumbers_ReturnsCorrectSum()
{
    // Arrange
    var calculator = new Calculator();
    int a = 5;
    int b = 3;

    // Act
    var result = calculator.Add(a, b);

    // Assert
    Assert.Equal(8, result);
}
```

### Importance in TDD:
In **Test-Driven Development (TDD)**, the AAA pattern helps keep test cases simple and focused, ensuring that each test:
- **Arranges** the necessary context,
- **Acts** on the behavior you're testing,
- **Asserts** the outcome to ensure the behavior is correct.

This structure helps maintain clarity in tests, making them easy to read and debug. It also reinforces the TDD cycle of writing tests first (Red), implementing functionality (Green), and refactoring (Refactor).