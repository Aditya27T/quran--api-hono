import { Context, Next } from 'hono'
import { ApiError } from '../types/error'

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    console.error('Error:', error)
    
    if (error instanceof ApiError) {
      return c.json(
        {
          success: false,
          error: {
            status: error.status,
            message: error.message
          }
        },
        { status: error.status }
      )
    }
    
    // Default error response
    return c.json(
      {
        success: false,
        error: {
          status: 500,
          message: error instanceof Error ? error.message : 'Internal Server Error'
        }
      },
      { status: 500 }
    )
  }
}