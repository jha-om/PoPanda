"use client"
import { useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validator/category-validator";
import { Modal } from "./ui/modal";

// why all in caps? -> it's a naming convention for all the constants used, because it will not change and is best to use for production grade application;
const EVENT_CATEGORY_VALIDATOR = z.object({
    name: CATEGORY_NAME_VALIDATOR,
    color: z.
        string().
        min(1, "Color is required").
        regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
    emoji: z.string().emoji("Invalid emoji").optional(),
})

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>

// how to handle forms and validate it?
export const EventCategoryModal = ({ children }: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { register, handleSubmit } = useForm<EventCategoryForm>({
        resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
    });

    const onSubmit = (data: EventCategoryForm) => {}

    return (
        <>
            <div onClick={() => setIsOpen(true)}>{children}</div>
            <Modal showModal={isOpen} setShowModal={setIsOpen}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                        New Event Category
                    </h2>
                </form>
            </Modal>
        </>
    )
}