import * as path from 'path';
import * as fs from 'fs';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import DataProductDownload from './DataProductDownload';
import { cleanup } from '@testing-library/react';

const apiUrl = 'http://localhost:8000';
const server = setupServer(
  rest.post(`${apiUrl}/download`, async (req, res, ctx) => {
    const { fileName } = req.body;
    const path1 = path.resolve(__dirname, "..", "Mocking", `${fileName}`);
    const textBuffer = fs.readFileSync(path1);
    return res(
      ctx.set('Content-Length', textBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'text/plain'),
      ctx.body(textBuffer),
    );
  })
);

beforeAll(() => {
  process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL = 'http://localhost:8000';
  server.listen();
});

afterEach(() => server.resetHandlers())

afterAll(() => {
  server.close();
  cleanup();
});

test('File Download Method is Successful', () => {
  const selectedFileNames = { "fileName": "testfile1.txt" }
  DataProductDownload(selectedFileNames);
});
