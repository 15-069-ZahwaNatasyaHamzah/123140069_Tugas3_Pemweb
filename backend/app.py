import os
from pyramid.config import Configurator
from pyramid.response import Response
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def cors_tween_factory(handler, registry):
    """CORS middleware"""
    def cors_tween(request):
        response = handler(request)
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600',
        })
        return response
    return cors_tween

def cors_preflight_handler(request):
    """Handle CORS preflight requests"""
    return Response('', status=204)

def main(global_config, **settings):
    """This function returns a Pyramid WSGI application."""
    config = Configurator(settings=settings)
    
    # Add CORS support
    config.add_route('cors_preflight', '/{path_info:.*}', request_method='OPTIONS')
    config.add_view(cors_preflight_handler, route_name='cors_preflight')
    
    # Add CORS headers to all responses
    config.add_tween('app.cors_tween_factory')
    
    # Add routes
    config.add_route('analyze_review', '/api/analyze-review', request_method='POST')
    config.add_route('get_reviews', '/api/reviews', request_method='GET')
    
    # Scan for view callables
    config.scan('views')
    
    return config.make_wsgi_app()

if __name__ == '__main__':
    from waitress import serve
    app = main({})
    serve(app, host='0.0.0.0', port=6543)
