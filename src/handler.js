const { nanoid } = require("nanoid");
const bookshelfs = require("./bookshelf");

const storeBookshelfHandler = (req, res) => {
  // get data
  const body = req.payload;
  const id = nanoid(16);
  const finished = body.pageCount === body.readPage ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // validation data
  let response = {};
  if (body.name === undefined) {
    response = res.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (body.readPage > body.pageCount) {
    response = res.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  // save data
  const newBookshelf = {
    id,
    ...body,
    finished,
    insertedAt,
    updatedAt,
  };
  bookshelfs.push(newBookshelf);
  const isSuccess =
    bookshelfs.filter((bookshelf) => bookshelf.id === id).length > 0;

  if (isSuccess) {
    response = res.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
};

const getAllBookshelfHandler = (req, res) => {
  // get data
  let bookshelfDatas = [];
  const { name, reading, finished } = req.query;

  if (name !== undefined) {
    bookshelfDatas = [
      ...bookshelfs
        .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
    ];
  } else if (reading !== undefined) {
    if (reading === "0") {
      bookshelfDatas = [
        ...bookshelfs
          .filter((book) => book.reading === false)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      ];
    } else if (reading === "1") {
      bookshelfDatas = [
        ...bookshelfs
          .filter((book) => book.reading === true)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      ];
    }
  } else if (finished !== undefined) {
    if (finished === "0") {
      bookshelfDatas = [
        ...bookshelfs
          .filter((book) => book.finished === false)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      ];
    } else if (finished === "1") {
      bookshelfDatas = [
        ...bookshelfs
          .filter((book) => book.finished === true)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      ];
    }
  } else {
    bookshelfDatas = [
      ...bookshelfs.map((bookshelf) => ({
        id: bookshelf.id,
        name: bookshelf.name,
        publisher: bookshelf.publisher,
      })),
    ];
  }

  const response = res.response({
    status: "success",
    data: {
      books: bookshelfDatas,
    },
  });

  response.code(200);
  return response;
};

const getBookshelfByIdHandler = (req, res) => {
  // get data
  const { id } = req.params;
  const bookshelf = bookshelfs.filter((data) => data.id === id)[0];
  let response = {};

  if (bookshelf !== undefined) {
    response = res.response({
      status: "success",
      data: {
        book: bookshelf,
      },
    });

    response.code(200);
    return response;
  }

  response = res.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });

  response.code(404);
  return response;
};

const updateBookshelfHandler = (req, res) => {
  // get data
  const { id } = req.params;
  const body = req.payload;
  const updatedAt = new Date().toISOString();

  // validation data
  let response = {};
  if (body.name === undefined) {
    response = res.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (body.readPage > body.pageCount) {
    response = res.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  // update data
  const index = bookshelfs.findIndex((book) => book.id === id);
  if (index !== -1) {
    let finished = false;

    if (body.readPage === body.pageCount) {
      finished = true;
    }

    bookshelfs[index] = {
      ...bookshelfs[index],
      ...body,
      finished,
      updatedAt,
    };

    response = res.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });

    response.code(200);
    return response;
  }

  response = res.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

const deleteBookshelfHandler = (req, res) => {
  // get data
  const { id } = req.params;
  const index = bookshelfs.findIndex((book) => book.id === id);

  // delete data
  let response = {};
  if (index !== -1) {
    bookshelfs.splice(index, 1);
    response = res.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });

    response.code(200);
    return response;
  }

  response = res.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

module.exports = {
  storeBookshelfHandler,
  getAllBookshelfHandler,
  getBookshelfByIdHandler,
  updateBookshelfHandler,
  deleteBookshelfHandler,
};
