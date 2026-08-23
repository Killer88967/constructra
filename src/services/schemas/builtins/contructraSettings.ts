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
    description: "Workspace and user settings for Constructra.",

    type: "object",
    additionalProperties: false,

    properties: {
      $schema: {
        type: "string",
        description: "Schema URI used for Constructra settings validation.",
        default: "constructra://schemas/settings",
      },

      editor: {
        type: "object",
        description: "Editor behavior and appearance.",

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
            description: "Number of spaces represented by a tab.",
          },

          wordWrap: {
            type: "string",

            enum: ["off", "on", "wordWrapColumn", "bounded"],

            default: "off",

            description: "Controls how lines wrap in the editor.",
          },

          minimap: {
            type: "object",
            description: "Controls the editor minimap.",

            additionalProperties: false,

            properties: {
              enabled: {
                type: "boolean",
                default: true,
                description: "Whether the editor minimap is visible.",
              },
            },
          },
        },
      },

      workbench: {
        type: "object",
        description: "Workbench layout settings.",

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
                description: "Default width of the sidebar in pixels.",
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
                description: "Default height of the bottom panel in pixels.",
              },
            },
          },
        },
      },

      files: {
        type: "object",
        description: "File handling behavior.",

        additionalProperties: false,

        properties: {
          autoSave: {
            type: "string",

            enum: ["off", "afterDelay"],

            default: "off",

            description: "Controls automatic saving of modified files.",
          },
        },
      },
    },
  },
};
