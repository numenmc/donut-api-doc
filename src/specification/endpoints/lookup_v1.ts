import {
  RequestMethod,
  URLParameter,
  URLParameterDataType,
  type Endpoint,
} from "../../type/specificationType";
import { unknownPageResponse } from "../auction/auctionUnknownPageResponse";
import { item, shulkerItem } from "../auction/itemSpec";
import { player } from "../common/playerSpec";
import { unauthorizedResponse } from "../common/unauthorizedResponse";

export const lookup_v1: Endpoint = {
  endpoint: ["v1", "lookup", new URLParameter("user")],
  method: RequestMethod.GET,
  description: "Get information about an online player",
  remarks: [
    "The information returned by this endpoint is the same as the information from /findplayer",
  ],
  urlParameters: {
    user: {
      type: URLParameterDataType.STRING,
      description: "The username of the player",
      remarks: ["This player must be online"],
    },
  },
  responses: [
    {
      status: 200,
      synopsis: "Successful Request",
      description:
        "The player's location, rank and name are returned upon successful request.",
      remarks: [],
      bodyJson: {
        name: "PlayerLookupData",
        fields: [
          {
            name: "result",
            type: {
              kind: "object",
              schema: {
                fields: [
                  {
                    name: "username",
                    type: { kind: "primitive", name: "string" },
                    description: "The current username of the player. This value is stored in lowercase. Bedrock edition players have a username prefixed with a period (full-stop)."
                  },
                  {
                    name: "rank",
                    type: { kind: "union", values: [
                      "manager",
                      "senioradministrator",
                      "administrator",
                      "seniormoderator",
                      "moderator",
                      "seniorhelper",
                      "helper",
                      "media",
                      "donutplus",
                      "default"
                    ] }
                  },
                  {
                    name: "location",
                    type: { kind: "union", values: ["Overworld", "Nether", "End"] },
                    description: "The player's dimension. In testing, this value is always <code>Overworld</code>.",
                    unstable: true
                  }
                ]
              }
            },
          },
          {
            name: "status",
            type: { kind: "static", value: 200 },
          },
        ],
      },
    },
    {
      status: 500,
      synopsis: "Not Online",
      description:
        "The API does not complete the query because the username is valid but it could not be found online.",
      remarks: [],
      bodyJson: {
        name: "NotOnlineResponse",
        fields: [
          {
            name: "message",
            type: {
              kind: "static",
              value: "This user is not currently online.",
            },
          },
          {
            name: "reason",
            type: { kind: "static", value: "Error handling request" },
          },
          {
            name: "status",
            type: { kind: "static", value: 500 },
            description:
              "Despite the upstream API returning a server error, the error described here is a client error. This behaviour is documented as-is from the upstream API.",
            unstable: true,
          },
        ],
      },
    },
    {
      status: 500,
      synopsis: "Invalid Username",
      description:
        "The API does not complete the query because the username is not valid.",
      remarks: [
        "If the username is valid but does not exist, the API will return <code>500 - Not Online</code>",
      ],
      bodyJson: {
        name: "InvalidUsernameResponse",
        fields: [
          {
            name: "message",
            type: {
              kind: "static",
              value: "The username you entered is not valid",
            },
          },
          {
            name: "reason",
            type: { kind: "static", value: "Error handling request" },
          },
          {
            name: "status",
            type: { kind: "static", value: 500 },
            description:
              "Despite the upstream API returning a server error, the error described here is a client error. This behaviour is documented as-is from the upstream API.",
            unstable: true,
          },
        ],
      },
    },
    unauthorizedResponse,
  ],
};
