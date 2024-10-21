"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import Edit from "@/pages/components/edit";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@radix-ui/react-label";

const formSchema = z.object({
  name_1498371116: z.string(),
  name_6998689863: z.array(z.string()).nonempty(),
  name_3377255024: z.boolean(),
  name_0160577085: z.array(z.string()).nonempty(),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name_6998689863: ["React"], name_0160577085: ["React"] },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" max-w-6xl mx-auto py-4 flex gap-4 lg:px-0 px-4"
      >
        <div className="w-full flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name_1498371116"
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

          <FormField
            control={form.control}
            name="name_6998689863"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech stack</FormLabel>
                <FormControl>
                  <MultiSelector
                    values={field.value}
                    onValuesChange={field.onChange}
                    loop
                    className=""
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

          <FormField
            control={form.control}
            name="name_3377255024"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Make technologies visible</FormLabel>
                  <FormDescription>
                    You can change the setting anytime from Settings
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name_0160577085"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsibilities</FormLabel>
                <FormControl>
                  <MultiSelector
                    values={field.value}
                    onValuesChange={field.onChange}
                    loop
                    className="!w-full"
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
                  <Button type="submit">Submit</Button>
        </div>

        <div className="w-full h-[100dvh_-_6rem] flex flex-col gap-2">
          <Label >Description</Label>
          <ScrollArea className="w-full h-[calc(100dvh_-_10rem)] rounded-md border p-2">
            <Edit />
          </ScrollArea>

          
        </div>
      </form>
    </Form>
  );
}



