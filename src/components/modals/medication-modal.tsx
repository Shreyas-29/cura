"use client";

import { RadioGroup } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

import { createMedication } from "@/actions";
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
import { Input } from "@/components/ui/input";
import { useSettingsModal } from "@/hooks";
import { cn, StepThreeSchema, StepThreeSchemaType } from "@/lib";
import { useClerk } from "@clerk/nextjs";
import { Textarea } from "../ui/textarea";

const MedicationModal = () => {

    const { user } = useClerk();

    const {
        closeMedicationModal,
        isMedicationModalOpen,
    } = useSettingsModal();

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const form = useForm<StepThreeSchemaType>({
        resolver: zodResolver(StepThreeSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["medication"],
        mutationFn: async () => {
            if (!user) {
                toast.error("You must be logged in to perform this action");
                return;
            }

            await createMedication({
                name: form.getValues("name"),
                dosage: form.getValues("dosage"),
                adherence: form.getValues("adherence"),
                frequency: form.getValues("frequency"),
            });
        },
        onError: (error) => {
            console.log("Error", error);
            toast.error("Something went wrong");
        },
        onSuccess: () => {
            toast.success("Medication added successfully");
            closeMedicationModal();
        },
    });

    const onSubmit = () => {
        mutate();
    };

    if (isDesktop) {
        return (
            <Dialog open={isMedicationModalOpen} onOpenChange={closeMedicationModal}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            Add a new medication
                        </DialogTitle>
                    </DialogHeader>
                    <div className="pt-3">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-full relative">
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
                                <div className="flex items-center justify-end w-full mt-4 gap-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isPending}
                                        onClick={closeMedicationModal}
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
        <Drawer open={isMedicationModalOpen} onOpenChange={closeMedicationModal}>
            <DrawerContent className="h-max overflow-y-scroll scrollbar-hide">
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        Add a new symptom
                    </DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-3 w-full relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-y-4">
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

export default MedicationModal
