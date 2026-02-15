import {
  type Endpoint,
  URLParameter,
  RequestMethod,
  URLParameterDataType
} from "../../../type/specificationType";
import { unknownPageResponse } from "../../auction/auctionUnknownPageResponse";
import { player } from "../../common/playerSpec";
import { unauthorizedResponse } from "../../common/unauthorizedResponse";

export const leaderboard_kills_v1: Endpoint = {
  endpoint: ["v1", "leaderboards", "kills", new URLParameter("page")],
  method: RequestMethod.GET,
  description: "Get the leaderboards for the most kills.",
  remarks: [
    "Each page is always 45 players long",
    "In this context, kills refers to PVP, which means only player kills are counted"
  ],
  urlParameters: {
    page: {
      type: URLParameterDataType.NUMBER,
      description: "The page number to retrieve.",
      remarks: ["The page offset starts at 1"]
    }
  },
  responses: [
    {
      status: 200,
      synopsis: "Successful request",
      description:
        "A leaderboard page for the specified leaderboard is returned on successful request.",
      remarks: [],
      bodyJson: {
        name: "KillsLeaderboardData",
        fields: [
          {
            name: "result",
            type: {
              kind: "array",
              of: {
                kind: "object",
                schema: {
                  fields: [
                    ...player.fields,
                    {
                      name: "value",
                      type: { kind: "primitive", name: "number" },
                      description: "The number of kills the player has."
                    }
                  ]
                }
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
    unauthorizedResponse,
    unknownPageResponse
  ]
};
