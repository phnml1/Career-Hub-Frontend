import { useQuery } from '@tanstack/react-query';

import { clientApi } from '@/shared/lib/api/clientApi';

export interface ApplicationDropdownItem {
  id: number;
  company: string;
  position: string;
}

type GetApplicationsDropdownResponse = ApplicationDropdownItem[];

export interface ApplicationOption {
  label: string;
  value: string;
}

export const useGetApplicationsDropdown = () => {
  return useQuery<GetApplicationsDropdownResponse, Error, ApplicationOption[]>({
    queryKey: ['applications', 'dropdown'],
    queryFn: () =>
      clientApi.get<GetApplicationsDropdownResponse>(
        '/v1/applications/dropdown',
      ),

    select: (data) =>
      data.map((app) => ({
        label: `${app.company} (${app.position})`,
        value: String(app.id),
      })),
    staleTime: 1000 * 60 * 5,
  });
};
