"use client";

import { RadioGroup } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

import { updateUser } from "@/actions";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSettingsModal } from "@/hooks";
import { cn, StepOneSchema, StepOneSchemaType } from "@/lib";
import { useClerk } from "@clerk/nextjs";

const UserDetailsModal = () => {

    const { user } = useClerk();

    const {
        isPersonalDetailsModalOpen,
        closePersonalDetailsModal,
    } = useSettingsModal();

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const form = useForm<StepOneSchemaType>({
        resolver: zodResolver(StepOneSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["medication"],
        mutationFn: async () => {
            if (!user) {
                toast.error("You must be logged in to perform this action");
                return;
            }

            await updateUser({
                age: form.getValues("age"),
                bloodGroup: form.getValues("bloodGroup"),
                gender: form.getValues("gender"),
                height: form.getValues("height"),
                weight: form.getValues("weight"),
            });
        },
        onError: (error) => {
            console.log("Error", error);
            toast.error("Something went wrong");
        },
        onSuccess: () => {
            toast.success("Settings updated!");
            closePersonalDetailsModal();
        },
    });

    const onSubmit = () => {
        mutate();
    };

    if (isDesktop) {
        return (
            <Dialog open={isPersonalDetailsModalOpen} onOpenChange={closePersonalDetailsModal}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            Fill in your personal details
                        </DialogTitle>
                    </DialogHeader>
                    <div className="pt-3">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-full relative">
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
                                                        id={symptom}
                                                        value={symptom}
                                                        disabled={isPending}
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
                                                    <SelectTrigger disabled={isPending}>
                                                        <SelectValue placeholder="Select blood group" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bloodGroup) => (
                                                            <SelectItem key={bloodGroup} value={bloodGroup} disabled={isPending}>
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
                                <div className="flex items-center justify-end w-full mt-4 gap-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isPending}
                                        onClick={closePersonalDetailsModal}
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
        <Drawer open={isPersonalDetailsModalOpen} onOpenChange={closePersonalDetailsModal}>
            <DrawerContent className="h-max overflow-y-scroll scrollbar-hide">
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        Add a new symptom
                    </DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-full relative">
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
                                                    id={symptom}
                                                    value={symptom}
                                                    disabled={isPending}
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
                                                <SelectTrigger disabled={isPending}>
                                                    <SelectValue placeholder="Select blood group" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bloodGroup) => (
                                                        <SelectItem key={bloodGroup} value={bloodGroup} disabled={isPending}>
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

export default UserDetailsModal
