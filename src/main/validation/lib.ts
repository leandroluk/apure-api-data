import { cnpj } from "cpf-cnpj-validator";
import defaultJoi from "joi";

const Joi: typeof defaultJoi = defaultJoi.extend(joi => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.cnpj": "{{#label}} must be a valid cnpj"
  },
  rules: {
    cnpj: {
      validate (value: string, helpers: defaultJoi.ExternalHelpers) {
        return cnpj.isValid(value) ? value : helpers.error("string.cnpj");
      }
    }
  }
}));

declare module "joi" {
  /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
  export interface StringSchema<TSchema = string> extends defaultJoi.AnySchema<TSchema> {
    cnpj (): this;
  }
}

export { Joi };
