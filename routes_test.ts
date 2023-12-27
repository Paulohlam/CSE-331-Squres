import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { Dummy, Save, Load, List } from './routes';


describe('routes', function() {

  // After you know what to do, feel free to delete this Dummy test
  it('Dummy', function() {
    // Feel free to copy this test structure to start your own tests, but look at these
    // comments first to understand what's going on.

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'GET', url: '/api/dummy', query: {name: 'Kevin'}}); 
    const res1 = httpMocks.createResponse();

    // call our function to execute the request and fill in the response
    Dummy(req1, res1);

    // check that the request was successful
    assert.strictEqual(res1._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepEqual(res1._getJSONData(), 'Hi, Kevin');
  });

  it('Save', function() {
    // Checks for request to save file
    const req1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/save', query: { name: 'file1' },
                  body: { content: 'Kevin' }});
    const res1 = httpMocks.createResponse();
    Save(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getJSONData(), 'Saved file, file1');

    // Checks if there is no name
    const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', query: {},
                  body: { content: 'Kevin' }});
    const res2 = httpMocks.createResponse();
    Save(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 500);
    assert.deepEqual(res2._getData(), 'missing "name" parameter');

    // Checks if there is no content
    const req3 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', query: { name: 'file1' }, body: {}});
    const res3 = httpMocks.createResponse();
    Save(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 500);
    assert.deepEqual(res3._getData(), 'missing "content" parameter');
  });

  it('Load', function() {
    const existingFileName = 'file1';
    const existingContent = 'Kevin';
    const nonExistingFileName = 'nonexistent';

    // Checks Load works
    const req1 = httpMocks.createRequest(
      {method: 'GET', url: '/api/load', query: { name: existingFileName }});
    const res1 = httpMocks.createResponse();
    const fileMap = new Map<string, string>();
    fileMap.set(existingFileName, existingContent);
    Load(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepEqual(res1._getJSONData(), existingContent);

    // Checks case for file not exitisting
    const req2 = httpMocks.createRequest(
      {method: 'GET', url: '/api/load', query: { name: nonExistingFileName }});
    const res2 = httpMocks.createResponse();
    Load(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 404);
    assert.deepEqual(res2._getData(), 'file not found');
  });

  it('List', function() {
    const fileNames = ['file1', 'file2', 'file3'];
  
    // check func works
    const req1 = httpMocks.createRequest({
      method: 'GET',
      url: '/api/list'
    });
    const res1 = httpMocks.createResponse();
    const fileMap = new Map<string, string>();
    fileNames.forEach((fileName) => {
      fileMap.set(fileName, 'Kevin');
    });
    List(req1, res1, fileMap);
    assert.strictEqual(res1.statusCode, 200);
    assert.deepStrictEqual(res1._getJSONData(), fileNames); 
    
    //check no file save
    const req2 = httpMocks.createRequest({
      method: 'GET',
      url: '/api/list'
    });
    const res2 = httpMocks.createResponse();
    const emptyFileMap = new Map<string, string>();
    List(req2, res2, emptyFileMap);
    assert.strictEqual(res2.statusCode, 200);
    assert.deepStrictEqual(res2._getJSONData(), []); // Use deepStrictEqual instead of deepEqual
  });
  