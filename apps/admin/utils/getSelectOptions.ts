import { COUNT_OPTIONS } from "@/constants/constant";

export type SelectOptions = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const getSelectOptions = (value: string, label: string, disabled?: boolean) =>
  ({
    label,
    value,
    disabled,
  }) as SelectOptions;

export const countSelectOptions = COUNT_OPTIONS.map((count)=>getSelectOptions(count[0],count[1]))