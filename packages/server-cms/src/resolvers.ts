import { getBaseColours } from './resolvers/base_colours/getBaseColours';
import { getItemsForItemsTableLatest } from './resolvers/getItemsForItemsTableLatest';

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello from Apollo Server';
    },
    getBaseColours,
    getItemsForItemsTableLatest,
  },
};

export { resolvers };
