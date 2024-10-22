"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";


// Schema definition

const formSchema = z.object({
  pName: z.string(),
  techStack: z.array(z.string()).nonempty(),
  techPublic: z.boolean(),
  roles: z.array(z.string()).nonempty(),
  address: z.string().nonempty(),
});

// Combobox component
const frameworks = [
  { value: "remote", label: "Remote" },
  { value: "sveltekit", label: "SvelteKit" },
];

export function ComboboxDemo({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between truncate"
        >
          {value
            ? frameworks.find((f) => f.value === value)?.label
            : "Select address..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-fit w-dvw p-0">
        <Command>
          <CommandInput placeholder="Search address..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    onChange(framework.value === value ? "" : framework.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Main form
export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      techStack: ["React"],
      roles: ["React"],
      address: "",
    },
  });
 
  const userId = useSelector(
    (state: RootState) =>
      state.user.user?._id ?? null
  );
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/roles",
        {
          ...values,
          description: editor.document,
          userId,
        }
      );
      console.log(response);
      toast.success("Role created successfully");
    } catch (error) {
      toast.error("Failed to submit the form.");
    }
  };

  const editor = useCreateBlockNote();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto py-4 flex gap-4 lg:px-0 px-4"
      >
        <div className="w-full flex flex-col gap-7">
          {/* Project Title */}
          <FormField
            control={form.control}
            name="pName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2">
            {/* Tech Stack */}
            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech stack</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select languages" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          <MultiSelectorItem value="React">
                            React
                          </MultiSelectorItem>
                          <MultiSelectorItem value="Vue">Vue</MultiSelectorItem>
                          <MultiSelectorItem value="Svelte">
                            Svelte
                          </MultiSelectorItem>
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Visibility Switch */}
            <FormField
              control={form.control}
              name="techPublic"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Make technologies visible</FormLabel>
                    <FormDescription>You can change it from settings</FormDescription>

                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Responsibilities */}
          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsibilities</FormLabel>
                <FormControl>
                  <MultiSelector
                    values={field.value}
                    onValuesChange={field.onChange}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Select roles" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        <MultiSelectorItem value="React">
                          React
                        </MultiSelectorItem>
                        <MultiSelectorItem value="Vue">Vue</MultiSelectorItem>
                        <MultiSelectorItem value="Svelte">
                          Svelte
                        </MultiSelectorItem>
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* address Selector */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Work address</FormLabel>
                <FormControl>
                  <ComboboxDemo value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  Select <span className="underline">Remote</span> for remote
                  work
                </FormDescription>
                <FormMessage className="p-0" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </div>

        <div className="w-full h-[100dvh_-_6rem] flex flex-col gap-2">
          <Label>Description</Label>
          <ScrollArea className="w-full h-[calc(100dvh_-_10rem)] rounded-md border p-2">
            <BlockNoteView
              editor={editor}
              theme={lightDefaultTheme}
            />
          </ScrollArea>
        </div>
      </form>
    </Form>
  );
}
