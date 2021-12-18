const RESOURCES = {
  auth: "auth",
  brand: "brand",
  category: {
    index: "category",
    s: "categories",
  },
  product: "product",
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    registerCustomer: `${RESOURCES.auth}/register-customer`,
    registerStaff: `${RESOURCES.auth}/register-staff`,
    login: `${RESOURCES.auth}/login`,
    profile: `${RESOURCES.auth}/profile`,
  },
  brand: {
    index: `${RESOURCES.brand}`,
  },
  category: {
    index: `${RESOURCES.category.index}`,
    s: `${RESOURCES.category.s}`,
  },
  product: {
    index: `${RESOURCES.product}`,
  },
};
