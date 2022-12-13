import { FastifyRequest, FastifyReply, FastifyInstance, RegisterOptions } from 'fastify';
import { MANGA } from '@consumet/extensions';

const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  const mangakakalot = new MANGA.MangaKakalot();

  fastify.get('/mangakakalot', (_, rp) => {
    rp.status(200).send({
      intro: `Welcome to the MangaKakalot provider: check out the provider's website @ ${mangakakalot.toString.baseUrl}`,
      routes: ['/:query', '/info', '/read'],
      documentation: 'https://docs.consumet.org/#tag/mangakakalot',
    });
  });

  fastify.get(
    '/mangakakalot/:query',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const query = (request.params as { query: string }).query;

      const res = await mangakakalot.search(query);

      reply.status(200).send(res);
    }
  );

  fastify.get(
    '/mangakakalot/info',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const id = (request.query as { id: string }).id;

      if (typeof id === 'undefined')
        return reply.status(400).send({ message: 'id is required' });

      try {
        const res = await mangakakalot
          .fetchMangaInfo(id)
          .catch((err) => reply.status(404).send({ message: err }));

        reply.status(200).send(res);
      } catch (err) {
        reply
          .status(500)
          .send({ message: 'Something went wrong. Please try again later.' });
      }
    }
  );

  fastify.get(
    '/mangakakalot/read',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const chapterId = (request.query as { chapterId: string }).chapterId;

      if (typeof chapterId === 'undefined')
        return reply.status(400).send({ message: 'chapterId is required' });

      try {
        const res = await mangakakalot
          .fetchChapterPages(chapterId)
          .catch((err: Error) => reply.status(404).send({ message: err.message }));

        reply.status(200).send(res);
      } catch (err) {
        reply
          .status(500)
          .send({ message: 'Something went wrong. Please try again later.' });
      }
    }
  );
};

export default routes;
