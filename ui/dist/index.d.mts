import React from 'react';

/** Built-in style presets. Each preset defines its own light AND dark palette
 *  (see styles/theme.css); switching a preset swaps both at once. */
type PresetName = "clay" | "neo";
interface PresetInfo {
    id: PresetName;
    label: string;
    description: string;
}
declare const PRESETS: PresetInfo[];
/** Quick primary-color swatches used by ThemeMenu and the docs playground. */
declare const COLOR_SWATCHES: Array<{
    name: string;
    color: string;
}>;

type ThemeMode = "light" | "dark";
type ModePreference = ThemeMode | "system";
/** Colors you can override at runtime, like Bootstrap's SCSS variables but live. */
interface ColorOverrides {
    primary?: string;
    secondary?: string;
    accent?: string;
    success?: string;
    danger?: string;
    warning?: string;
    info?: string;
    bg?: string;
    ink?: string;
    muted?: string;
}
interface ThemeContextValue {
    /** Resolved mode after applying "system". */
    mode: ThemeMode;
    /** What the user asked for: "light" | "dark" | "system". */
    preference: ModePreference;
    setPreference: (p: ModePreference) => void;
    toggle: () => void;
    /** Active style preset — swaps the whole light+dark palette pair. */
    preset: PresetName;
    setPreset: (p: PresetName) => void;
    colors: ColorOverrides;
    setColors: (c: ColorOverrides) => void;
    resetColors: () => void;
}
/** Tip: import { themeInitScript } from "marclayui/theme-init" — it lives in its own
 *  Server-Component-safe module and the main bundle is marked "use client". */
interface MarclayProviderProps {
    children: React.ReactNode;
    /** "system" follows the OS preference; persisted to localStorage. */
    defaultMode?: ModePreference;
    /** Style preset: "clay" (claymorphism) or "neo" (neumorphism). Persisted. */
    preset?: PresetName;
    /** Optional initial color overrides (react-bootstrap-style runtime theming). */
    colors?: ColorOverrides;
}
declare function MarclayProvider({ children, defaultMode, preset: initialPreset, colors: initialColors, }: MarclayProviderProps): React.JSX.Element;
declare function useTheme(): ThemeContextValue;
/** Backwards-friendly alias. */
declare const ThemeProvider: typeof MarclayProvider;

interface ThemeToggleProps {
    className?: string;
}
/** Raised clay pill that flips light/dark. Uses useTheme, so it must sit inside <MarclayProvider>. */
declare function ThemeToggle({ className }: ThemeToggleProps): React.JSX.Element;

interface ThemeMenuProps {
    className?: string;
}
/** Navbar theme button that opens a customization panel: mode, style preset
 *  and primary color swatches. Closes on Escape or outside click. */
declare function ThemeMenu({ className }: ThemeMenuProps): React.JSX.Element;

type ButtonVariant = "primary" | "secondary" | "accent" | "soft" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Shows a spinner and blocks interaction. */
    loading?: boolean;
    /** Stretch to fill the container width. */
    block?: boolean;
    /** Renders an anchor with button styling — use with Next `<Link>` styling or plain routes. */
    href?: string;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLAnchorElement & HTMLButtonElement>>;
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
/** Segmented control: renders children Buttons as flat segments inside an
 *  inset clay well — the active variant keeps its gradient. */
declare function ButtonGroup({ children, className, ...rest }: ButtonGroupProps): React.JSX.Element;

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}
/** Small keyboard key cap — inset clay well with a pressed bottom edge. */
declare function Kbd({ children, className, ...rest }: KbdProps): React.JSX.Element;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Lifts on hover — nice for clickable cards. */
    hover?: boolean;
}
declare function Card({ hover, className, ...rest }: CardProps): React.JSX.Element;
declare function CardHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function CardTitle({ className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>): React.JSX.Element;
declare function CardBody({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function CardFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;

type FieldSize = "sm" | "md" | "lg";
interface FieldChrome {
    label?: React.ReactNode;
    hint?: React.ReactNode;
    error?: string;
    size?: FieldSize;
    block?: boolean;
}
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, FieldChrome {
}
declare function Input({ label, hint, error, size, block, className, id, ...rest }: InputProps): React.JSX.Element;
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, FieldChrome {
}
declare function Textarea({ label, hint, error, size, block, className, id, rows, ...rest }: TextareaProps): React.JSX.Element;

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: React.ReactNode;
    /** Shows a dash instead of a tick — the classic "some children selected" state. */
    indeterminate?: boolean;
}
declare function Checkbox({ label, indeterminate, className, ...rest }: CheckboxProps): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.JSX.Element | null | undefined;
interface CheckboxGroupOption {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
interface CheckboxGroupProps {
    options: CheckboxGroupOption[];
    /** Controlled selected values. */
    value?: string[];
    /** Uncontrolled initial selection. */
    defaultValue?: string[];
    onChange?: (values: string[]) => void;
    /** Renders a parent "select all" checkbox with an indeterminate state. */
    selectAll?: boolean;
    selectAllLabel?: React.ReactNode;
    label?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}
declare function CheckboxGroup({ options, value, defaultValue, onChange, selectAll, selectAllLabel, label, disabled, className, }: CheckboxGroupProps): React.JSX.Element;
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
}
declare function Radio({ label, className, ...rest }: RadioProps): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.JSX.Element | null | undefined;
interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
}
declare function Switch({ label, className, ...rest }: SwitchProps): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.JSX.Element | null | undefined;

interface DropdownItem {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
interface DropdownProps {
    items: DropdownItem[];
    /** Controlled selected value (single) or values (multiple). */
    value?: string | string[];
    /** Uncontrolled initial selection. */
    defaultValue?: string | string[];
    onChange?: (value: string | string[]) => void;
    /** Allow several selections — the menu shows checkboxes. */
    multiple?: boolean;
    placeholder?: string;
    label?: React.ReactNode;
    hint?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    /** Stretch trigger and menu to full width. */
    block?: boolean;
    disabled?: boolean;
    className?: string;
}
/** Custom dropdown menu — renders its own popup listbox (no native browser
 *  option menu), with full keyboard support: open with Enter/Space/ArrowDown,
 *  navigate with the arrows, select with Enter/Space, close with Escape. */
declare function Dropdown({ items, value, defaultValue, onChange, multiple, placeholder, label, hint, size, block, disabled, className, }: DropdownProps): React.JSX.Element;

interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: React.ReactNode;
    /** Helper text under the slider. */
    hint?: React.ReactNode;
    /** Shows the current value on the right of the label. Works with both
     *  controlled `value` and uncontrolled `defaultValue`. */
    showValue?: boolean;
}
declare function Range({ label, hint, showValue, value, defaultValue, onChange, className, id, ...rest }: RangeProps): React.JSX.Element;

type BadgeVariant = "primary" | "secondary" | "accent" | "success" | "danger" | "warning" | "info" | "neutral";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    /** Solid = filled clay gradient; soft (default) = inset well with colored text. */
    solid?: boolean;
}
declare function Badge({ variant, solid, className, ...rest }: BadgeProps): React.JSX.Element;

type AlertVariant = "success" | "danger" | "warning" | "info";
interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    variant?: AlertVariant;
    title?: React.ReactNode;
    /** Overrides the variant's default glyph. */
    icon?: React.ReactNode;
    onClose?: () => void;
}
declare function Alert({ variant, title, icon, onClose, className, children, ...rest }: AlertProps): React.JSX.Element;

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarStatus = "online" | "offline" | "busy";
interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    src?: string;
    alt?: string;
    /** Used to derive initials when no src is given. */
    name?: string;
    size?: AvatarSize;
    status?: AvatarStatus;
    /** Filled clay gradient look. */
    gradient?: boolean;
}
declare function Avatar({ src, alt, name, size, status, gradient, className, children, ...rest }: AvatarProps): React.JSX.Element;
type AvatarGroupProps = React.HTMLAttributes<HTMLSpanElement>;
declare function AvatarGroup({ className, children, ...rest }: AvatarGroupProps): React.JSX.Element;

type ProgressTone = "primary" | "secondary" | "accent" | "danger";
interface ProgressProps {
    value?: number;
    max?: number;
    /** "indeterminate" animates a sliding chunk. */
    tone?: ProgressTone;
    size?: "sm" | "md" | "lg";
    label?: React.ReactNode;
    showValue?: boolean;
    indeterminate?: boolean;
    className?: string;
}
declare function Progress({ value, max, tone, size, label, showValue, indeterminate, className, }: ProgressProps): React.JSX.Element;

interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}
declare function Spinner({ size, className }: SpinnerProps): React.JSX.Element;

interface SkeletonProps {
    variant?: "text" | "circle" | "rect";
    width?: number | string;
    height?: number | string;
    /** Render several text lines; the last one is shorter, like real copy. */
    count?: number;
    className?: string;
}
declare function Skeleton({ variant, width, height, count, className }: SkeletonProps): React.JSX.Element;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    closeOnBackdrop?: boolean;
    closeOnEsc?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare function Modal({ open, onClose, title, footer, size, closeOnBackdrop, closeOnEsc, children, className, }: ModalProps): React.ReactPortal | null;

type TooltipPlacement = "top" | "bottom" | "left" | "right";
interface TooltipProps {
    label: string;
    placement?: TooltipPlacement;
    className?: string;
    children: React.ReactNode;
}
/** CSS-only tooltip: shows on hover and when the wrapped control has keyboard focus. */
declare function Tooltip({ label, placement, className, children }: TooltipProps): React.JSX.Element;

interface TabItem {
    key: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}
interface TabsProps {
    items: TabItem[];
    /** Controlled active index. */
    value?: number;
    onChange?: (index: number) => void;
    className?: string;
}
declare function Tabs({ items, value, onChange, className }: TabsProps): React.JSX.Element;

interface AccordionEntry {
    title: React.ReactNode;
    content: React.ReactNode;
}
interface AccordionProps {
    items: AccordionEntry[];
    /** Index opened initially. */
    defaultOpen?: number;
    /** When false, several panels can stay open at once. */
    exclusive?: boolean;
    className?: string;
}
declare function Accordion({ items, defaultOpen, exclusive, className }: AccordionProps): React.JSX.Element;

type ToastVariant = "info" | "success" | "danger" | "warning";
interface ToastOptions {
    title?: React.ReactNode;
    message?: React.ReactNode;
    variant?: ToastVariant;
    /** ms before auto-dismiss; 0 keeps it until closed manually. */
    duration?: number;
}
interface ToastContextValue {
    toast: (t: ToastOptions) => void;
    dismiss: (id: number) => void;
}
type ToastPlacement = "top-right" | "top-center" | "bottom-right" | "bottom-left";
interface ToastProviderProps {
    children: React.ReactNode;
    placement?: ToastPlacement;
}
declare function ToastProvider({ children, placement }: ToastProviderProps): React.JSX.Element;
declare function useToast(): ToastContextValue;

interface NavLinkItem {
    href: string;
    label: React.ReactNode;
}
interface NavbarProps {
    brand?: React.ReactNode;
    links?: NavLinkItem[];
    /** Href to highlight as active (matches a link's href). */
    activeHref?: string;
    /** Right-side slot: theme toggle, actions, etc. */
    right?: React.ReactNode;
    sticky?: boolean;
    className?: string;
}
/** Clay pill navbar — framework-agnostic (plain <a> links, works everywhere). */
declare function Navbar({ brand, links, activeHref, right, sticky, className }: NavbarProps): React.JSX.Element;

type StatTone = "primary" | "secondary" | "accent" | "danger" | "info";
interface StatProps {
    value: React.ReactNode;
    label?: React.ReactNode;
    tone?: StatTone;
    className?: string;
}
declare function Stat({ value, label, tone, className }: StatProps): React.JSX.Element;

interface DividerProps extends React.HTMLAttributes<HTMLElement> {
    orientation?: "horizontal" | "vertical";
    /** Renders an inset line — text — inset line. */
    label?: React.ReactNode;
}
declare function Divider({ orientation, label, className, ...rest }: DividerProps): React.JSX.Element;

type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column";
    gap?: StackGap;
    wrap?: boolean;
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    justify?: "start" | "center" | "end" | "between" | "around";
}
declare function Stack({ direction, gap, wrap, align, justify, className, ...rest }: StackProps): React.JSX.Element;

export { Accordion, type AccordionEntry, type AccordionProps, Alert, type AlertProps, type AlertVariant, Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, type AvatarSize, type AvatarStatus, Badge, type BadgeProps, type BadgeVariant, Button, ButtonGroup, type ButtonGroupProps, type ButtonProps, type ButtonSize, type ButtonVariant, COLOR_SWATCHES, Card, CardBody, CardFooter, CardHeader, type CardProps, CardTitle, Checkbox, CheckboxGroup, type CheckboxGroupOption, type CheckboxGroupProps, type CheckboxProps, type ColorOverrides, Divider, type DividerProps, Dropdown, type DropdownItem, type DropdownProps, type FieldSize, Input, type InputProps, Kbd, type KbdProps, MarclayProvider, type MarclayProviderProps, Modal, type ModalProps, type ModePreference, type NavLinkItem, Navbar, type NavbarProps, PRESETS, type PresetInfo, type PresetName, Progress, type ProgressProps, type ProgressTone, Radio, type RadioProps, Range, type RangeProps, Skeleton, type SkeletonProps, Spinner, type SpinnerProps, Stack, type StackGap, type StackProps, Stat, type StatProps, type StatTone, Switch, type SwitchProps, type TabItem, Tabs, type TabsProps, Textarea, type TextareaProps, ThemeMenu, type ThemeMenuProps, type ThemeMode, ThemeProvider, ThemeToggle, type ThemeToggleProps, type ToastOptions, type ToastPlacement, ToastProvider, type ToastProviderProps, type ToastVariant, Tooltip, type TooltipPlacement, type TooltipProps, useTheme, useToast };
