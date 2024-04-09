const REWARD_TYPES = {
  BADGES: 'badges',
  TITLES: 'titles',
  CERTIFICATES: 'certificates'
};

const REWARD_TYPES_CATEGORY = {
  EARNED: 'earned',
  ONGOING: 'onGoing',
  UPCOMING: 'upComing',
};

const REWARD_TYPES_CATEGORY_CERTIFICATES = {
  STAR: 'star',
  CHAMP: 'champ'
}

const GET_SORTED_REWARD_TYPES = rewardData => {
  let sortedArrayKeys = [];
  for (let keys in rewardData) {
    sortedArrayKeys.push(keys);
  }
  sortedArrayKeys.sort();
  let updatedRewardData = {};
  for (let ukeys of sortedArrayKeys) {
    updatedRewardData[ukeys] = rewardData[ukeys];
  }
  return updatedRewardData;
};

const REWARD_TYPES_SECTION = {
  [REWARD_TYPES.BADGES]: {
    [REWARD_TYPES_CATEGORY.EARNED]: 'Earned Badges',
    [REWARD_TYPES_CATEGORY.ONGOING]: 'Ongoing Badges',
    [REWARD_TYPES_CATEGORY.UPCOMING]: 'Upcoming Badges',
  },
  [REWARD_TYPES.TITLES]: {
    [REWARD_TYPES_CATEGORY.EARNED]: 'Earned Titles',
    [REWARD_TYPES_CATEGORY.ONGOING]: 'Ongoing Titles',
    [REWARD_TYPES_CATEGORY.UPCOMING]: 'Upcoming Titles',
  },
  [REWARD_TYPES.CERTIFICATES]: {
    [REWARD_TYPES_CATEGORY_CERTIFICATES.STAR]: 'Sparkie Stars Won',
    [REWARD_TYPES_CATEGORY_CERTIFICATES.CHAMP]: 'Sparkie Champs Won',
  },
};

export {
  REWARD_TYPES,
  GET_SORTED_REWARD_TYPES,
  REWARD_TYPES_SECTION,
  REWARD_TYPES_CATEGORY,
  REWARD_TYPES_CATEGORY_CERTIFICATES
};