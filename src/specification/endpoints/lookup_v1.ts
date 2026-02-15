import { RequestMethod, URLParameter, URLParameterDataType, type Endpoint } from "../../type/specificationType";
import { unknownPageResponse } from "../auction/auctionUnknownPageResponse";
import { item, shulkerItem } from "../auction/itemSpec";
import { player } from "../common/playerSpec";
import { unauthorizedResponse } from "../common/unauthorizedResponse";

export const lookup_v1: Endpoint = {
  endpoint: ["v1", "lookup", new URLParameter("user")],
  method: RequestMethod.POST,
  description: "Get information about an online player",
  remarks: [
    "The information returned by this endpoint is the same as the information from /findplayer",
  ],
  urlParameters: {
    user: {
      type: URLParameterDataType.NUMBER,
      description: "The username of the player",
      remarks: ["This player must be online"],
    },
  },
  responses: [
    unauthorizedResponse,
    unknownPageResponse
  ],
};
