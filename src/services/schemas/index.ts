import { constructraSettingsSchema } from "./builtins/constructraSettings";

import type { SchemaRegistration } from "./types";

export const builtinSchemas: SchemaRegistration[] = [constructraSettingsSchema];
