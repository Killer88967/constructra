import { constructraSettingsSchema } from "./builtins/contructraSettings";

import type { SchemaRegistration } from "./types";

export const builtinSchemas: SchemaRegistration[] = [constructraSettingsSchema];
