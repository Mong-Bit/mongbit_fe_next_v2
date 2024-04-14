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
