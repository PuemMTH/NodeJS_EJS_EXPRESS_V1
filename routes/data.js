const express = require("express");
const anime = require("../api/anime/search");

const router = express.Router();

router.get("/:search", function(req, res) {
    anime(req.params.search).then(function (response) {
        res.render("search", { search: req.params.search , data: response.data.results });
    });
});

router.post("/:search", function(req, res) {
    anime(req.params.search).then(function (response) {
        res.render("search", { search: req.params.search , data: response.data.results });
    });

});

module.exports = router;