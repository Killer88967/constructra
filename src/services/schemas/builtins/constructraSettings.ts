import type { SchemaRegistration } from "../types";

export const constructraSettingsSchema: SchemaRegistration = {
  uri: "constructra://schemas/settings",

  fileMatch: [
    "*/.constructra/settings.json",
    "*/.constructra/settings.local.json",
  ],

  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",

    title: "Constructra Settings",

    description:
      "Configuration settings for Constructra user, workspace, and local scopes.",

    type: "object",

    additionalProperties: false,

    properties: {
      $schema: {
        type: "string",

        description:
          "Schema URI used to validate and provide IntelliSense for this settings file.",

        default: "constructra://schemas/settings",
      },

      editor: {
        type: "object",

        description: "Controls editor behavior and appearance.",

        additionalProperties: false,

        properties: {
          fontSize: {
            type: "number",

            minimum: 6,
            maximum: 72,

            default: 13,

            description: "Controls the editor font size in pixels.",
          },

          tabSize: {
            type: "integer",

            minimum: 1,
            maximum: 16,

            default: 2,

            description: "Controls the number of spaces represented by a tab.",
          },

          wordWrap: {
            type: "string",

            enum: ["off", "on", "wordWrapColumn", "bounded"],

            default: "off",

            description: "Controls how long lines wrap inside the editor.",
          },

          minimap: {
            type: "object",

            description: "Controls the editor minimap.",

            additionalProperties: false,

            properties: {
              enabled: {
                type: "boolean",

                default: true,

                description:
                  "Controls whether the editor minimap is displayed.",
              },
            },
          },
        },
      },

      workbench: {
        type: "object",

        description:
          "Controls Constructra workbench layout and interface behavior.",

        additionalProperties: false,

        properties: {
          sidebar: {
            type: "object",

            additionalProperties: false,

            properties: {
              width: {
                type: "number",

                minimum: 120,

                default: 250,

                description: "Controls the default sidebar width in pixels.",
              },
            },
          },

          panel: {
            type: "object",

            additionalProperties: false,

            properties: {
              height: {
                type: "number",

                minimum: 80,

                default: 190,

                description:
                  "Controls the default bottom panel height in pixels.",
              },
            },
          },
        },
      },

      files: {
        type: "object",

        description: "Controls file handling behavior.",

        additionalProperties: false,

        properties: {
          autoSave: {
            type: "string",

            enum: ["off", "afterDelay"],

            default: "off",

            description:
              "Controls whether modified files are saved automatically.",
          },
        },
      },
    },
  },
};
