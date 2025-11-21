// Pricing utility functions for quantity-based discounts

/**
 * Calculate the discounted price based on quantity
 * @param {number} basePrice - Original price per item
 * @param {number} quantity - Number of items
 * @returns {object} - { unitPrice, totalPrice, discount, discountPercent }
 */
export const calculatePrice = (basePrice, quantity) => {
  let discountPercent = 0;

  // Discount tiers
  if (quantity >= 10) {
    discountPercent = 15; // 15% off for 10+ items
  } else if (quantity >= 5) {
    discountPercent = 10; // 10% off for 5-9 items
  } else if (quantity >= 3) {
    discountPercent = 5; // 5% off for 3-4 items
  }

  const discount = (basePrice * discountPercent) / 100;
  const unitPrice = basePrice - discount;
  const totalPrice = unitPrice * quantity;

  return {
    unitPrice: parseFloat(unitPrice.toFixed(2)),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    discountPercent,
  };
};

/**
 * Get discount tier information
 * @param {number} quantity - Current quantity
 * @returns {object} - Information about current and next discount tiers
 */
export const getDiscountInfo = (quantity) => {
  const tiers = [
    { min: 10, discount: 15, label: "10+ items: 15% off" },
    { min: 5, discount: 10, label: "5-9 items: 10% off" },
    { min: 3, discount: 5, label: "3-4 items: 5% off" },
  ];

  const currentTier = tiers.find((tier) => quantity >= tier.min);
  const nextTier = tiers.find((tier) => quantity < tier.min);

  return {
    currentTier,
    nextTier,
    allTiers: tiers,
  };
};
