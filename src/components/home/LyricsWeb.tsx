"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';  
interface FormData {
    name: string;
    password: string;
    email: string;
    checkbox: boolean;
}

const LyricsWeb: React.FC = () => {
    const router = useRouter();
    const [Formdata, setFormdata] = useState<FormData[]>([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('Formdata') || '[]');
        setFormdata(savedData);
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated === "true") {
          router.push("/dashboard");
        }
    }, [router]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        reset();
        const updatedData = [...Formdata, data];
        setFormdata(updatedData);
        localStorage.setItem('Formdata', JSON.stringify(updatedData));
        localStorage.setItem("isAuthenticated", "true");
        router.push("/dashboard");
    };

    return (
        <div className='flex justify-center items-center py-[30px] bg-lightWhite'>
            <div className="max-w-[1400px] mx-auto w-full max-xl:px-4">
                <div className="flex flex-wrap w-full justify-center">
                    <div className="lg:w-6/12 w-full flex flex-col ">
                        <div className="max-w-[456px] w-full max-lg:mx-auto">
                            <Image className='xl:mb-[138px] lg:mb-32 md:mb-28 mb-[90px] text-left flex justify-start items-start' src="/assets/images/png/Page-logo.png" alt="lyrics" width={163} height={31} />
                            <h2 className='font-semibold text-3xl !leading-[194%]'>Welcome Back</h2>
                            <p className='ps-1.5 text-sm text-primary lg:mb-[31px] md:mb-6 mb-5'>Welcome back! Please enter your details.</p>

                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                                <p className='text-base text-lightBlack font-medium lg:mb-1.5 mb-1'>Email</p>
                                <input {...register("email", { required: "Email is required", })} placeholder="Email" type="email" className="w-full lg:px-[14px] px-3 lg:py-5 md:py-4 py-3 border-lightGray bg-white custom-shadow placeholder:text-sm border rounded-xl" />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                                <p className='text-base text-lightBlack font-medium lg:mb-1.5 mb-1 lg:mt-[18px] mt-4'>Password</p>
                                <input {...register("password", { required: "Password is required", validate: (value) => value.length >= 6 || "Password must be at least 6 characters" })} placeholder="Password" type="password" className="w-full lg:px-[14px] px-3 lg:py-5 md:py-4 py-3 border-lightGray bg-white custom-shadow placeholder:text-sm border rounded-xl" />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                                <div className="flex flex-wrap justify-between lg:mb-6 md:mb-5 mb-4 lg:mt-[18px] mt-4">
                                    <div className="flex">
                                        <div className="relative">
                                            <input {...register("checkbox", { required: "You must agree to the terms" })} type="checkbox" className='mr-3 cursor-pointer' />
                                            {errors.checkbox && <p className="text-red-500 text-sm">{errors.checkbox.message}</p>}
                                        </div>
                                        <p className='text-secondary text-base'>Remember for 30 days</p>
                                    </div>
                                    <button className='text-blue text-base'>Forgot password</button>
                                </div>

                                <button type="submit" className="bg-blue-500 cursor-pointer text-sm lg:mb-1.5 mb-1 bg-lightBlack text-white px-4 py-[9.5px] rounded-[9px]">Sign In</button>
                                <button type="button" className='border border-lightGray rounded-[9px] text-sm text-lightBlack max-w-[456px] w-full lg:mb-[18px] md:mb-4 mb-3 py-2.5'>Sing in with Goolge</button>
                                <div className="flex gap-2.5 mx-auto    ">
                                    <p className='text-secondary text-base'>Don’t have an account?</p>
                                    <button onClick={() => router.push("/dashboard")} className='text-blue text-base'>Sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:w-6/12 w-full flex justify-center items-center lg:mt-0 mt-10">
                        <Image className='xl:min-w-[759px] xl:min-h-[899px] w-full max-lg:max-w-xl' src="/assets/images/png/lyrics-logo-img.png" alt="lyrics" width={759} height={899} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LyricsWeb;
