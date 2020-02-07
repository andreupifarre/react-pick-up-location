import { renderHook, act } from '@testing-library/react-hooks';
import useFetchData from './useFetchData';

afterEach(() => {
  jest.clearAllMocks();
});

const mockFetch = response =>
  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(response) }),
    );

describe('useFetchData', () => {
  it('should set empty array when term is undefined', async () => {
    const { result } = renderHook(() => useFetchData());

    expect(result.current).toEqual([[], false]);
  });

  it('should not make a request when term is undefined', async () => {
    const spy = jest.spyOn(global, 'fetch');
    renderHook(() => useFetchData());

    expect(spy).not.toBeCalled();
  });

  it('should set results array when term is matching a search', async () => {
    const mockSuccessResponse = {
      results: {
        docs: [
          {
            index: 1,
          },
          {
            index: 2,
          },
        ],
        numFound: 128207,
      },
    };

    mockFetch(mockSuccessResponse);

    const { result } = renderHook(() => useFetchData('Ba'));
    await act(async () => result.current);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual([mockSuccessResponse.results.docs, false]);
  });
});
