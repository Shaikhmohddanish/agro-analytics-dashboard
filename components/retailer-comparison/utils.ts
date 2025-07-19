// Utility functions for retailer comparison

// Format large numbers
export function formatNumber(value: number): string {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(1)}Cr`;
  } else if (value >= 100000) {
    return `${(value / 100000).toFixed(1)}L`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

// Calculate percentage difference
export function calculateDifference(a: number, b: number): string {
  return ((a - b) / b * 100).toFixed(1);
}
