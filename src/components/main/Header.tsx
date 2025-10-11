'use client'

import { IconDots, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
    searchTerm: string
}

export default function Header() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    const router = useRouter();

    const onSubmit = (data: FormValues) => {
        goToSearchPage(data.searchTerm);
    }

    const goToMobileNavBar = () => {
        router.push("/mobileNavBar");
    }

    const goToSearchPage = (searchTerm: string) => {
        router.push(`/search/${searchTerm}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="backdrop-blur h-20 flex flex-col justify-center items-center border-b border-zinc-700 gap-2">
            <div className="centerItemsRow gap-3">
                <IconDots onClick={goToMobileNavBar} className="md:hidden lg:hidden" />
                <input
                    className="inputDefaultStyle"
                    type="text"
                    placeholder="Procurar..."
                    {...register("searchTerm", { required: "Para pesquisar, você deve digitar algo" })}
                />
                <button type="submit">
                    <IconSearch className="cursor-pointer changeScaleOnHoverDefaultStyle" />
                </button>
            </div>
            {errors.searchTerm && <p>{errors.searchTerm.message}</p>}
        </form>
    );
}