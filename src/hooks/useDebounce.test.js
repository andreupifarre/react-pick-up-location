import { renderHook, act } from '@testing-library/react-hooks';

import useDebounce from './useDebounce';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useDebounce', () => {
  it('should return empty when value is undefined', async () => {
    const { result } = renderHook(() => useDebounce(''));
    expect(result.current).toEqual('');
  });

  it('should return empty when the length of the argument is 1', async () => {
    const { result } = renderHook(() => useDebounce('1'));
    expect(result.current).toEqual('');
  });

  it('should return expected search text when the length of the argument is higher than 1', () => {
    const { result } = renderHook(() => useDebounce('Ba'));
    expect(result.current).toEqual('Ba');
  });

  it('should have been called setTimeout', async () => {
    await act(async () => renderHook(() => useDebounce('Ba')));

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 250);
  });
});
