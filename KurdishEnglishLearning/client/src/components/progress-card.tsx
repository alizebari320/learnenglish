import { Card, CardContent } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  description?: string;
}

export function ProgressCard({ title, value, icon, color, description }: ProgressCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-lg">
      <CardContent className="p-6 text-center">
        <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", color)}>
          <i className={cn(icon, "text-white text-2xl")}></i>
        </div>
        <div className="text-3xl font-bold text-gray-800 mb-1">
          {formatNumber(value)}
        </div>
        <div className="text-gray-600 font-kurdish text-sm">
          {title}
        </div>
        {description && (
          <div className="text-gray-500 text-xs mt-1 font-kurdish">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
