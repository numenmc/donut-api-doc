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

export const auction_transactions_v1_endpoint: Endpoint = {
  endpoint: ["v1", "auction", "transactions", new URLParameter("page")],
  method: RequestMethod.GET,
  description:
    "Retrieve a list of recent transactions made on the Auction House.",
  remarks: [
    "In this context, a transaction refers to an item on the Auction House being bought by someone",
    "Transactions are ordered by the date sold",
  ],
  urlParameters: {
    page: {
      type: URLParameterDataType.NUMBER,
      description: "The page number to retrieve.",
      remarks: [
        "The page offset starts at 1",
        "The maximum page you can retrieve is 10",
        "There are 100 transactions per page",
      ],
    },
  },
  responses: [
    {
      status: 200,
      synopsis: "Successful request",
      description: "Recent auction transactions are returned on successful request.",
      remarks: [],
      bodyJson: {
        name: "AuctionTransactionsSuccessfulResponse",
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
                      description:
                        "Information about the sold item is stored here.",
                    },
                    {
                      name: "seller",
                      type: { kind: "object", schema: player },
                      description:
                        "The seller is the player who created the listing.",
                    },
                    {
                      name: "price",
                      type: { kind: "primitive", name: "number" },
                      description:
                        "The exact listing price of the item being sold.",
                    },
                    {
                      name: "unixMillisDateSold",
                      type: { kind: "primitive", name: "number" },
                      description:
                        "The unix timestamp when the item was sold, in milliseconds.",
                    },
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
    unknownPageResponse,
  ],
};
