#!/usr/bin/env python
import os
import sys

# Start the server
if __name__ == '__main__':
    from app import main
    from waitress import serve
    
    print("Starting Pyramid server at http://0.0.0.0:6543")
    print("API endpoints:")
    print("  POST /api/analyze-review - Analyze a product review")
    print("  GET /api/reviews - Get all reviews")
    print("")
    print("Note: Database initialization skipped (requires PostgreSQL)")
    
    try:
        app = main({})
        print("✓ Server configured successfully")
        print("Starting server...")
        serve(app, host='0.0.0.0', port=6543)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
