import { Router } from "express";
import { sortBy, filterBy } from "../constants";
import { Then, Catch } from "../utils/res";
import ItemsSchema from "../schemas/ItemsSchema";

const router = Router();

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const onSuccess = Then(res);
  const onError = Catch(res);

  return ItemsSchema.findById(id).then(onSuccess).catch(onError);
});

router.route("/search/:searchQuery").get((req, res) => {
  const { searchQuery } = req.params;
  const { sorting, filter, service, country, city }: any = req.query;

  const onSuccess = Then(res);
  const onError = Catch(res);

  let sortQuery;
  switch (sorting) {
    case sortBy.datePublished:
      sortQuery = { createdAt: -1 };
      break;
    case sortBy.priceHighToLow:
      sortQuery = { price: -1 };
      break;
    case sortBy.priceLowToHigh:
      sortQuery = { price: 1 };
      break;
    case sortBy.averageRating:
      sortQuery = { averageRating: -1 };
      break;
    default:
      sortQuery = { createdAt: -1 };
  }

  let find: any = {};

  if (filter?.startsWith(filterBy.priceRange)) {
    const filterByArray = filter.split("-");
    const fromPrice = filterByArray[2];
    const toPrice = filterByArray[4];
    const fromPriceInt = parseInt(fromPrice);
    const toPriceInt = parseInt(toPrice);
    if (fromPriceInt && toPriceInt) {
      find = {
        price: { $gte: fromPriceInt, $lte: toPriceInt },
      };
    }
  } else if (filter) {
    switch (filter) {
      case filterBy.onlyPremium:
        find = {
          premium: true,
        };
        break;
      case filterBy.onlyNonPremium:
        find = {
          premium: false,
        };
        break;
    }
  }

  const shouldSearch = searchQuery.startsWith("q=");
  ItemsSchema.find(
    {
      isAvailable: true,
      ...(service && { serviceId: service }),
      ...(country && { countryId: country }),
      ...(city && { cityId: city }),
      ...find,
      ...(shouldSearch
        ? {
            $text: {
              $search: searchQuery.substring(2),
            },
          }
        : {
            categoryId: searchQuery,
          }),
    },
    {
      ...(shouldSearch && {
        score: { $meta: "textScore" },
      }),
      keywords: 0,
      updatedAt: 0,
      userId: 0,
      isAvailable: 0
    }
  )
    .sort({
      ...(shouldSearch && {
        score: {
          $meta: "textScore",
        },
      }),
      ...sortQuery,
    })
    .limit(10)
    .then(onSuccess)
    .catch(onError);
});

export default router;
