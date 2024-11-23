import { Context } from 'hono';

export const handleError = (error: unknown, c: Context) => {
  console.error('Error:', error);
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  return c.json({ success: false, message }, 500);
};

export const createSuccessResponse = (data: unknown, message = 'Success') => ({
  success: true,
  message,
  data,
});