export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { identifier } = req.body || {};
  const ref = `NGV-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const masked = identifier ? (identifier.includes('@') ? identifier.replace(/(.{2})(.*)(?=@)/, '$1***') : identifier.replace(/(\d{4})\d+(\d{3})/, '$1****$2')) : '0803***000';
  res.status(200).json({
    success: true,
    referenceCode: ref,
    maskedIdentifier: masked,
    message: 'Ballot successfully recorded'
  });
}
