/**
 * Represents a standardized API response structure.
 * This interface ensures consistent response formatting across all API endpoints.
 *
 * @template T - The type of data being returned in case of success
 * @template M - The type of metadata (optional), typically used for pagination
 *
 * @property status - Indicates if the operation was successful ('success' or 'error')
 * @property data - Optional payload returned on successful operations
 * @property message - Optional informational message about the operation result
 * @property metadata - Optional additional contextual information (e.g., pagination)
 * @property error - Error message in case of failure
 * @property code - Optional error code for client-side error handling
 */
interface ApiResponse<T, M = unknown> {
    // Indicates the overall status of the API response
    status: string;

    // Contains the successful operation's return data
    // Optional as error responses won't include data
    data?: T;

    // Used for success messages or additional context
    // Optional as not all successful operations need messages
    message?: string;
    
    // Contains metadata such as pagination details
    // Optional as not all responses need metadata
    metadata?: M;

    // Contains error details when status is 'error'
    // Optional as success responses won't include errors
    error?: string;

    // Used for specific error identification
    // Optional as not all errors need specific codes
    code?: string;
}

/**
 * Pagination metadata interface
 * Used for responses that include paginated results
 */
export interface PaginationMeta {
    // Total number of items available
    total: number;
    
    // Current page number
    page: number;
    
    // Number of items per page
    limit: number;
    
    // Total number of pages
    totalPages: number;
}

/**
 * Creates a standardized success response object.
 * Use this helper to ensure consistent success response formatting.
 *
 * @template T - The type of data being returned
 * @template M - The type of metadata (optional)
 * @param data - Optional payload to be returned to the client
 * @param message - Optional success message
 * @param metadata - Optional metadata (such as pagination info)
 * @returns A properly formatted success response object
 *
 * @example
 * // Basic success response
 * return successResponse({ id: "123" }, "User created successfully");
 *
 * @example
 * // Success response with pagination
 * return successResponse<Job[], PaginationMeta>(
 *   jobs,
 *   "Jobs retrieved successfully",
 *   { 
 *     total: 100, 
 *     page: 2, 
 *     limit: 10, 
 *     totalPages: 10 
 *   }
 * );
 *
 * @example
 * // Success response without data
 * return successResponse(undefined, "Operation completed");
 */
export const successResponse = <T, M = unknown>(
    data?: T,
    message?: string,
    metadata?: M
): ApiResponse<T, M> => ({
    status: "success",
    data,
    message,
    ...(metadata && { metadata }),
});

/**
 * Creates a standardized error response object.
 * Use this helper to ensure consistent error response formatting.
 *
 * @param message - Error message describing what went wrong
 * @param code - Optional error code for client-side error handling
 * @returns A properly formatted error response object
 *
 * @example
 * // Basic error response
 * return errorResponse("Invalid input provided");
 *
 * @example
 * // Error response with code
 * return errorResponse(
 *   "User not found",
 *   "USER_NOT_FOUND"
 * );
 *
 * @example
 * // In an Express route handler
 * app.get('/users/:id', (req, res) => {
 *   try {
 *     // ... operation
 *   } catch (error) {
 *     return res.status(404).json(
 *       errorResponse("User not found", "USER_NOT_FOUND")
 *     );
 *   }
 * });
 */
export const errorResponse = (
    message: string,
    code?: string
): ApiResponse<null> => ({
    status: "error",
    message,
    code,
});