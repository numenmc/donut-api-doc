import {
  RequestMethod,
  URLParameter,
  URLParameterDataType,
  type Endpoint
} from "../../type/specificationType";
import { unknownPageResponse } from "../auction/auctionUnknownPageResponse";
import { shulkerItem } from "../auction/itemSpec";
import { player } from "../common/playerSpec";
import { unauthorizedResponse } from "../common/unauthorizedResponse";

export const auction_list_v1_endpoint: Endpoint = {
  endpoint: ["v1", "auction", "list", new URLParameter("page")],
  method: RequestMethod.GET,
  description: "Retrieve a page of Auction House entries.",
  remarks: [
    "Each page is always 44 items long",
    "In the event where a page has less than 44 items, the <code>result</code> array is padded with <code>null</code>"
  ],
  urlParameters: {
    page: {
      type: URLParameterDataType.NUMBER,
      description: "The page number to retrieve.",
      remarks: ["The page offset starts at 1"]
    }
  },
  bodyJson: {
    description: "The request body can contain optional search and sorting options.",
    remarks: [],
    schema: {
      name: "AuctionListRequestOptions",
      fields: [
        {
          name: "search",
          required: false,
          type: { kind: "primitive", name: "string" },
          description:
            "This matches the username as well as the item IDs and display names (if applicable)."
        },
        {
          name: "sort",
          required: false,
          type: {
            kind: "union",
            values: ["lowest_price", "highest_price", "recently_listed", "last_listed"]
          }
        }
      ]
    }
  },
  responses: [
    {
      status: 200,
      synopsis: "Successful request",
      description: "Auction data is returned on successful request.",
      remarks: [],
      bodyJson: {
        name: "AuctionListSuccessfulResponse",
        fields: [
          {
            name: "result",
            type: {
              kind: "array",
              of: {
                kind: "object",
                schema: {
                  fields: [
                    {
                      name: "item",
                      type: { kind: "object", schema: shulkerItem },
                      description: "Information about the item being sold is stored here."
                    },
                    {
                      name: "seller",
                      type: { kind: "object", schema: player },
                      description: "The seller is the player who created the listing."
                    },
                    {
                      name: "price",
                      type: { kind: "primitive", name: "number" },
                      description: "The exact listing price of the item being sold."
                    },
                    {
                      name: "time_left",
                      type: { kind: "primitive", name: "number" },
                      description: "The time from now until the entry is removed, in milliseconds."
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
