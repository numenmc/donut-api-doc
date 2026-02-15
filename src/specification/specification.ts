import { RequestMethod, URLParameter, URLParameterDataType, type ApiSpecification } from "../type/specificationType";
import { item, shulkerItem } from "./auction/itemSpec";
import { auction_list_v1_endpoint } from "./endpoints/auction_list_v1";
import { player } from "./common/playerSpec";
import { auction_transactions_v1_endpoint } from "./endpoints/auction_transactions_v1";
import { leaderboard_broken_blocks_v1_endpoint } from "./endpoints/leaderboards/leaderboard_broken_blocks_v1";
import { leaderboard_deaths_v1 } from "./endpoints/leaderboards/leaderboard_deaths_v1";
import { leaderboard_kills_v1 } from "./endpoints/leaderboards/leaderboard_kills_v1";
import { leaderboard_mobs_killed_v1 } from "./endpoints/leaderboards/leaderboard_mobskilled_v1";
import { leaderboard_money_v1 } from "./endpoints/leaderboards/leaderboard_money_v1";
import { leaderboard_placed_blocks_v1 } from "./endpoints/leaderboards/leaderboard_placed_blocks_v1";
import { leaderboard_playtime_v1 } from "./endpoints/leaderboards/leaderboard_playtime_v1";
import { leaderboard_sell_v1 } from "./endpoints/leaderboards/leaderboard_sell_v1";
import { leaderboard_shards_v1 } from "./endpoints/leaderboards/leaderboard_shards_v1";
import { leaderboard_shop_v1 } from "./endpoints/leaderboards/leaderboard_shop_v1";

export const specification: ApiSpecification = {
    baseUrl: "https://api.donutsmp.net/",
    endpoints: [
        auction_list_v1_endpoint,
        auction_transactions_v1_endpoint,
        leaderboard_broken_blocks_v1_endpoint,
        leaderboard_deaths_v1,
        leaderboard_kills_v1,
        leaderboard_mobs_killed_v1,
        leaderboard_money_v1,
        leaderboard_placed_blocks_v1,
        leaderboard_playtime_v1,
        leaderboard_sell_v1,
        leaderboard_shards_v1,
        leaderboard_shop_v1
    ]
}
