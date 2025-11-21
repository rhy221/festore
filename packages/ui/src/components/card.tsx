import * as React from "react"
import { MoreVertical } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  href: string;
  onMenuClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function CategoryCard({
  title,
  imageUrl,
  href,
  onMenuClick,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="relative bg-[#F5E6D3] rounded-3xl p-6 m-2 hover:shadow-lg transition-shadow">
      {/* Menu button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowMenu(!showMenu);
          onMenuClick?.();
        }}
        className="absolute top-4 right-4 p-1 hover:bg-black/10 rounded-full transition-colors z-10"
      >
        <MoreVertical className="w-6 h-6 text-black" />
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="absolute top-12 right-4 bg-white rounded-lg shadow-lg py-2 z-20 min-w-[120px]">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowMenu(false);
              onEdit?.();
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowMenu(false);
              onDelete?.();
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600"
          >
            Xóa
          </button>
        </div>
      )}

      <a href={href} className="block">
        {/* Title */}
        <h3 className="text-xl font-bold text-black text-center mb-4">
          {title}
        </h3>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </a>
    </div>
  );
}

interface ProductCardProps {
  title: string;
  imageUrl: string;
  href: string;
  onMenuClick?: () => void;
}

function ProductCard({ title, imageUrl, href, onMenuClick }: ProductCardProps) {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow m-2">
      <a href={href} className="block">
        <div className="relative w-full h-48 mb-3">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h3 className="text-base font-semibold text-center truncate">
          {title}
        </h3>
      </a>
      {onMenuClick && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onMenuClick();
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CategoryCard,
  ProductCard,
}
