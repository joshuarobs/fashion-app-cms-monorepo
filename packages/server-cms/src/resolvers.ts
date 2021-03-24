const resolvers = {
  Query: {
    hello: () => {
      return 'Hello from Apollo Server';
    },
  },
};

export { resolvers };
