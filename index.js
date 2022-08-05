const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const app = new Koa();
const router = new Router();

app.use(bodyParser({
    formidable: {uploadDir: './uploads'},
    multipart: true,
    urlencoded: true
}));

const tickets = []

router.get('/ticket', (ctx) => {
    const res = []
    tickets.forEach(el => res.push({id: el.id, name: el.name, status: el.status, created: el.created}))
    ctx.response.body = res
});

router.get('/ticket/:id', (ctx) => {
    const {id} = ctx.params
    ctx.response.body = tickets.find(el => el.id === +id)
});

router.post('/ticket', (ctx) => {
    console.log(ctx.request.body)
    const body = ctx.request.body
    const id = +Date.now()
    const newTicket = {id, ...body, created: new Date().toISOString()}
    tickets.push(newTicket)
    ctx.response.body = newTicket
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3005)



