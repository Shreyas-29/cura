"use client";

import { RadioGroup } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

import { createSymptom } from "@/actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useSettingsModal } from "@/hooks";
import { cn, StepTwoSchema, StepTwoSchemaType } from "@/lib";
import { useClerk } from "@clerk/nextjs";

const SymptomModal = () => {

    const { user } = useClerk();

    const {
        closeSymptomModal,
        openSymptomModal,
        isSymptomModalOpen,
    } = useSettingsModal();

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const form = useForm<StepTwoSchemaType>({
        resolver: zodResolver(StepTwoSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["symptom"],
        mutationFn: async () => {
            if (!user) {
                toast.error("You must be logged in to perform this action");
                return;
            }

            await createSymptom({
                name: form.getValues("name"),
                intensity: form.getValues("intensity"),
                frequency: form.getValues("frequency"),
            });
        },
        onError: (error) => {
            console.log("Error", error);
            toast.error("Something went wrong");
        },
        onSuccess: () => {
            toast.success("Symptom added successfully");
            closeSymptomModal();
        },
    });

    const onSubmit = () => {
        mutate();
    };

    if (isDesktop) {
        return (
            <Dialog open={isSymptomModalOpen} onOpenChange={closeSymptomModal}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            Add a new symptom
                        </DialogTitle>
                    </DialogHeader>
                    <div className="pt-3">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-full relative">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                What symptom are you experiencing?
                                            </FormLabel>
                                            <RadioGroup value={field.value} onChange={field.onChange} className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                                {["HEADACHE", "NAUSEA", "VOMITING", "DIARRHEA", "FATIGUE", "INSOMNIA", "CONSTIPATION", "MUSCLE_PAIN", "JOINT_PAIN", "OTHER"].map((symptom) => (
                                                    <RadioGroup.Option
                                                        key={symptom}
                                                        value={symptom}
                                                        id={symptom}
                                                        className={({ active, checked }) => cn(
                                                            "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50",
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
                                <FormField
                                    control={form.control}
                                    name="frequency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                How often do you experience it?
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
                                    name="intensity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                How intense is it?
                                            </FormLabel>
                                            <RadioGroup value={field.value?.toString()} onChange={(value) => field.onChange(Number(value))} className="grid grid-cols-5 gap-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <RadioGroup.Option
                                                        key={index + 1}
                                                        id={`intensity-${index + 1}`}
                                                        value={(index + 1).toString()}
                                                        className={({ active, checked }) => cn(
                                                            "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50",
                                                            (active || checked) && "border-primary",
                                                        )}
                                                    >
                                                        <RadioGroup.Label htmlFor={`intensity-${index + 1}`} className="cursor-pointer">
                                                            {index + 1}
                                                        </RadioGroup.Label>
                                                    </RadioGroup.Option>
                                                ))}
                                            </RadioGroup>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-end w-full mt-4 gap-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isPending}
                                        onClick={closeSymptomModal}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="black"
                                        disabled={isPending}
                                        className="w-20 gap-x-2"
                                    >
                                        {isPending ? (
                                            <LoaderIcon className="animate-spin h-4 w-4" />
                                        ) : "Add"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={isSymptomModalOpen} onOpenChange={closeSymptomModal}>
            <DrawerContent className="h-max overflow-y-scroll scrollbar-hide">
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        Add a new symptom
                    </DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-full relative">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            What symptom are you experiencing?
                                        </FormLabel>
                                        <RadioGroup value={field.value} onChange={field.onChange} className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                            {["HEADACHE", "NAUSEA", "VOMITING", "DIARRHEA", "FATIGUE", "INSOMNIA", "CONSTIPATION", "MUSCLE_PAIN", "JOINT_PAIN", "OTHER"].map((symptom) => (
                                                <RadioGroup.Option
                                                    key={symptom}
                                                    value={symptom}
                                                    id={symptom}
                                                    className={({ active, checked }) => cn(
                                                        "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50",
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
                            <FormField
                                control={form.control}
                                name="frequency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            How often do you experience it?
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
                                name="intensity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            How intense is it?
                                        </FormLabel>
                                        <RadioGroup value={field.value?.toString()} onChange={(value) => field.onChange(Number(value))} className="grid grid-cols-5 gap-2">
                                            {[...Array(10)].map((_, index) => (
                                                <RadioGroup.Option
                                                    key={index + 1}
                                                    id={`intensity-${index + 1}`}
                                                    value={(index + 1).toString()}
                                                    className={({ active, checked }) => cn(
                                                        "border-2 border-border rounded-lg w-full py-2 text-center cursor-pointer focus:outline-none ring-0 focus:ring-0 outline-none disabled:opacity-50",
                                                        (active || checked) && "border-primary",
                                                    )}
                                                >
                                                    <RadioGroup.Label htmlFor={`intensity-${index + 1}`} className="cursor-pointer">
                                                        {index + 1}
                                                    </RadioGroup.Label>
                                                </RadioGroup.Option>
                                            ))}
                                        </RadioGroup>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-end w-full mt-4 gap-6">
                                <p className="text-xs text-muted-foreground">
                                    Drag down to close
                                </p>
                                <Button
                                    type="submit"
                                    variant="black"
                                    disabled={isPending}
                                    className="w-20 gap-x-2"
                                >
                                    {isPending ? (
                                        <LoaderIcon className="animate-spin h-4 w-4" />
                                    ) : "Add"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
};

export default SymptomModal
