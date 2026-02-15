import {
  type Endpoint,
  URLParameter,
  RequestMethod,
  URLParameterDataType
} from "../../../type/specificationType";
import { unknownPageResponse } from "../../auction/auctionUnknownPageResponse";
import { player } from "../../common/playerSpec";
import { unauthorizedResponse } from "../../common/unauthorizedResponse";

export const leaderboard_shop_v1: Endpoint = {
  endpoint: ["v1", "leaderboards", "shop", new URLParameter("page")],
  method: RequestMethod.GET,
  description: "Get the leaderboards for the most money spent on /shop.",
  remarks: ["Each page is always 45 players long"],
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
        name: "ShopLeaderboardData",
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
                      description: "The amount of money the player has spent on /shop."
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
