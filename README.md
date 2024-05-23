# _hsql
SQL 🤝 hyperscript.

## requirements
SQL database running in the browser

## usage
### statements
#### direct SQL statements
```js
db 'CREATE TABLE users (firstname CHAR(50) NOT NULL, lastname CHAR(50) NOT NULL, age INT(3) NOT NULL)'
```
#### prepared SQL statements with unnamed parameters
```js
db 'INSERT INTO users VALUES (?,?,?)' with ['John', 'Doe', 27]
```
#### prepared SQL statements with named parameters
```js
db 'INSERT INTO users VALUES ($firstname,$lastname,$age)' with {$firstname: 'John', $lastname: 'Doe', $age: 27}
```

### error handling
errors can be handled using `catch`:
```js
db 'INSERT INTO users VALUES (?,?,?)' with record
catch error
    // Handle errors...
```

### working with the DOM
#### using values from input fields
*HTML*
```html
<input id="firstname" value="John" type="text">
<input id="lastname" value="Doe" type="text">
<input id="age" value="27" type="number">
```
---
*hyperscript*
```js
set record to [#firstname.value, #lastname.value, #age.value as a Number]
db 'INSERT INTO users VALUES (?,?,?)' with record
```
#### creating tables from query results
```js
table it // "it" is the result of the db command
put it into #results // HTML
```

## examples
- [basic demo](https://3c2f3e.github.io/_hsql/demo.html) [(code)](./examples/demo.html)
- [multiple statements demo](https://3c2f3e.github.io/_hsql/multiple.html) [(code)](./examples/multiple.html)
- [playground](https://3c2f3e.github.io/_hsql/playground.html) [(code)](./examples/playground.html)

## development

- [X] Integration of SQL.js
- [X] Running direct statements against SQL.js
- [X] Running prepared statements against SQL.js
- [X] Responding with HTML
- [ ] Native SQL statements using hyperscript (`dbselect * from users where id = <#id/>.value`)