import { Badge } from '@/components/ui/badge';

interface CloudBadgeProps {
  type: 'status' | 'event' | 'monitoring';
  isEnabled: boolean;
}

export function CloudBadge({ type, isEnabled }: CloudBadgeProps) {
  const getBadgeConfig = (): {
    variant: 'default' | 'destructive' | 'secondary';
    className: string;
    text: string;
  } => {
    switch (type) {
      case 'status':
        return {
          variant: isEnabled ? 'default' : 'destructive',
          className: `rounded-full border px-1.5 py-0.5 text-xs font-normal ${
            isEnabled ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
          }`,
          text: isEnabled ? 'READY' : 'ERROR',
        };
      case 'event':
        return {
          variant: isEnabled ? 'default' : 'secondary',
          className: `rounded-full border px-1.5 py-0.5 text-xs font-normal ${
            isEnabled
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`,
          text: isEnabled ? 'VALID' : 'INVALID',
        };
      case 'monitoring':
        return {
          variant: 'default',
          className: `rounded-full px-1.5 py-0.5 text-xs font-normal ${
            isEnabled
              ? 'border bg-blue-100 text-blue-700'
              : 'bg-gray-50 text-gray-500'
          }`,
          text: isEnabled ? 'ON' : 'OFF',
        };
      default:
        return {
          variant: 'default',
          className: 'rounded-full px-1.5 py-0.5 text-xs font-normal',
          text: 'UNKNOWN',
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.text}
    </Badge>
  );
}
