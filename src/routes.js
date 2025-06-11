const {
  storeBookshelfHandler,
  getAllBookshelfHandler,
  getBookshelfByIdHandler,
  updateBookshelfHandler,
  deleteBookshelfHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: storeBookshelfHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBookshelfHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookshelfByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: updateBookshelfHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookshelfHandler,
  },
];

module.exports = routes;
