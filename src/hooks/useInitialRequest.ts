'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  FIRST_RELOAD_JobId,
  ROLE_CODES_FIELD_KEY,
  ROLE_CODES_STORAGE_KEY,
} from '@/constants/jobId';
import { request } from '@/services';

const envRoleCodes = process.env.NEXT_PUBLIC_ROLE_CODES
  ? process.env.NEXT_PUBLIC_ROLE_CODES.split(',')
      .map((code) => code.trim())
      .filter(Boolean)
  : [];

interface ActivityItem {
  title: string;
  description: string;
  date: string;
  icon: string;
  id: string;
}

interface ActivitiesSection {
  header: string;
  list: ActivityItem[];
}

interface AppListItem {
  id: number;
  icon: string;
  title: string;
}

interface AppListSection {
  header: string;
  list: AppListItem[];
}

type IconsAppEntry = Record<string, string | number>;

interface IconsAppSection {
  header: string;
  list: IconsAppEntry[];
}

type AdvertiseEntry = Record<string, string | number>;

export interface DashboardBootstrapData {
  activities: ActivitiesSection;
  listApp1: AppListSection;
  listApp2: AppListSection;
  iconsApp: IconsAppSection;
  advertises: AdvertiseEntry[];
}

interface InitialRequestState {
  loading: boolean;
  data: DashboardBootstrapData | null;
  error: string | null;
}

interface InitialSnapshot {
  token: string | null;
  roleCodes: string[];
  state: InitialRequestState;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const hasHeaderAndList = (
  value: unknown
): value is { header: string; list: unknown[] } =>
  isRecord(value) && typeof value.header === 'string' && Array.isArray(value.list);

const isActivityItem = (value: unknown): value is ActivityItem =>
  isRecord(value) &&
  typeof value.title === 'string' &&
  typeof value.description === 'string' &&
  typeof value.date === 'string' &&
  typeof value.icon === 'string' &&
  typeof value.id === 'string';

const isAppListItem = (value: unknown): value is AppListItem =>
  isRecord(value) &&
  typeof value.id === 'number' &&
  typeof value.icon === 'string' &&
  typeof value.title === 'string';

const isIconsAppEntry = (value: unknown): value is IconsAppEntry =>
  isRecord(value) &&
  Object.values(value).every(
    (entry) => typeof entry === 'string' || typeof entry === 'number'
  );

const isDashboardBootstrapData = (
  value: unknown
): value is DashboardBootstrapData => {
  if (!isRecord(value)) {
    return false;
  }

  const { activities, listApp1, listApp2, iconsApp, advertises } =
    value as Record<string, unknown>;

  if (!hasHeaderAndList(activities) || !activities.list.every(isActivityItem)) {
    return false;
  }

  if (!hasHeaderAndList(listApp1) || !listApp1.list.every(isAppListItem)) {
    return false;
  }

  if (!hasHeaderAndList(listApp2) || !listApp2.list.every(isAppListItem)) {
    return false;
  }

  if (!hasHeaderAndList(iconsApp) || !iconsApp.list.every(isIconsAppEntry)) {
    return false;
  }

  if (!Array.isArray(advertises) || !advertises.every(isIconsAppEntry)) {
    return false;
  }

  return true;
};

const parseRoleCodes = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((code) => `${code}`.trim())
    .filter((code) => code.length > 0);
};

const getManualRoleCodes = (): string[] => {
  if (typeof window === 'undefined') {
    return envRoleCodes;
  }

  const storedRoleCodes = window.localStorage.getItem(ROLE_CODES_STORAGE_KEY);

  if (storedRoleCodes) {
    try {
      const parsed = JSON.parse(storedRoleCodes);
      const codes = parseRoleCodes(parsed);

      if (codes.length > 0) {
        return codes;
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Unable to parse stored role codes', error);
      }
    }
  }

  if (envRoleCodes.length > 0) {
    window.localStorage.setItem(
      ROLE_CODES_STORAGE_KEY,
      JSON.stringify(envRoleCodes)
    );
    return envRoleCodes;
  }

  return [];
};

const createInitialSnapshot = (): InitialSnapshot => {
  if (typeof window === 'undefined') {
    const roleCodes = envRoleCodes;

    return {
      token: null,
      roleCodes,
      state: {
        loading: roleCodes.length > 0,
        data: null,
        error:
          roleCodes.length > 0
            ? null
            : 'هیچ نقش کاربری برای فراخوانی اولیه تنظیم نشده است',
      },
    };
  }

  const token = window.localStorage.getItem('token');

  if (!token) {
    return {
      token: null,
      roleCodes: [],
      state: {
        loading: false,
        data: null,
        error: 'No token available',
      },
    };
  }

  const roleCodes = getManualRoleCodes();

  if (roleCodes.length === 0) {
    return {
      token,
      roleCodes: [],
      state: {
        loading: false,
        data: null,
        error: 'هیچ نقش کاربری برای فراخوانی اولیه تنظیم نشده است',
      },
    };
  }

  return {
    token,
    roleCodes,
    state: {
      loading: true,
      data: null,
      error: null,
    },
  };
};

export function useInitialRequest() {
  const initialSnapshot = useMemo(() => createInitialSnapshot(), []);
  const tokenRef = useRef<string | null>(initialSnapshot.token);
  const roleCodesRef = useRef<string[]>(initialSnapshot.roleCodes);
  const [state, setState] = useState<InitialRequestState>(initialSnapshot.state);

  useEffect(() => {
    if (!tokenRef.current || roleCodesRef.current.length === 0) {
      return;
    }

    let isCancelled = false;

    const makeInitialRequest = async () => {
      try {
        const response = await request({
          jobId: FIRST_RELOAD_JobId,
          dataInfo: {
            [ROLE_CODES_FIELD_KEY]: roleCodesRef.current,
          },
        });

        if (isCancelled) {
          return;
        }

        if (response.error) {
          setState({
            loading: false,
            data: null,
            error:
              typeof response.message === 'string'
                ? response.message
                : 'خطا در دریافت اطلاعات اولیه',
          });
          return;
        }

        if (typeof response.token === 'string' && response.token.length > 0) {
          localStorage.setItem('token', response.token);
          tokenRef.current = response.token;
        }

        if (isDashboardBootstrapData(response.data)) {
          localStorage.setItem('initialKey', JSON.stringify(response.data));
          setState({
            loading: false,
            data: response.data,
            error: null,
          });
        } else {
          setState({
            loading: false,
            data: null,
            error: 'ساختار داده اولیه معتبر نیست',
          });
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setState({
          loading: false,
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    void makeInitialRequest();

    return () => {
      isCancelled = true;
    };
  }, []);

  return state;
}
