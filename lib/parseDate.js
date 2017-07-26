const chrono = require('chrono-node');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

module.exports = async ctx => {
  let unix = null, natural = null
  const dateString = ctx.params.dateString;
  const parsed = chrono.parseDate(dateString);
  const date = parsed ? new Date(parsed) : new Date(dateString * 1000);

  if (date != "Invalid Date") {
    const month = months[date.getMonth()];

    unix = date.getTime();
    natural = `${month} ${date.getDate()}, ${date.getFullYear()}`;
  }

  ctx.body = { unix, natural };
}
