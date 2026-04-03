export const sendResponse = (
  res,
  req,
  status,
  success,
  message,
  data = null,
) => {
  res.status(status).json({
    success,
    message,
    data,
  });
};
