import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "./button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./command";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

const CommandSelect = ({
  options,
  onSelect,
  value,
  className,
  onSearch,
  placeholder = "Select an option",
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronDownIcon />
      </Button>

      <CommandResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={!onSearch}
      >
        <CommandInput placeholder="Search" onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty className="text-muted-foreground text-sm">
            <span>No options found</span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;
