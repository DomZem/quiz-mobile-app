import type { TextRef, ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';

const FormInputWrapper = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => <View ref={ref} className={cn('grid gap-2', className)} {...props} />);
FormInputWrapper.displayName = 'FormInputWrapper';

const FormErrorMessage = React.forwardRef<TextRef, TextProps>(({ className, ...props }, ref) => <Text ref={ref} className={cn('font-medium text-destructive', className)} {...props} />);
FormErrorMessage.displayName = 'FormErrorMessage';

export { FormErrorMessage, FormInputWrapper };
