"use client"
import Image from 'next/image'
import { ModeToggle } from "@/components/ModeToggle";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";


export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center gap-5">
            <header className="flex flex-row justify-between items-center w-full py-4 px-20 border-b">
                <ul className="flex flex-row gap-5">
                    <li>
                        <Link className="text-xl" href='/'>Главная</Link>
                    </li>
                    <li>
                        <Link className="text-xl" href="/information">Статическая Информация</Link>
                    </li>
                </ul>

                <ModeToggle />
            </header>
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle className="text-2xl">Профиль учащегося</CardTitle>
                    <CardDescription className="text-xl">Информация о легенде</CardDescription>
                </CardHeader>
                <CardContent className="text-lg flex flex-row gap-8">
                    <div className='rounded-2xl overflow-hidden h-100'>
                        <Image
                            src="/photo.jpg"
                            alt="Picture of the author"
                            height={400}
                            width={400}
                        />
                    </div>
                    <div className='flex flex-col gap-2 font'>
                        <h2 className='text-xl font-semibold'>Общая информация</h2>
                        <div>Возраст: 18</div>
                        <div>Увлечения: настольный теннис</div>
                        <div>Рейтинг в доте: 4.000 MMR</div>
                        <div>Эмоциональное состояние: подавленное</div>
                        <div>Группа крови: на рукаве</div>
                        <div>Семейное положение: сигма</div>
                        <Image
                            src="/sigma.gif"
                            width={200}
                            height={200}
                            alt="Picture of the author"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                </CardFooter>
            </Card>

        </main>
    );
}
