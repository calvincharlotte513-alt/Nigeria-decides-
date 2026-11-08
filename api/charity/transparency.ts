import { INITIAL_CHARITIES } from '../../src/data/initialData';

export default function handler(_req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.status(200).json({
    totalPoolAmountNgn: 587450000,
    totalCharityDistributedNgn: 42000000,
    undistributedFundsNgn: 545450000,
    beneficiaries: INITIAL_CHARITIES
  });
}
