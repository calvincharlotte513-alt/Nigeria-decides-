export const formatNgn = (amt: number): string => {
  if (!amt || amt <= 0) return '₦0';
  if (amt >= 1_000_000_000) return `₦${(amt / 1_000_000_000).toFixed(2)}B`;
  if (amt >= 1_000_000) return `₦${(amt / 1_000_000).toFixed(1)}M`;
  if (amt >= 1_000) return `₦${(amt / 1_000).toFixed(0)}k`;
  return `₦${amt.toLocaleString()}`;
};

export const formatVotes = (votes: number): string => {
  if (!votes || votes <= 0) return '0';
  return votes.toLocaleString();
};
