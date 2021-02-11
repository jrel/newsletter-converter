import { MongoClient, Collection } from 'mongodb';
import { WithId } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection<T = any>(name: string): Promise<Collection<T>> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },

  map: <TSchema>(
    data: WithId<TSchema>
  ): Pick<WithId<TSchema>, Exclude<keyof Omit<TSchema, '_id'>, '_id'>> & {
    id: string;
  } => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id.toHexString() };
  },

  mapCollection: <TSchema>(
    collection: WithId<TSchema>[]
  ): Array<
    Pick<WithId<TSchema>, Exclude<keyof Omit<TSchema, '_id'>, '_id'>> & {
      id: string;
    }
  > => {
    return collection.map((c) => MongoHelper.map(c));
  },
};
