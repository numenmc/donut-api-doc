import { type Endpoint, URLParameter, RequestMethod, URLParameterDataType } from "../../../type/specificationType";
import { unknownPageResponse } from "../../auction/auctionUnknownPageResponse";
import { player } from "../../common/playerSpec";
import { unauthorizedResponse } from "../../common/unauthorizedResponse";

export const leaderboard_shards_v1: Endpoint = {
  endpoint: ["v1", "leaderboards", "shards", new URLParameter("page")],
  method: RequestMethod.GET,
  description: "Get the leaderboards for the most shards.",
  remarks: [
    "Each page is always 45 players long"
  ],
  urlParameters: {
    page: {
      type: URLParameterDataType.NUMBER,
      description: "The page number to retrieve.",
      remarks: ["The page offset starts at 1"],
    },
  },
  responses: [
    {
      status: 200,
      synopsis: "Successful request",
      description: "A leaderboard page for the specified leaderboard is returned on successful request.",
      remarks: [],
      bodyJson: {
        name: "ShardsLeaderboardData",
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
                        description: "The amount of shards the player has."
                    }
                  ],
                },
              },
            },
          },
          {
            name: "status",
            type: { kind: "static", value: 200 },
          },
        ],
      },
    },
    unauthorizedResponse,
    unknownPageResponse
  ],
};
