import { RequestMethod, URLParameter, URLParameterDataType, type ApiSpecification } from "../type/specificationType";
import { item, shulkerItem } from "./auction/itemSpec";
import { auction_list_v1_endpoint } from "./endpoints/auction_list_v1";
import { player } from "./common/playerSpec";

export const specification: ApiSpecification = {
    baseUrl: "https://api.donutsmp.net/",
    endpoints: [
        auction_list_v1_endpoint
    ]
}
