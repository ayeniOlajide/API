const router = require("express").Router();
const {
  createBlog,
  getBlogs,
  getBlog
} = require("../controllers/blog");
const {
  filterAndSort,
  filterByPublished,
  list,
  setUserFilter
} = require("../middleware/apifeatures");
const getUserFromToken = require("../middleware/verifyUser");
const pagination = require("../middleware/pagination");


router.route("/")
  .post(getUserFromToken, createBlog)
  .get(
    getUserFromToken,
    filterAndSort,
    filterByPublished,
    pagination,
    list,
    getBlogs
  );


router.route("/paginated")
  .get(
    getUserFromToken,
    filterAndSort,
    setUserFilter,
    pagination,
    getBlogs
  );


router.route("/:id")
  .get(getUserFromToken, getBlog);

module.exports = router;
