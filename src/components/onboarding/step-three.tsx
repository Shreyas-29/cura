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
import { cn, StepThreeSchema, StepThreeSchemaType } from "@/lib";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface Props {
    nextStep: () => void;
}

const StepThree = ({ nextStep }: Props) => {

    const form = useForm<StepThreeSchemaType>({
        resolver: zodResolver(StepThreeSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-three"],
        mutationFn: async ({ name, adherence, dosage, frequency, purpose }: StepThreeSchemaType) => {
            const payload: StepThreeSchemaType = {
                name,
                adherence,
                dosage,
                frequency,
                purpose,
            };

            const { data } = await axios.post("/api/onboarding/step-three", payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Data saved!");
            nextStep();
        },
        onError: (error) => {
            console.log("Error", error);
            toast.error("Something went wrong");
        },
    });

    const onSubmit = (data: StepThreeSchemaType) => {
        mutate(data);
    };


    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6 w-full h-full relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">
                                        Which medicines are you taking?
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        type="text"
                                        disabled={isPending}
                                        placeholder="Paracetamol, Aspirin, etc."
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dosage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="dosage">
                                        What is the dosage?
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        id="dosage"
                                        type="text"
                                        disabled={isPending}
                                        placeholder="Ex: 500mg, 1 tablet"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="purpose">
                                    What is the purpose of this medication?
                                </FormLabel>
                                <Textarea
                                    {...field}
                                    id="purpose"
                                    disabled={isPending}
                                    placeholder="For headache, fever, plain relief"
                                    className="w-full max-h-20"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="frequency">
                                    How often do you take it?
                                </FormLabel>
                                <RadioGroup value={field.value} onChange={field.onChange} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {["DAILY", "WEEKLY", "MONTHLY", "RARELY"].map((freq) => (
                                        <RadioGroup.Option
                                            key={freq}
                                            value={freq}
                                            id={freq}
                                            className={({ active, checked }) => cn(
                                                "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50",
                                                (active || checked) && "border-primary",
                                            )}
                                        >
                                            <RadioGroup.Label as="span" htmlFor={freq} className="text-sm !capitalize">
                                                {freq.toLowerCase()}
                                            </RadioGroup.Label>
                                        </RadioGroup.Option>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="adherence"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="adherence">
                                    How often do you follow the prescription?
                                </FormLabel>
                                <RadioGroup value={field.value} onChange={field.onChange} className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                    {["ALWAYS", "OFTEN", "SOMETIMES", "NEVER", "RARELY"].map((adhere) => (
                                        <RadioGroup.Option
                                            key={adhere}
                                            value={adhere}
                                            id={adhere}
                                            className={({ active, checked }) => cn(
                                                "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50",
                                                (active || checked) && "border-primary",
                                            )}
                                        >
                                            <RadioGroup.Label as="span" htmlFor={adhere} className="text-sm !capitalize">
                                                {adhere.toLowerCase()}
                                            </RadioGroup.Label>
                                        </RadioGroup.Option>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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

export default StepThree
