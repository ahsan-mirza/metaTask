import { getCookie } from '@/utils/cookies';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const account = getCookie(req, 'metamaskAccount');
  if (account) {
    res.status(200).json({ account });
  } else {
    res.status(200).json({ account: null });
  }
}