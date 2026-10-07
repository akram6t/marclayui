/**
 * MarclayUI — claymorphism + neumorphism React components
 * with light/dark theming and runtime color control.
 *
 * Docs: import "marclayui/styles.css" once in your root layout,
 * wrap your app in <MarclayProvider>, and use the components below.
 */

// Theming
// (themeInitScript is served separately: import { themeInitScript } from "marclayui/theme-init")
export {
  MarclayProvider,
  ThemeProvider,
  useTheme,
} from "./theming/ThemeProvider";
export type {
  ThemeMode,
  ModePreference,
  ColorOverrides,
  MarclayProviderProps,
} from "./theming/ThemeProvider";
export { PRESETS } from "./theming/presets";
export type { PresetName, PresetInfo } from "./theming/presets";
export { ThemeToggle } from "./theming/ThemeToggle";
export type { ThemeToggleProps } from "./theming/ThemeToggle";
export { ThemeMenu } from "./theming/ThemeMenu";
export type { ThemeMenuProps } from "./theming/ThemeMenu";
export { COLOR_SWATCHES } from "./theming/presets";

// Components
export { Button, ButtonGroup } from "./components/button/button";
export type { ButtonProps, ButtonGroupProps, ButtonVariant, ButtonSize } from "./components/button/button";

export { Kbd } from "./components/kbd/kbd";
export type { KbdProps } from "./components/kbd/kbd";

export {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "./components/card/card";
export type { CardProps } from "./components/card/card";

export { Input, Textarea } from "./components/input/input";
export type { InputProps, TextareaProps, FieldSize } from "./components/input/input";

export { Select } from "./components/select/select";
export type { SelectProps, SelectOption } from "./components/select/select";

export { Checkbox, CheckboxGroup, Radio, Switch } from "./components/checks/checks";
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxGroupOption,
  RadioProps,
  SwitchProps,
} from "./components/checks/checks";

export { Dropdown } from "./components/dropdown/dropdown";
export type { DropdownProps, DropdownItem } from "./components/dropdown/dropdown";

export { Range } from "./components/range/range";
export type { RangeProps } from "./components/range/range";

export { Badge } from "./components/badge/badge";
export type { BadgeProps, BadgeVariant } from "./components/badge/badge";

export { Alert } from "./components/alert/alert";
export type { AlertProps, AlertVariant } from "./components/alert/alert";

export { Avatar, AvatarGroup } from "./components/avatar/avatar";
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarStatus } from "./components/avatar/avatar";

export { Progress } from "./components/progress/progress";
export type { ProgressProps, ProgressTone } from "./components/progress/progress";

export { Spinner } from "./components/spinner/spinner";
export type { SpinnerProps } from "./components/spinner/spinner";

export { Skeleton } from "./components/skeleton/skeleton";
export type { SkeletonProps } from "./components/skeleton/skeleton";

export { Modal } from "./components/modal/modal";
export type { ModalProps } from "./components/modal/modal";

export { Tooltip } from "./components/tooltip/tooltip";
export type { TooltipProps, TooltipPlacement } from "./components/tooltip/tooltip";

export { Tabs } from "./components/tabs/tabs";
export type { TabsProps, TabItem } from "./components/tabs/tabs";

export { Accordion } from "./components/accordion/accordion";
export type { AccordionProps, AccordionEntry } from "./components/accordion/accordion";

export { ToastProvider, useToast } from "./components/toast/toast";
export type {
  ToastOptions,
  ToastVariant,
  ToastProviderProps,
  ToastPlacement,
} from "./components/toast/toast";

export { Navbar } from "./components/navbar/navbar";
export type { NavbarProps, NavLinkItem } from "./components/navbar/navbar";

export { Stat } from "./components/stat/stat";
export type { StatProps, StatTone } from "./components/stat/stat";

export { Divider } from "./components/divider/divider";
export type { DividerProps } from "./components/divider/divider";

export { Stack } from "./components/stack/stack";
export type { StackProps, StackGap } from "./components/stack/stack";
