// this file can be used to initialize the mongodb container on startup.
// Note that the container will only run this file when the database doesn't
// already exist, so you'll have to delete the DB in the container or
// delete the entire container, then recreate, for the initialization to happen.

db.orders.insertMany([
  {
    customerName: 'customer1',
    customerNumber: 1,
    status: 'completed',
    hidden: 'true',
    price: 5,
    // italian soda
    dish: 'italian-soda',
    // lychee and apple shots
    options: [
      {
        _id: 'sour-cream',
        friendlyName: 'Sour Cream',
        extraPrice: 0,
        allowQuantity: false,
        dependencies: [],
      },
    ],
    updates: [
      {
        newStatus: 'new',
        user: 'foo',
        createdAt: {
          $date: '2023-09-18T21:05:50.606Z',
        },
        updatedAt: {
          $date: '2023-09-18T21:05:50.606Z',
        },
      },
    ],

    __v: 0,
  },
  {
    customerName: 'customer2',
    customerNumber: 2,
    status: 'in_progress',
    price: 5,
    hidden: 'false',
    dish: 'custom',
    options: [
      {
        _id: 'sour-cream',
        friendlyName: 'Sour Cream',
        extraPrice: 0,
        allowQuantity: false,
        dependencies: [],
      },
    ],
    updates: [
      {
        newStatus: 'new',
        user: 'foo',
        createdAt: {
          $date: '2023-09-18T21:05:50.606Z',
        },
        updatedAt: {
          $date: '2023-09-18T21:05:50.606Z',
        },
      },
    ],

    __v: 0,
  },
  {
    customerName: 'customer3',
    customerNumber: 3,
    price: 5,
    status: 'new',
    hidden: 'false',
    dish: 'pancakes',
    options: [
      {
        _id: 'sour-cream',
        friendlyName: 'Sour Cream',
        extraPrice: 0,
        allowQuantity: false,
        dependencies: [],
      },
    ],
    updates: [
      {
        newStatus: 'new',
        user: 'foo',
        createdAt: {
          $date: '2023-09-18T21:06:50.000Z',
        },
        updatedAt: {
          $date: '2023-09-18T21:06:50.000Z',
        },
      },
    ],

    __v: 0,
  },
]);

db.dishes.insertMany([
  {
    _id: 'pancakes',
    friendlyName: 'Pancakes',
    dotw: ['Monday', 'Tuesday'],
    basePrice: 1,
    tags: ['food'],
    categories: ['breakfast'],
    isOrderable: true,
    isArchived: false,
    selectedOptions: [],
    options: [
      {
        _id: 'syrup',
        friendlyName: 'maple syrup',
        extraPrice: 0,
        allowQuantity: false,
        dependencies: [],
      },
      {
        _id: 'berries',
        friendlyName: 'berries',
        extraPrice: 1,
        allowQuantity: false,
        dependencies: [],
      },
    ],

    createdAt: {
      $date: '2023-09-18T24:05:50.607Z',
    },
    updatedAt: {
      $date: '2023-09-18T24:05:50.607Z',
    },
    __v: 0,
  },
  {
    _id: 'loaded-quesadilla',
    friendlyName: 'Loaded Quesadilla',
    dotw: ['Monday', 'Tuesday'],
    basePrice: 1,
    tags: ['food'],
    categories: ['breakfast'],
    isOrderable: true,
    isArchived: false,
    selectedOptions: [],
    options: [
      {
        _id: 'sour-cream',
        friendlyName: 'Sour Cream',
        extraPrice: 0,
        allowQuantity: false,
        dependencies: [],
      },
    ],
    dependencies: [],
    createdAt: {
      $date: '2023-09-18T24:05:50.607Z',
    },
    updatedAt: {
      $date: '2023-09-18T24:05:50.607Z',
    },
    __v: 0,
  },
  {
    _id: 'italian-soda',
    friendlyName: 'Italian Soda',
    dotw: ['Monday', 'Tuesday'],
    basePrice: 5,
    tags: ['drink'],
    categories: ['drinks'],
    isOrderable: true,
    isArchived: false,
    selectedOptions: [],
    options: [
      {
        _id: 'apple',
        friendlyName: 'apple',
        extraPrice: 0,
        allowQuantity: true,
        dependencies: [],
      },
      {
        _id: 'lychee',
        friendlyName: 'lychee',
        extraPrice: 1,
        allowQuantity: true,
        dependencies: [],
      },
    ],
    dependencies: [],
    createdAt: {
      $date: '2023-09-20T21:05:50.607Z',
    },
    updatedAt: {
      $date: '2023-09-20T21:05:50.607Z',
    },
    __v: 0,
  },
  {
    _id: 'milkshake',
    friendlyName: 'Milkshake',
    dotw: ['Monday', 'Tuesday'],
    basePrice: 5,
    tags: ['drink'],
    categories: ['drinks'],
    isOrderable: true,
    isArchived: false,
    selectedOptions: [],
    options: [
      {
        _id: 'oreo',
        friendlyName: 'oreo',
        extraPrice: 0,
        allowQuantity: true,
        dependencies: [],
      },
      {
        _id: 'vanilla',
        friendlyName: 'vanilla',
        extraPrice: 1,
        allowQuantity: true,
        dependencies: [],
      },
      {
        _id: 'chocolate',
        friendlyName: 'chocolate',
        extraPrice: 1,
        allowQuantity: true,
        dependencies: [],
      },
    ],
    dependencies: [],
    createdAt: {
      $date: '2023-09-20T21:05:50.607Z',
    },
    updatedAt: {
      $date: '2023-09-20T21:05:50.607Z',
    },
    __v: 0,
  },
]);
