import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createServer } from 'node:http';

describe('HTTP Server', () => {
  it('should return JSON response', async () => {
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Hello from Node.js!' }));
    });

    server.listen(0);
    const port = server.address().port;

    const response = await fetch(`http://localhost:${port}`);
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.message, 'Hello from Node.js!');
    
    server.close();
  });
});