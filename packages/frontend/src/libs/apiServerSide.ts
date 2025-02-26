import { cookies } from 'next/headers';

import { TApiResponse } from '@/types';

type Options = {
  cache?: RequestCache;
};

export default class ApiServerSide {
  static async Get<T extends TApiResponse>(endpoint: string, options?: Options): Promise<T> {
    const cookieStore = await cookies();
    const apiToken = cookieStore.get('next-auth.api-token')?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      cache: options?.cache ?? 'force-cache',
      headers: {
        'Content-Type': 'application/json',
        ...(apiToken && {
          Authorization: `Bearer ${apiToken}`,
        }),
      },
    });

    const response: T = await res.json();

    if (response.statusCode !== 200) {
      throw new Error(response.errorMessage || 'Error Api');
    }

    return response;
  }

  static async Post<T, U extends TApiResponse>(endpoint: string, data: T): Promise<U> {
    const cookieStore = await cookies();
    const apiToken = cookieStore.get('next-auth.api-token')?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiToken && {
          Authorization: `Bearer ${apiToken}`,
        }),
      },
      body: JSON.stringify(data),
    });

    const response: U = await res.json();

    if (response.statusCode !== 200) {
      throw new Error(response?.errorMessage || 'Error Api');
    }

    return response;
  }
}
