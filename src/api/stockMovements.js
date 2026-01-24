import api from "./axios";

export const createStockMovement = async (data) => {
  const res = await api.post("/stock-movements", data);
  return res.data;
};

export const getStockMovements = async (productId = null) => {
  const url = productId
    ? `/stock-movements?product=${productId}`
    : "/stock-movements";

  const res = await api.get(url);
  return res.data;
};
