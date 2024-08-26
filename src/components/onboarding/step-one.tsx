"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn, StepOneSchema, StepOneSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
    nextStep: () => void;
}

const StepOne = ({ nextStep }: Props) => {

    const form = useForm<StepOneSchemaType>({
        resolver: zodResolver(StepOneSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-one"],
        mutationFn: async ({ age, bloodGroup, gender, height, weight }: StepOneSchemaType) => {
            const payload: StepOneSchemaType = {
                age,
                bloodGroup,
                gender,
                height,
                weight,
            };

            const { data } = await axios.post("/api/onboarding/step-one", payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Data saved!");
            nextStep();
        },
        onError: (error) => {
            console.log(error);
            toast.error("Something went wrong");
        },
    });

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((e) => mutate(e))} className="flex flex-col gap-y-6 h-full w-full relative">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Specify your gender
                                </FormLabel>
                                <RadioGroup value={field.value} onChange={field.onChange} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {["male", "female", "other"].map((symptom) => (
                                        <RadioGroup.Option
                                            key={symptom}
                                            value={symptom}
                                            id={symptom}
                                            className={({ active, checked }) => cn(
                                                "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50 transition transform duration-200 ease-in-out active:scale-95",
                                                (active || checked) && "border-primary",
                                            )}
                                        >
                                            <RadioGroup.Label as="span" htmlFor={symptom} className="text-sm !capitalize">
                                                {symptom.replace("_", " ").toLowerCase()}
                                            </RadioGroup.Label>
                                        </RadioGroup.Option>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        Weight (kg)
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="62"
                                        type="number"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        Height (cm)
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="170"
                                        type="number"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        What is your age?
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="25"
                                        disabled={isPending}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bloodGroup"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        Your blood group
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select blood group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bloodGroup) => (
                                                <SelectItem key={bloodGroup} value={bloodGroup}>
                                                    {bloodGroup}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-end w-full mt-10 gap-6">
                        <p className="text-xs text-muted-foreground">
                            You can update these settings in dashboard
                        </p>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-24 gap-x-2"
                        >
                            Next
                            {isPending ? (
                                <LoaderIcon className="animate-spin h-4 w-4" />
                            ) : (
                                <ArrowRightIcon className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
};

export default StepOne
