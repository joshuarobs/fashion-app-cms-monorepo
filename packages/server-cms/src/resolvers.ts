import { getBaseColours } from './resolvers/getBaseColours';
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
