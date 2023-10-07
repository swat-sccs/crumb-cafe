// this file can be used to initialize the mongodb container on startup.
// Note that the container will only run this file when the database doesn't
// already exist, so you'll have to delete the DB in the container or
// delete the entire container, then recreate, for the initialization to happen.

db.orders.insertMany([
  {
    customerName: 'customer1',
    customerNumber: 1,
    status: 'completed',
    // italian soda
    dish: 'italian-soda',
    // lychee and apple shots
    options: {
      'flavor-shots': ['apple', 'lychee'],
    },
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
    createdAt: {
      $date: '2023-09-18T21:05:50.607Z',
    },
    updatedAt: {
      $date: '2023-09-18T21:05:50.607Z',
    },
    __v: 0,
  },
  {
    customerName: 'customer2',
    customerNumber: 2,
    status: 'in_progress',
    dish: 'custom',
    options: {},
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
    createdAt: {
      $date: '2023-09-18T21:05:50.607Z',
    },
    updatedAt: {
      $date: '2023-09-18T21:05:50.607Z',
    },
    __v: 0,
  },
  {
    customerName: 'customer3',
    customerNumber: 3,
    status: 'new',
    dish: 'pancakes',
    options: {
      toppings: ['syrup'],
    },
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
    createdAt: {
      $date: '2023-09-18T21:06:50.000Z',
    },
    updatedAt: {
      $date: '2023-09-18T21:06:50.000Z',
    },
    __v: 0,
  },
]);

db.dishes.insertMany([
  {
    _id: 'pancakes',
    friendlyName: 'pancakes',
    basePrice: 1,
    categories: ['breakfast'],
    isOrderable: true,
    isArchived: false,
    options: [
      {
        _id: 'toppings',
        friendlyName: 'toppings',
        allowMultipleSelections: true,
        allowNoSelection: true,
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
    friendlyName: 'italian soda',
    basePrice: 5,
    categories: ['drinks'],
    isOrderable: true,
    isArchived: false,
    options: [
      {
        _id: 'flavor-shots',
        friendlyName: 'flavor shots',
        allowMultipleSelections: true,
        allowNoSelection: false,
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
