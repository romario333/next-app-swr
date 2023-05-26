import useSWR from 'swr';

const fetcher = (path: string) => fetch(path).then(res => res.text());

export function useSWRText(url: string | (() => string)) {
    return useSWR(url, fetcher);
}
