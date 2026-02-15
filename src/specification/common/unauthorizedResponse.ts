import type { Response } from "../../type/specificationType";

export const unauthorizedResponse: Response = {
  status: 401,
  synopsis: "Unauthorized",
  description:
    "The API does not complete the query because an API key hasn't been included in the Authorization header, or because the API key provided is invalid.",
  remarks: [],
  bodyJson: {
    name: "UnauthorizedResponse",
    fields: [
      {
        name: "message",
        type: {
          kind: "static",
          value: "Please generate an API Key in game with /api"
        }
      },
      {
        name: "reason",
        type: { kind: "static", value: "Unauthorized" }
      },
      {
        name: "status",
        type: { kind: "static", value: 401 }
      }
    ]
  }
};
