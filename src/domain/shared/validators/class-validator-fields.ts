import { validateSync } from "class-validator";
import { FieldsErrors, IValidatorFields } from "./validator-fields-interface";

export abstract class ClassValidatorAdapter<PropsValidated>
  implements IValidatorFields<PropsValidated>
{
  validatedData: PropsValidated | null = null;
  errors: FieldsErrors | null = null;

  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints!);
      }
    } else {
      this.validatedData = data;
    }

    return !errors.length;
  }
}
