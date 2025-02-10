"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: 'Welcome to HomePage',
            text: 'Your are successfully logged in',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <div className='flex justify-center items-center lg:py-[30px] py-8 bg-lightWhite'>
            <div className="max-w-[1470px] mx-auto w-full px-[35px]">
                <div className="flex flex-wrap w-full justify-center">
                    <div className="lg:w-6/12 w-full flex flex-col xl:items-center">
                        <div className="max-w-[456px] w-full max-lg:mx-auto">
                            <a href="/"><Image className='xl:mb-[138px] xl:pt-5 lg:mb-32 md:mb-28 mb-[90px] text-left flex justify-start items-start' src="/assets/images/png/Page-logo.png" alt="lyrics" width={163} height={31} /></a>
                            <h2 className='font-semibold text-3xl !leading-[194%] text-fadeBlack tracking-[1.22px]'>Welcome Back</h2>
                            <p className='ps-1.5 text-sm text-primary mb-[31px] !leading-[150%] font-normal'>Welcome back! Please enter your details.</p>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                                <p className='text-base text-lightBlack font-medium !leading-[142%] mb-1.5'>Email</p>
                                <input {...register("email", { required: "Email is required", })} placeholder="Email" type="email" className="w-full px-[14px] py-[19.5px] border-lightGray bg-white custom-shadow placeholder:text-sm placeholder:text-primary text-primary border rounded-lg" />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                                <p className='text-base text-lightBlack font-medium !leading-[142%] mb-1.5 mt-[18px]'>Password</p>
                                <input {...register("password", { required: "Password is required", validate: (value) => value.length >= 6 || "Password must be at least 6 characters" })} placeholder="••••••••" type="password" className="w-full px-[14px] py-[19.5px] border-lightGray bg-white custom-shadow placeholder:text-sm placeholder:text-primary text-primary border rounded-lg" />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                                <div className="flex flex-wrap justify-between max-sm:gap-[14px] lg:mb-6 mb-5 mt-[18px]">
                                    <div className="flex pe-5">
                                        <div className="relative">
                                            <input {...register("checkbox", { required: "You must agree to the terms" })} type="checkbox" className='mr-3 size-5 rounded-md cursor-pointer' />
                                            {errors.checkbox && <p className="text-red-500 text-sm">{errors.checkbox.message}</p>}
                                        </div>
                                        <p className='text-secondary font-inter text-base'>Remember for 30 days</p>
                                    </div>
                                    <button className='text-blue text-base font-inter hover:underline'>Forgot password</button>
                                </div>

                                <button type="submit" className="bg-blue-500 cursor-pointer text-sm lg:mb-1.5 mb-1 bg-lightBlack hover:bg-white transition-all ease-linear duration-300 hover:text-lightBlack text-white hover:border-lightGray border border-transparent px-4 py-2.5 rounded-[9px] !leading-[171.4%]">Sign In</button>
                                <button type="button" className='border flex lg:gap-2.5 gap-2 justify-center items-center border-lightGray rounded-[9px] text-sm text-lightBlack transition-all ease-linear duration-300 hover:border-black max-w-[456px] hover:bg-black hover:text-white w-full !leading-[155.4%] mb-[18px] py-2.5'>
                                    <Image className='pointer-events-none' src="/assets/images/svg/google-icon.svg" alt="google" width={20} height={20} />
                                    Sign in with Google
                                </button>
                                <div className="flex gap-2.5 mx-auto">
                                    <p className='text-secondary text-base font-inter'>Don’t have an account?</p>
                                    <button onClick={() => router.push("/dashboard")} className='text-blue text-base hover:underline font-inter'>Sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:w-6/12 w-full flex justify-center items-center lg:mt-0 mt-10">
                        <Image className='xl:min-w-[759px] xl:translate-x-10 xl:min-h-[899px] w-full pointer-events-none max-lg:max-w-xl max-xl:max-w-2xl' src="/assets/images/png/lyrics-logo-img.png" alt="lyrics" width={759} height={899} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LyricsWeb;
