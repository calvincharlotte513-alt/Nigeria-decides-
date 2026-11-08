export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { identifier } = req.body || {};
  res.status(200).json({
    success: true,
    message: 'OTP dispatched successfully',
    testCode: '123456',
    maskedIdentifier: identifier ? (identifier.includes('@') ? identifier.replace(/(.{2})(.*)(?=@)/, '$1***') : identifier.replace(/(\d{4})\d+(\d{3})/, '$1****$2')) : '0803***000'
  });
}
