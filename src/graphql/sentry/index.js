
import { AuthenticationError } from 'apollo-server';

const objectMap = (object, mapper) =>
  Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: mapper(value, key)
    }),
    {}
  )

const resolversWrapper = resolvers =>
  objectMap(resolvers, (resolver, name) => async (...args) => {
    try {
      const result = await resolver(...args);
      return result;
    } catch (err) {
      if (err instanceof AuthenticationError) {
        throw err
      }

      const [variables, context] = args.slice(1)
      throw err;
    }
  })

export {
  objectMap,
  resolversWrapper
}