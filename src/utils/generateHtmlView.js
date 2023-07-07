
function generateView(list) {
  const html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Templates</title></head><body><div class="main"><h3>Please find the list of template below, and click them to view</h3><hr><br><ul style="list-style-type:decimal">{{list}}</ul></div></body></html>'
  const ul = list.map(e => `<li><a href="/${e}.html" style="text-decoration:none;"><b>${e}</b></a></li>`)
  return (html.replace(/{{list}}/, ul.join('')))
}




module.exports = { generateView }