import { HttpError } from "http-errors";

const errorHandler = (error, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  let status = 500;
  let message = error.message || 'Internal Server Error';

  if (error instanceof HttpError) {
    status = error.status || 500;
    message = error.message;
  }

  res.status(status).json({
    message: isProd ? 'Something went wrong. Please try again later.' : message,
  });
};
export default errorHandler;
