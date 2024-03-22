"use client"
import { ModeToggle } from "@/components/ModeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  name: string,
  qualification: string,
  email: string,
}

type CountryProbability = {
  country_id: string,
  probability: number
}


export default function Home() {

  const PersonalInfoURL = "https://cabinet.miem.hse.ru/api/student_profile"

  const NationalityURL = 'https://api.nationalize.io?name='

  const axios = require('axios');

  const token = process.env.NEXT_PUBLIC_TOKEN

  const [userData, setUserData] = useState<User>()
  const [nationality, setNationality] = useState<CountryProbability[]>()

  const config = {
    headers: {
      "X-Auth-Token": token,
    },
  }

  console.log(nationality)

  useEffect(() => {
    if (userData?.name) {
      const fullname = userData.name.split(" ")
      const name = fullname[1]
      axios.get(`${NationalityURL}${name}`)
        .then((response: any) => {
          console.log(response.data.country)
          setNationality(response.data.country)
        })
        .catch((error: any) => console.error(error));
    }

  }, [userData, axios])

  useEffect(() => {
    axios.get(PersonalInfoURL, config)
      .then((response: any) => {
        const data = response.data.data[0].main
        console.log(data)

        setUserData({
          name: data.name,
          qualification: data.description[0],
          email: data.email,
        })
      })
      .catch((error: any) => console.error(error));


  }, [axios])


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

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Профиль учащегося</CardTitle>
          <CardDescription className="text-xl">Информация о легенде</CardDescription>
        </CardHeader>
        <CardContent className="text-lg">
          <div>
            {`Имя: ${userData?.name}`}
          </div>
          <div>
            {`Почта: ${userData?.email}`}
          </div>
          <div>
            {`Кто я?: ${userData?.qualification}`}
          </div>
          <h2 className="text-xl mt-6 font-bold">Вероятность национальности</h2>
          <div className="flex flex-col mt-2 gap-2">
            {nationality?.map((element, index) => {
              return (
                <div className="flex flex-col gap-1" key={`nationalety ${index}`}>
                  <p>{element.country_id}</p>
                  <Progress value={element.probability * 100} />
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
    </main>
  );
}
