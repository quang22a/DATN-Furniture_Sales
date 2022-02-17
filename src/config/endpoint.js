const RESOURCES = {
  auth: "auth",
  brand: {
    index: "brand",
    list: "brands",
  },
  category: {
    index: "category",
    list: "categories",
  },
  product: {
    index: "product",
    list: "products",
  },
  rating: {
    index: "rating",
    list: "ratings",
  },
  bill: {
    index: "bill",
    list: "bills",
  },
  contact: "contact",
  notification: "notifications",
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    registerCustomer: `${RESOURCES.auth}/register-customer`,
    registerStaff: `${RESOURCES.auth}/register-staff`,
    login: `${RESOURCES.auth}/login`,
    profile: `${RESOURCES.auth}/profile`,
    updatePassword: `${RESOURCES.auth}/update-password`,
    requestResetPass: `${RESOURCES.auth}/reset-password`,
    confirmCode: `${RESOURCES.auth}/confirm-code`,
    changePasswordReset: `${RESOURCES.auth}/change-password`,
  },
  brand: {
    index: `${RESOURCES.brand.index}`,
    list: `${RESOURCES.brand.list}`,
  },
  category: {
    index: `${RESOURCES.category.index}`,
    list: `${RESOURCES.category.list}`,
  },
  product: {
    index: `${RESOURCES.product.index}`,
    list: `${RESOURCES.product.list}`,
  },
  rating: {
    index: `${RESOURCES.rating.index}`,
    list: `${RESOURCES.rating.list}`,
  },
  bill: {
    index: `${RESOURCES.bill.index}`,
    list: `${RESOURCES.bill.list}`,
  },
  contact: `${RESOURCES.contact}`,
  notification: `${RESOURCES.notification}`,
};
