const path = require('path');
const views = require('koa-views');
const router = require('koa-router')();
const koaBody = require('koa-body');
const parseDate = require('./lib/parseDate');

const Koa = require('koa');
const app = new Koa();

app.use(koaBody());

app.use(views(path.join(__dirname, '/views'), { extension: 'html' }));

router.get('/', async ctx => await ctx.render('home'));
router.get('/:dateString', parseDate)

app.use(router.routes());

app.use(async function pageNotFound(ctx) {
  ctx.status = 404;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Page Not Found';
  }
});

app.listen(3000);
