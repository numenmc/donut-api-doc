import type { Response } from "../../type/specificationType";

export const unknownPageResponse: Response = {
  status: 500,
  synopsis: "Invalid Page",
  description: "The API does not complete the query because the specified page is out of bounds.",
  remarks: [],
  bodyJson: {
    name: "InvalidPageResponse",
    fields: [
      {
        name: "message",
        type: {
          kind: "static",
          value: "The page you entered does not exist"
        }
      },
      {
        name: "reason",
        type: { kind: "static", value: "Error handling request" }
      },
      {
        name: "status",
        type: { kind: "static", value: 500 },
        description:
          "Despite the upstream API returning a server error, the error described here is a client error. This behaviour is documented as-is from the upstream API.",
        unstable: true
      }
    ]
  }
};
