// Debug script to identify problematic route patterns
import express from 'express';
import path from 'path';

console.log('🔍 Debugging route patterns...');

// Test each route file individually
const testRoutes = async () => {
  const app = express();
  
  try {
    // Test basic route registration
    console.log('✅ Testing basic route registration...');
    app.get('/test', (req, res) => res.json({ ok: true }));
    
    // Test parameter routes
    console.log('✅ Testing parameter routes...');
    app.get('/test/:id', (req, res) => res.json({ id: req.params.id }));
    
    // Test nested parameter routes
    console.log('✅ Testing nested parameter routes...');
    app.get('/test/:category/:id', (req, res) => res.json({ 
      category: req.params.category, 
      id: req.params.id 
    }));
    
    console.log('✅ All basic route tests passed');
    
  } catch (error) {
    console.error('❌ Route test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

// Test specific route patterns from your app
const testSpecificRoutes = async () => {
  const app = express();
  
  const testPatterns = [
    '/',
    '/:id',
    '/product/:productId',
    '/update/:itemId',
    '/remove/:itemId',
    '/:id/status',
    '/:id/role',
    '/user/me',
    '/me/stats'
  ];
  
  console.log('🔍 Testing specific route patterns...');
  
  for (const pattern of testPatterns) {
    try {
      app.get(pattern, (req, res) => res.json({ pattern }));
      console.log(`✅ Pattern "${pattern}" is valid`);
    } catch (error) {
      console.error(`❌ Pattern "${pattern}" failed:`, error.message);
    }
  }
};

// Run tests
testRoutes();
testSpecificRoutes(); 