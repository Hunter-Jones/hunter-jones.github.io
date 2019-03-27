var port = 3000;

var http            = require("http"),
    express         = require("express"),
    ejs             = require("ejs");
    app             = express();

app.use(express.static(__dirname + "/public"));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("homepage");
})


app.listen(port);
