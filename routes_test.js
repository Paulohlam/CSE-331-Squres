"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = __importStar(require("assert"));
var httpMocks = __importStar(require("node-mocks-http"));
var routes_1 = require("./routes");
describe('routes', function () {
    // After you know what to do, feel free to delete this Dummy test
    it('Dummy', function () {
        // Feel free to copy this test structure to start your own tests, but look at these
        // comments first to understand what's going on.
        // httpMocks lets us create mock Request and Response params to pass into our route functions
        var req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        { method: 'GET', url: '/api/dummy', query: { name: 'Kevin' } });
        var res1 = httpMocks.createResponse();
        // call our function to execute the request and fill in the response
        (0, routes_1.Dummy)(req1, res1);
        // check that the request was successful
        assert.strictEqual(res1._getStatusCode(), 200);
        // and the response data is as expected
        assert.deepEqual(res1._getJSONData(), 'Hi, Kevin');
    });
    it('Save', function () {
        // Checks for request to save file
        var req1 = httpMocks.createRequest({ method: 'POST', url: '/api/save', query: { name: 'file1' },
            body: { content: 'Kevin' } });
        var res1 = httpMocks.createResponse();
        (0, routes_1.Save)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 200);
        assert.deepEqual(res1._getJSONData(), 'Saved file, file1');
        // Checks if there is no name
        var req2 = httpMocks.createRequest({ method: 'POST', url: '/api/save', query: {},
            body: { content: 'Kevin' } });
        var res2 = httpMocks.createResponse();
        (0, routes_1.Save)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 500);
        assert.deepEqual(res2._getData(), 'missing "name" parameter');
        // Checks if there is no content
        var req3 = httpMocks.createRequest({ method: 'POST', url: '/api/save', query: { name: 'file1' }, body: {} });
        var res3 = httpMocks.createResponse();
        (0, routes_1.Save)(req3, res3);
        assert.strictEqual(res3._getStatusCode(), 500);
        assert.deepEqual(res3._getData(), 'missing "content" parameter');
    });
    it('Load', function () {
        var existingFileName = 'file1';
        var existingContent = 'Kevin';
        var nonExistingFileName = 'nonexistent';
        // Checks Load works
        var req1 = httpMocks.createRequest({ method: 'GET', url: '/api/load', query: { name: existingFileName } });
        var res1 = httpMocks.createResponse();
        var fileMap = new Map();
        fileMap.set(existingFileName, existingContent);
        (0, routes_1.Load)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 200);
        assert.deepEqual(res1._getJSONData(), existingContent);
        // Checks case for file not exitisting
        var req2 = httpMocks.createRequest({ method: 'GET', url: '/api/load', query: { name: nonExistingFileName } });
        var res2 = httpMocks.createResponse();
        (0, routes_1.Load)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 404);
        assert.deepEqual(res2._getData(), 'file not found');
    });
    it('List', function () {
        var fileNames = ['file1', 'file2', 'file3'];
        // Checks that List works properly
        var req1 = httpMocks.createRequest({ method: 'GET', url: '/api/list' });
        var res1 = httpMocks.createResponse();
        var fileMap = new Map();
        fileNames.forEach(function (fileName) {
            fileMap.set(fileName, 'Kevin');
        });
        (0, routes_1.List)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 200);
        assert.deepEqual(res1._getJSONData(), fileNames);
        // Checks for no file saved
        var req2 = httpMocks.createRequest({ method: 'GET', url: '/api/list' });
        var res2 = httpMocks.createResponse();
        (0, routes_1.List)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 200);
        assert.deepEqual(res2._getJSONData(), []);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFpQztBQUNqQyx5REFBNkM7QUFDN0MsbUNBQW1EO0FBR25ELFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFFakIsaUVBQWlFO0lBQ2pFLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDVixtRkFBbUY7UUFDbkYsZ0RBQWdEO1FBRWhELDZGQUE2RjtRQUM3RixJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYTtRQUNoQyxpRkFBaUY7UUFDakYsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFeEMsb0VBQW9FO1FBQ3BFLElBQUEsY0FBSyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVsQix3Q0FBd0M7UUFDeEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsdUNBQXVDO1FBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUNULGtDQUFrQztRQUNsQyxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUNsQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ2hELElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDM0MsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsYUFBSSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRTNELDZCQUE2QjtRQUM3QixJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUNsQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoQyxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGFBQUksRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUU5RCxnQ0FBZ0M7UUFDaEMsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FDbEMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGFBQUksRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUNuRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxNQUFNLEVBQUU7UUFDVCxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUNqQyxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFDaEMsSUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUM7UUFFMUMsb0JBQW9CO1FBQ3BCLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQ2xDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMvQyxJQUFBLGFBQUksRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFdkQsc0NBQXNDO1FBQ3RDLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQ2xDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxhQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsTUFBTSxFQUFFO1FBQ1QsSUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLGtDQUFrQztRQUNsQyxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUNsQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDckMsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQzFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBQSxhQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWpELDJCQUEyQjtRQUMzQixJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUNsQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDckMsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUEsYUFBSSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=