import {
  RequestMethod,
  URLParameter,
  URLParameterDataType,
  type Endpoint
} from "../../type/specificationType";
import { unauthorizedResponse } from "../common/unauthorizedResponse";

export const stats_v1: Endpoint = {
  endpoint: ["v1", "stats", new URLParameter("user")],
  method: RequestMethod.GET,
  description: "Get leaderboard statistics about a player.",
  remarks: ["This endpoint can fetch information about offline players"],
  urlParameters: {
    user: {
      type: URLParameterDataType.STRING,
      description: "The username of the player",
      remarks: []
    }
  },
  responses: [
    {
      status: 200,
      synopsis: "Successful Request",
      description: "The player's leaderboard stats are returned upon successful request.",
      remarks: [],
      bodyJson: {
        name: "PlayerStatsData",
        fields: [
          {
            name: "result",
            type: {
              kind: "object",
              schema: {
                fields: [
                  {
                    name: "broken_blocks",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  },
                  {
                    name: "deaths",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  },
                  {
                    name: "kills",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  },
                  {
                    name: "mobs_killed",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  },
                  {
                    name: "money",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  },
                  {
                    name: "money_made_from_sell",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  },
                  {
                    name: "money_spent_on_shop",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  },
                  {
                    name: "placed_blocks",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  },
                  {
                    name: "playtime",
                    type: { kind: "primitive", name: "string" },
                    description:
                      "The player's time in-game counted in milliseconds. This value does not increase for time spent in an AFK lobby. This value is a number stored as a string."
                  },
                  {
                    name: "shards",
                    type: { kind: "primitive", name: "string" },
                    description: "This value is a number stored as a string."
                  }
                ]
              }
            }
          },
          {
            name: "status",
            type: { kind: "static", value: 200 }
          }
        ]
      }
    },
    {
      status: 500,
      synopsis: "Invalid Username",
      description: "The API does not complete the query because the username is not valid.",
      remarks: [],
      bodyJson: {
        name: "InvalidUsernameResponse",
        fields: [
          {
            name: "message",
            type: {
              kind: "static",
              value:
                "Could not handle your request. This may be because the specified user/page/item does not exist."
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
    },
    unauthorizedResponse
  ]
};
