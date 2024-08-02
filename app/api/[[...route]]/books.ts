import { Hono } from "hono";


const app = new Hono()
    .get('/', (c) => c.json('list books'))
    .post('/', (c) => c.json('create an books', 201))
    .get('/:id', (c) => c.json(`get books: ${c.req.param('id')}`));


export default app;
