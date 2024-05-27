const config = {
  locateFile: (filename) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${filename}`,
};
let database = null;
const init = async function (config) {
  const SQL = await initSqlJs(config);
  database = new SQL.Database();
};

init(config);

_hyperscript.addCommand("db", function (parser, runtime, tokens) {
  if (!tokens.matchToken("db")) return;
  const queryToken = parser.requireElement("stringLike", tokens);
  let preparedValuesToken;
  if (tokens.matchToken("with")) {
    preparedValuesToken = parser.requireElement("expression", tokens);
  }

  return {
    args: [queryToken, preparedValuesToken],
    async op(context, query, prepared) {
      let results = database.exec(query, prepared);
      context.result = results;
      return runtime.findNext(this);
    },
  };
});
_hyperscript.addCommand("table", function (parser, runtime, tokens) {
  if (!tokens.matchToken("table")) return;
  const expr = parser.requireElement("expression", tokens);

  return {
    args: [expr],
    async op(context, value) {
      if (value.length == 0) {
        context.result = "No results found.";
      } else {
        context.result = "";
        for (let h = 0; h < value.length; h++) {
          let queryResult = value[h];
          let table = document.createElement("table");
          let head = queryResult.columns;
          let thead = table.createTHead();
          let theadRow = thead.insertRow();
          for (let i = 0; i < head.length; i++) {
            let th = document.createElement("th");
            th.textContent = head[i];
            theadRow.appendChild(th);
          }
          let tbody = table.createTBody();
          for (let i = 0; i < queryResult.values.length; i++) {
            let row = queryResult.values[i];
            let rowEl = tbody.insertRow();
            for (let j = 0; j < row.length; j++) {
              let td = rowEl.insertCell();
              td.textContent = row[j];
            }
          }
          context.result += table.outerHTML;
        }
      }
      return runtime.findNext(this);
    },
  };
});
