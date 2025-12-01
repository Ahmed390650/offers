"use client";

import { memo, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./input";

function DynamicSelect({
  name,
  value = [""],
  onChange,
  defaultOptions = [],
}: {
  name: string;
  value?: string[];
  onChange: (value: string[]) => void;
  defaultOptions?: string[];
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [allOptions, setAllOptions] = useState(defaultOptions);

  const handleAddNew = () => {
    if (newValue.trim() && !allOptions.includes(newValue)) {
      const updatedOptions = [...allOptions, newValue];
      setAllOptions(updatedOptions);
      onChange([...value, newValue]);
      setNewValue("");
      setIsAddingNew(false);
    }
  };

  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const handleRemove = (option) => {
    onChange(value.filter((v) => v !== option));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {allOptions.map((option) => (
          <Button
            name={name}
            key={option}
            variant={value.includes(option) ? "default" : "outline"}
            onClick={() => handleToggle(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      {isAddingNew ? (
        <div className="flex gap-2">
          <Input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Type new option..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddNew();
              if (e.key === "Escape") setIsAddingNew(false);
            }}
            autoFocus
          />
          <Button size="sm" onClick={handleAddNew}>
            Add
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddingNew(false)}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="gap-2"
        >
          <Plus size={16} />
          Add Option
        </Button>
      )}
    </div>
  );
}

export default memo(DynamicSelect);
