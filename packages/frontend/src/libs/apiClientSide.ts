'use client';

import Cookie from 'js-cookie';

import { TApiResponse } from '@/types';

export default class ApiClientSide {
  static async GetWithCache<T extends TApiResponse>(endpoint: string): Promise<T> {
    const apiToken = Cookie.get('next-auth.api-token');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      cache: 'force-cache',
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

  static async Get<T extends TApiResponse>(endpoint: string): Promise<T> {
    const apiToken = Cookie.get('next-auth.api-token');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      cache: 'no-store',
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
    const apiToken = Cookie.get('next-auth.api-token');

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
      throw new Error(response.errorMessage || 'Error Api');
    }

    return response;
  }

  static async Put<T, U extends TApiResponse>(endpoint: string, data: T): Promise<U> {
    const apiToken = Cookie.get('next-auth.api-token');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      method: 'PUT',
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
      throw new Error(response.errorMessage || 'Error Api');
    }

    return response;
  }

  static async Delete<T extends TApiResponse>(endpoint: string): Promise<T> {
    const apiToken = Cookie.get('next-auth.api-token');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      method: 'DELETE',
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
}
