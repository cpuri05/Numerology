#!/usr/bin/env python3
"""
Simple development server with auto-reload capability.
Usage: python3 dev-server.py
Then open http://localhost:8000 and manually refresh after changes.
"""

import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = "."

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Disable caching for development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Development server running at http://localhost:{PORT}")
        print(f"📁 Serving directory: {os.getcwd()}")
        print(f"💡 Tip: Disable browser cache is disabled. Just refresh (Cmd+R) to see changes!")
        print(f"🛑 Press Ctrl+C to stop\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped")
