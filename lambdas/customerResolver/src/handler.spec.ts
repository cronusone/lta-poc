import type { Context } from 'aws-lambda';

import { handler } from './handler';

describe('customer resolver', () => {
  const mockContext = {} as Context;
  const mockCallback = () => {};

  it('should construct a placeholder customer object', async () => {
    const params: any = {
      info: {
        parentTypeName: 'Query',
        fieldName: 'customerById',
      },
      arguments: {
        id: '1234',
      },
    };

    const result = await handler(params, mockContext, mockCallback);
    expect(result).toEqual({
      id: '1234',
      message: expect.stringContaining('placeholder'),
    });
  });
});
